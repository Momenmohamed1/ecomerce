import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Heder/Header";
import Footer from "./_components/Footer/Footer";
import CartProvider from "./_components/CartProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://ecomerce-blush-eight.vercel.app"),
  title: {
    default: "Nova — Everyday essentials, thoughtfully made",
    template: "%s | Nova",
  },
  description:
    "Nova is a modern online store for everyday essentials: carefully selected products, honest pricing, fast delivery and a 30-day return policy.",
  keywords: [
    "online store",
    "ecommerce",
    "everyday essentials",
    "shop",
    "Nova",
  ],
  openGraph: {
    type: "website",
    siteName: "Nova",
    title: "Nova — Everyday essentials, thoughtfully made",
    description:
      "Carefully selected products, honest pricing, fast delivery and 30-day returns.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova — Everyday essentials, thoughtfully made",
    description:
      "Carefully selected products, honest pricing, fast delivery and 30-day returns.",
  },
  robots: { index: true, follow: true },
  authors: [
    { name: "Momen Mohamed", url: "https://myprotfolio2-five.vercel.app" },
  ],
  creator: "Momen Mohamed",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider ui={ui} appearance={{ cssLayerName: "clerk" }}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col bg-white text-slate-900">
          <CartProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
