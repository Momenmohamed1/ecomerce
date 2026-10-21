"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import CartApis from "../../_utils/CartApis";
import { CartContext } from "@/app/_components/_context/CartContext";

const money = (value) => `$${Number(value ?? 0).toFixed(2)}`;

const getDescription = (product) => {
  const blocks = product?.descraption;

  if (Array.isArray(blocks)) {
    return blocks
      .map((block) =>
        (block?.children ?? []).map((child) => child?.text ?? "").join("")
      )
      .filter(Boolean)
      .join(" ");
  }

  return typeof blocks === "string" ? blocks : "";
};

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { setcart } = useContext(CartContext) ?? {};
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const price = Number(product?.price ?? 0);
  const oldPrice = Number(product?.Discount ?? 0);
  const hasDiscount = oldPrice > price && price > 0;
  const discountPercent = hasDiscount
    ? Math.round((1 - price / oldPrice) * 100)
    : 0;

  const stock =
    product?.Stock === undefined || product?.Stock === null
      ? null
      : Number(product.Stock);
  const inStock = stock === null || stock > 0;
  const maxQuantity = stock === null ? 10 : Math.max(1, Math.min(stock, 10));

  const description = getDescription(product);

  const handleAddToCart = () => {
    if (!inStock) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;
    const productDocumentId = product?.documentId;
    if (!email || !productDocumentId) return;

    setLoading(true);
    setError("");
    setAdded(false);

    CartApis.getUserCartItems(email)
      .then((res) => {
        const existing = (res?.data?.data ?? []).find(
          (item) => item?.projects?.[0]?.documentId === productDocumentId
        );

        if (existing) {
          const nextQuantity = (existing.quantity ?? 1) + quantity;
          return CartApis.updateCartItem(existing.documentId, {
            data: { quantity: nextQuantity },
          }).then(() => {
            setcart?.((prev) =>
              prev.map((item) =>
                item.id === existing.documentId
                  ? { ...item, quantity: nextQuantity }
                  : item
              )
            );
          });
        }

        return CartApis.addToCart({
          data: {
            username: user.fullName,
            email,
            projects: [productDocumentId],
            quantity,
          },
        }).then((created) => {
          setcart?.((prev) => [
            ...prev,
            {
              id: created?.data?.data?.documentId,
              product,
              quantity,
            },
          ]);
        });
      })
      .then(() => {
        setAdded(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setAdded(false), 2500);
      })
      .catch((err) => {
        console.error("Strapi:", err.response?.data ?? err);
        setError("We couldn’t add this to your cart. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
          {product?.category ?? "Product"}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            inStock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              inStock ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
        {product?.title ?? "Product"}
      </h1>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {money(price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg font-medium text-slate-400 line-through">
              {money(oldPrice)}
            </span>
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description ||
          "A carefully selected everyday essential, made from durable materials and designed to last."}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div>
          <dt className="text-xs font-medium text-slate-500">Category</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {product?.category ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Availability</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {inStock ? (stock === null ? "Available" : `${stock} in stock`) : "Out of stock"}
          </dd>
        </div>
      </dl>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="inline-flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-1 sm:w-36">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1 || !inStock}
            aria-label="Decrease quantity"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-lg font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            −
          </button>
          <span
            className="min-w-8 text-center text-sm font-semibold text-slate-900"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.min(maxQuantity, value + 1))
            }
            disabled={quantity >= maxQuantity || !inStock}
            aria-label="Increase quantity"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-lg font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading || !inStock}
          className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
            added
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          {added ? (
            <>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Added to cart
            </>
          ) : (
            <>
              <svg
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
              </svg>
              {loading
                ? "Adding…"
                : inStock
                ? "Add to cart"
                : "Out of stock"}
            </>
          )}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {added ? "Product added to your cart" : ""}
      </p>

      <ul className="mt-6 space-y-2 text-xs text-slate-500">
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
          Free standard shipping on orders over $99.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
          Returns accepted within 30 days of delivery.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
          Need help? Contact us and we’ll reply within one business day.
        </li>
      </ul>
    </div>
  );
};

export default ProductInfo;
