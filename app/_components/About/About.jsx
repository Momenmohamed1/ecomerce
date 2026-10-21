import Link from "next/link";

const NUMBERS = [
  { value: "200+", label: "Curated products" },
  { value: "4", label: "Core categories" },
  { value: "24h", label: "Dispatch time" },
  { value: "98%", label: "Happy customers" },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                Our promise
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                “If we wouldn’t use it ourselves, we don’t sell it.”
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Every product is tested by our small team before it makes it to
                the store. That is why the catalogue stays small — and why it
                keeps getting better.
              </p>
            </div>
            {NUMBERS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 max-w-xl lg:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
            About Nova
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            A small store with a long-term mindset
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Nova started as a side project with one rule: only stock things
            that are genuinely useful. Today we curate a focused collection of
            everyday essentials, work with independent makers, and keep our
            prices transparent.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            No flash sales, no fake countdowns — just products we believe in,
            shipped quickly and backed by a real return policy.
          </p>
          <Link
            href="/#shop"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Browse the collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
