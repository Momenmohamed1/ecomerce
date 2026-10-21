"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import ProductAPIs from "@/app/_utils/ProductAPIs";

const SKELETON_KEYS = Array.from({ length: 8 }, (_, index) => index);

const ProductCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="aspect-[4/5] w-full animate-pulse bg-slate-100" />
    <div className="space-y-2 p-4">
      <div className="h-2.5 w-16 animate-pulse rounded-full bg-slate-100" />
      <div className="h-3.5 w-full animate-pulse rounded-full bg-slate-100" />
      <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-slate-100" />
      <div className="h-4 w-20 animate-pulse rounded-full bg-slate-100" />
    </div>
  </div>
);

const Panel = ({ children }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
    {children}
  </div>
);

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");

  const loadProducts = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await ProductAPIs.getlatestproduct();
      const data = res?.data?.data;
      setProducts(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (error) {
      console.error("Strapi products:", error?.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;

    return products.filter((product) => {
      const title = String(product?.title ?? "").toLowerCase();
      const category = String(product?.category ?? "").toLowerCase();
      return title.includes(term) || category.includes(term);
    });
  }, [products, search]);

  const hasSearch = search.trim().length > 0;

  return (
    <section
      id="shop"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
              Shop
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Latest arrivals
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              New pieces added regularly. Search by product name or category to
              find what you need.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products…"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>

        <div className="mt-8">
          {status === "loading" && (
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
              aria-busy="true"
              aria-label="Loading products"
            >
              {SKELETON_KEYS.map((key) => (
                <ProductCardSkeleton key={key} />
              ))}
            </div>
          )}

          {status === "error" && (
            <Panel>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
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
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  We couldn’t load the products
                </p>
                <p className="mt-1 max-w-sm text-sm text-slate-600">
                  The store is temporarily unavailable. Please try again in a
                  moment.
                </p>
              </div>
              <button
                type="button"
                onClick={loadProducts}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Try again
              </button>
            </Panel>
          )}

          {status === "ready" && filteredProducts.length === 0 && (
            <Panel>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
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
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-slate-900">
                {hasSearch ? `No results for “${search.trim()}”` : "No products yet"}
              </p>
              <p className="max-w-sm text-sm text-slate-600">
                {hasSearch
                  ? "Try a different name or browse all products."
                  : "We’re restocking right now — check back shortly."}
              </p>
              {hasSearch && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                >
                  Clear search
                </button>
              )}
            </Panel>
          )}

          {status === "ready" && filteredProducts.length > 0 && (
            <>
              <p className="mb-4 text-xs font-medium text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
                {hasSearch && " matching your search"}
              </p>
              <ProductList data={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
