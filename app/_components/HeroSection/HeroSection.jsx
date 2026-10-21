import Link from "next/link";

const STATS = [
  { value: "Free", label: "Shipping over $99" },
  { value: "30 days", label: "Easy returns" },
  { value: "Secure", label: "Encrypted checkout" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,#ccfbf1_0%,rgba(255,255,255,0)_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            New season · 2026
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Everyday essentials,{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
              thoughtfully made.
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Fewer, better products. Honest pricing, fast delivery and a
            hassle-free 30-day return policy — so you can shop with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#shop"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              Shop the collection
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/#features"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Why Nova
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm font-bold text-slate-900">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs leading-snug text-slate-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Pure-CSS product visual — no external asset, no layout shift */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-500 via-teal-700 to-slate-900 shadow-2xl shadow-teal-900/25">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-300/30 blur-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-40 w-40 text-white/90 sm:h-52 sm:w-52"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-100">
                Curated essentials
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                Built to be used every day.
              </p>
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-300/40 backdrop-blur sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Free shipping
          </div>

          <div className="absolute -right-3 bottom-24 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-300/40 backdrop-blur sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10h18M7 15h4M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
            </span>
            30-day returns
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
