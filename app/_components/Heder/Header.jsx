"use client";

import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "@/app/_utils/CartApis";
import CartDropdown from "./CartDropdown";
import { PORTFOLIO_URL } from "@/app/_utils/links";

const NAVS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/#shop" },
  { name: "Features", href: "/#features" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const userButtonAppearance = {
  elements: {
    avatarBox: "h-9 w-9 rounded-full ring-2 ring-white",
    userButtonPopoverFooter: "hidden",
  },
  variables: {
    colorPrimary: "#0d9488",
    colorBackground: "#ffffff",
    colorForeground: "#0f172a",
    borderRadius: "12px",
    fontSize: "14px",
  },
};

export default function Header() {
  const { user } = useUser();
  const { setcart } = useContext(CartContext) ?? {};
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Load the signed-in user's cart once Clerk knows who they are
  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      setcart?.([]);
      return;
    }

    let cancelled = false;
    CartApis.getUserCartItems(email)
      .then((res) => {
        if (cancelled) return;
        const items = (res?.data?.data ?? []).map((cartItem) => ({
          id: cartItem?.documentId,
          product: cartItem?.projects?.[0],
          quantity: cartItem?.quantity ?? 1,
        }));
        setcart?.(items);
      })
      .catch((err) => console.error("Strapi:", err.response?.data ?? err));

    return () => {
      cancelled = true;
    };
  }, [user, setcart]);

  // Close the mobile menu after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent the page behind the mobile menu from scrolling
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:h-18 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          aria-label="Nova — home"
        >
          <Image src="/logo.svg" alt="" width={26} height={35} priority />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Nova
          </span>
        </Link>

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAVS.map((nav) => (
              <li key={nav.name}>
                <Link
                  href={nav.href}
                  className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:inline-flex"
        >
          Portfolio
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
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <CartDropdown onOpen={() => setOpen(false)} />

          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
            >
              Sign in
            </Link>
            <div className="hidden sm:block">
              <SignUpButton>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <span className="hidden max-w-32 truncate text-sm font-medium text-slate-600 sm:block">
              {user?.firstName || user?.username}
            </span>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/user-profile"
              appearance={userButtonAppearance}
            />
          </Show>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            {open ? (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu: animated with grid rows so it works without JS timers */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid overflow-hidden border-t border-slate-200 bg-white transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col">
              {NAVS.map((nav) => (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              My portfolio
              <svg
                className="h-4 w-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>

            <div className="mt-3 border-t border-slate-200 pt-4">
              <Show when="signed-out">
                <div className="grid grid-cols-2 gap-3">
                  <SignInButton>
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                    >
                      Sign up
                    </button>
                  </SignUpButton>
                </div>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <UserButton
                      userProfileMode="navigation"
                      userProfileUrl="/user-profile"
                      appearance={userButtonAppearance}
                    />
                    <span className="truncate text-sm font-medium text-slate-700">
                      {user?.fullName || user?.username}
                    </span>
                  </div>
                  <SignOutButton>
                    <button
                      type="button"
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Sign out
                    </button>
                  </SignOutButton>
                </div>
              </Show>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
