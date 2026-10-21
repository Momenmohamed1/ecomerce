import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const signInAppearance = {
  elements: {
    card: "bg-white shadow-none p-0",
    footerItem: "hidden",
    headerTitle: "text-slate-900",
    headerSubtitle: "text-slate-500",
    socialButtonsBlockButtonText: "text-slate-700",
    formFieldLabel: "text-slate-600",
    formFieldInput:
      "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400",
    formFieldInfoText: "text-slate-500",
    footerActionText: "text-slate-500",
    footerActionLink: "text-teal-700 hover:text-teal-800",
    formFieldInputShowPasswordButton: "text-slate-500",
  },
  variables: {
    colorPrimary: "#0d9488",
    colorBackground: "#ffffff",
    colorForeground: "#0f172a",
    borderRadius: "12px",
    fontSize: "14px",
  },
};

const SignInPage = () => {
  return (
    <main className="mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <SignIn appearance={signInAppearance} />
          </div>
        </div>

        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900 p-10 text-white lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
          />
          <Link
            href="/"
            className="relative flex items-center gap-2 text-lg font-bold"
          >
            <Image src="/logo.svg" alt="" width={24} height={32} />
            Nova
          </Link>

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-100">
              Welcome back
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-snug">
              Your cart, your orders and your details — all in one place.
            </h1>
            <ul className="mt-6 space-y-3 text-sm text-teal-50/90">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-200" />
                Cart saved across devices
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-200" />
                Faster checkout every time
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-200" />
                Order updates straight to your inbox
              </li>
            </ul>
          </div>

          <p className="relative text-xs text-teal-100/80">
            Secure authentication powered by Clerk.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
