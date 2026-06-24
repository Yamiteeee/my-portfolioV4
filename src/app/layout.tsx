// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ColorProvider } from "@/components/ColorProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minimal Portfolio",
  description: "A clean, monochrome developer portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 
        Removed the hardcoded white, black, and dark mode triggers.
        The layout background and typography will now cleanly emerge from the ColorProvider.
      */}
      <body className="min-h-full flex flex-col">
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}