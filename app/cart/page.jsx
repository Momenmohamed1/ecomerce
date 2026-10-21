"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "@/app/_components/_context/CartContext";
import CartApis from "@/app/_utils/CartApis";

const money = (value) => `$${Number(value ?? 0).toFixed(2)}`;
const FREE_SHIPPING_THRESHOLD = 99;
const SHIPPING_FEE = 9.9;

const CartPage = () => {
  const { user } = useUser();
  const { cart = [], setcart } = useContext(CartContext) ?? {};
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [checkoutNote, setCheckoutNote] = useState(false);

  const quantityOf = (item) => item?.quantity ?? 1;

  const totalItems = cart.reduce((sum, item) => sum + quantityOf(item), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item?.product?.price ?? 0) * quantityOf(item),
    0
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const handleDelete = (id) => {
    setError("");
    setBusyId(id);
    CartApis.deleteCartItem(id)
      .then(() => setcart?.((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => {
        console.error("Strapi:", err.response?.data ?? err);
        setError("Could not remove this item. Please try again.");
      })
      .finally(() => setBusyId(null));
  };

  const changeQuantity = (item, delta) => {
    const quantity = quantityOf(item) + delta;
    if (quantity < 1) return;

    setError("");
    setBusyId(item.id);
    CartApis.updateCartItem(item.id, { data: { quantity } })
      .then(() => {
        setcart?.((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, quantity } : it))
        );
      })
      .catch((err) => {
        console.error("Strapi:", err.response?.data ?? err);
        setError("Could not update the quantity. Please try again.");
      })
      .finally(() => setBusyId(null));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Shopping cart
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalItems > 0
              ? `${totalItems} ${totalItems === 1 ? "item" : "items"} in your cart`
              : "Everything you add will show up here."}
          </p>
        </div>
        <Link
          href="/#shop"
          className="text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          Continue shopping
        </Link>
      </div>

      {!user ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-slate-900">
            Sign in to view your cart
          </p>
          <p className="max-w-sm text-sm text-slate-600">
            Your cart is saved to your account, so you can pick up where you
            left off on any device.
          </p>
          <Link
            href="/sign-in"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Sign in
          </Link>
        </div>
      ) : !cart.length ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-slate-900">
            Your cart is empty
          </p>
          <p className="max-w-sm text-sm text-slate-600">
            Browse the latest arrivals and find something you’ll love.
          </p>
          <Link
            href="/#shop"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700"
              >
                {error}
              </p>
            )}

            <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-4 sm:px-5">
              {cart.map((item) => {
                const busy = busyId === item.id;
                const quantity = quantityOf(item);
                const unitPrice = Number(item?.product?.price ?? 0);

                return (
                  <li key={item.id} className="flex gap-3 py-5 sm:gap-4">
                    <Link
                      href={`/product-details/${item?.product?.documentId}`}
                      className="shrink-0"
                    >
                      {item?.product?.images?.url ? (
                        <Image
                          src={item.product.images.url}
                          alt={item?.product?.title ?? "Product"}
                          width={96}
                          height={96}
                          className="h-20 w-20 rounded-xl border border-slate-100 bg-slate-50 object-contain sm:h-24 sm:w-24"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 text-[10px] text-slate-400 sm:h-24 sm:w-24">
                          No image
                        </div>
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product-details/${item?.product?.documentId}`}
                          className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-teal-700 sm:text-base"
                        >
                          {item?.product?.title}
                        </Link>
                        <p className="mt-0.5 text-xs font-medium text-teal-700">
                          {item?.product?.category}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {money(unitPrice)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="inline-flex h-9 items-center rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item, -1)}
                            disabled={busy || quantity <= 1}
                            aria-label={`Decrease quantity of ${item?.product?.title}`}
                            className="h-9 w-9 rounded-l-lg text-base font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>
                          <span
                            className="w-9 text-center text-sm font-semibold text-slate-900"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item, 1)}
                            disabled={busy}
                            aria-label={`Increase quantity of ${item?.product?.title}`}
                            className="h-9 w-9 rounded-r-lg text-base font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        <p className="w-20 text-right text-sm font-bold text-slate-900">
                          {money(unitPrice * quantity)}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          disabled={busy}
                          aria-label={`Remove ${item?.product?.title} from cart`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {busy ? (
                            <span className="text-xs">…</span>
                          ) : (
                            <svg
                              className="h-4.5 w-4.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.7}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="text-base font-bold text-slate-900">Order summary</h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-semibold text-slate-900">
                  {money(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Shipping</dt>
                <dd className="font-semibold text-slate-900">
                  {shipping === 0 ? "Free" : money(shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd className="font-bold text-slate-900">{money(total)}</dd>
              </div>
            </dl>

            {remainingForFreeShipping > 0 && (
              <p className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
                Add {money(remainingForFreeShipping)} more for free shipping.
              </p>
            )}

            <button
              type="button"
              onClick={() => setCheckoutNote(true)}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              Proceed to checkout
            </button>

            {checkoutNote && (
              <p
                role="status"
                className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600"
              >
                This is a demo store — payments are not processed.
              </p>
            )}

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Secure, encrypted checkout
            </p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
