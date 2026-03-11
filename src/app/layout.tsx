import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BizLedger — US Business Entity Search",
    template: "%s | BizLedger",
  },
  description:
    "Search and verify US business entities. Find company registration details, owner information, filing status, and more with BizLedger.",
  keywords: [
    "business search",
    "company lookup",
    "business entity",
    "LLC search",
    "corporation search",
    "US business registry",
  ],
  authors: [{ name: "BizLedger" }],
  openGraph: {
    title: "BizLedger — US Business Entity Search",
    description:
      "Search and verify US business entities. Find company registration details, owner information, and filing status.",
    type: "website",
    siteName: "BizLedger",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
