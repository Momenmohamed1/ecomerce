"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductAPIs from "@/app/_utils/ProductAPIs";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import ProductBanner from "../_Product/ProductBanner";
import ProductInfo from "../_Product/ProductInfo";
import ProductList from "@/app/_components/GetData/ProductList";

const ProductDetailsSkeleton = () => (
  <div
    className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12"
    aria-busy="true"
    aria-label="Loading product"
  >
    <div className="aspect-square w-full animate-pulse rounded-3xl bg-slate-100" />
    <div className="space-y-4">
      <div className="h-5 w-24 animate-pulse rounded-full bg-slate-100" />
      <div className="h-8 w-3/4 animate-pulse rounded-full bg-slate-100" />
      <div className="h-7 w-32 animate-pulse rounded-full bg-slate-100" />
      <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
      <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-100" />
      <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
    </div>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");

  const loadProduct = useCallback(async () => {
    if (!id) return;

    setStatus("loading");
    setRelated([]);

    try {
      const res = await ProductAPIs.getProjectById(id);
      const data = res?.data?.data ?? null;

      if (!data) {
        setStatus("notfound");
        return;
      }

      setProduct(data);
      setStatus("ready");

      if (data.category) {
        ProductAPIs.getProductByCategory(data.category)
          .then((relatedRes) => {
            const items = relatedRes?.data?.data ?? [];
            setRelated(
              items.filter((item) => item.documentId !== data.documentId)
            );
          })
          .catch(() => setRelated([]));
      }
    } catch (error) {
      console.error("Strapi product:", error?.message);
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/#shop" },
    { label: product?.title ?? "Product" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumbs items={breadcrumbItems} />

      {status === "loading" && <ProductDetailsSkeleton />}

      {status === "error" && (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
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
          <p className="text-sm font-semibold text-slate-900">
            We couldn’t load this product
          </p>
          <p className="max-w-sm text-sm text-slate-600">
            The store is temporarily unavailable. Please try again in a moment.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadProduct}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Try again
            </button>
            <Link
              href="/#shop"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Back to shop
            </Link>
          </div>
        </div>
      )}

      {status === "notfound" && (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-900">
            Product not found
          </p>
          <p className="max-w-sm text-sm text-slate-600">
            This product may have been removed or the link is incorrect.
          </p>
          <Link
            href="/#shop"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Browse the shop
          </Link>
        </div>
      )}

      {status === "ready" && product && (
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductBanner product={product} />
          <ProductInfo product={product} />
        </div>
      )}

      {status === "ready" && related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16 sm:mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                More to explore
              </p>
              <h2
                id="related-heading"
                className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
              >
                You may also like
              </h2>
            </div>
            <Link
              href="/#shop"
              className="hidden text-sm font-semibold text-teal-700 hover:text-teal-800 sm:block"
            >
              View all
            </Link>
          </div>
          <div className="mt-6">
            <ProductList data={related} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
