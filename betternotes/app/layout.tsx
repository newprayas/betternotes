import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CartBottomBar from "@/components/layout/cart-bottom-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "@Better Notes - Premium Medical Notes",
  description: "High-quality medical notes for MBBS students. Handwritten notes by a dedicated medical student covering all subjects and academic years.",
  keywords: "medical notes, MBBS, medical student, handwritten notes, medical education",
  authors: [{ name: "Medical Student" }],
  openGraph: {
    title: "@Better Notes - Premium Medical Notes",
    description: "High-quality medical notes for MBBS students",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <CartBottomBar />
        </CartProvider>
      </body>
    </html>
  );
}
