"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../_context/CartContext";

const money = (value) => `$${Number(value ?? 0).toFixed(2)}`;

const CartDropdown = ({ onOpen }) => {
  const { cart = [] } = useContext(CartContext) ?? {};
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event) => {
      const target = event.target;
      const insideButton = boxRef.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideButton && !insidePanel) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const totalItems = cart.reduce((sum, item) => sum + (item?.quantity ?? 1), 0);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item?.product?.price ?? 0) * (item?.quantity ?? 1),
    0
  );

  return (
    <>
      <div ref={boxRef} className="relative">
        <button
          type="button"
          onClick={() => {
            if (!open) onOpen?.();
            setOpen(!open);
          }}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`Open cart, ${totalItems} ${
            totalItems === 1 ? "item" : "items"
          }`}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            stroke="currentColor"
            className="h-5.5 w-5.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </div>

      {open && (
        // Anchored to the header (position: sticky) instead of the icon, so the
        // panel always stays inside the viewport on small screens.
        <div className="absolute inset-x-0 top-16 z-50 lg:top-18">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Shopping cart"
              className="mt-3 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/40 sm:w-80"
            >
              <div className="flex items-center justify-between px-1 pb-2">
                <p className="text-sm font-bold text-slate-900">
                  Your cart ({totalItems})
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:hidden"
                  aria-label="Close cart"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {!cart.length ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"
                      />
                    </svg>
                  </span>
                  <p className="text-sm text-slate-500">Your cart is empty.</p>
                  <Link
                    href="/#shop"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="max-h-72 space-y-1 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-slate-50"
                      >
                        <Link
                          href={`/product-details/${item?.product?.documentId}`}
                          onClick={() => setOpen(false)}
                          className="shrink-0"
                        >
                          {item?.product?.images?.url ? (
                            <Image
                              src={item.product.images.url}
                              alt={item?.product?.title ?? "Product"}
                              width={56}
                              height={56}
                              className="h-14 w-14 rounded-lg bg-slate-50 object-contain"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">
                              No image
                            </div>
                          )}
                        </Link>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {item?.product?.title}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {item?.product?.category}
                          </p>
                          <p className="text-xs font-semibold text-slate-900">
                            {money(item?.product?.price)}
                            {(item?.quantity ?? 1) > 1 && (
                              <span className="ml-1 font-normal text-slate-500">
                                × {item.quantity}
                              </span>
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 px-1 pt-3 text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold text-slate-900">
                      {money(subtotal)}
                    </span>
                  </div>

                  <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="mt-3 flex h-10 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                  >
                    View cart
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDropdown;
