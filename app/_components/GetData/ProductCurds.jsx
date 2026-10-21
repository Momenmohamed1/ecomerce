import Image from "next/image";
import Link from "next/link";

const money = (value) => `$${Number(value ?? 0).toFixed(2)}`;

const ProductCurds = ({ Product }) => {
  const price = Number(Product?.price ?? 0);
  const oldPrice = Number(Product?.Discount ?? 0);
  const hasDiscount = oldPrice > price && price > 0;
  const discountPercent = hasDiscount
    ? Math.round((1 - price / oldPrice) * 100)
    : 0;
  const imageUrl = Product?.images?.url;
  const inStock = Product?.Stock === undefined || Number(Product?.Stock) > 0;

  return (
    <Link
      href={`/product-details/${Product?.documentId}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={Product?.title ?? "Product"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}

        {hasDiscount && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
            −{discountPercent}%
          </span>
        )}

        {!inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-semibold uppercase tracking-wide text-slate-700 backdrop-blur-[1px]">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-700">
          {Product?.category ?? "Product"}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-9 text-sm font-semibold leading-snug text-slate-900">
          {Product?.title ?? "Untitled product"}
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-3">
          <span className="text-sm font-bold text-slate-900 sm:text-base">
            {money(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs font-medium text-slate-400 line-through">
              {money(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCurds;
