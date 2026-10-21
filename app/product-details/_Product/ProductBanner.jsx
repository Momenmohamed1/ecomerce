import Image from "next/image";

const ProductBanner = ({ product }) => {
  const imageUrl = product?.images?.url;

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product?.title ?? "Product"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 sm:p-10"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
            <svg
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10.5" r="1.5" />
              <path d="M21 15l-5-5L5 19" />
            </svg>
            <span className="text-xs font-medium">No image available</span>
          </div>
        )}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-600">
        <li className="rounded-xl border border-slate-200 bg-white px-2 py-2.5">
          Free shipping
        </li>
        <li className="rounded-xl border border-slate-200 bg-white px-2 py-2.5">
          30-day returns
        </li>
        <li className="rounded-xl border border-slate-200 bg-white px-2 py-2.5">
          Secure payment
        </li>
      </ul>
    </div>
  );
};

export default ProductBanner;
