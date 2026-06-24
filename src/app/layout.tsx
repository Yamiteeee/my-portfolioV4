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

// Production-ready SEO Architecture
export const metadata: Metadata = {
  title: {
    default: "Jason Platino | Full-Stack Engineer & Systems Builder",
    template: "%s | Jason Platino"
  },
  description: "Explore the software engineering portfolio of Jason Platino. Specializing in independent full-stack architecture, high-performance Next.js apps, and maintainable systems implementation.",
  keywords: ["Jason Platino", "Full-Stack Engineer", "Software Developer Portfolio", "Next.js Portfolio", "Supabase Developer", "Web Performance"],
  authors: [{ name: "Jason Platino" }],
  creator: "Jason Platino",
  
  // FIXED: Set to your actual apex domain (without the "t") to align with your Hostinger registry
  metadataBase: new URL("https://jsonporfolio.fun"), 
  
  // GOOGLE SEARCH CONSOLE INTEGRATION: Put your verification string here
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN_HERE", 
  },

  // Search Engine Crawler Directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (LinkedIn, Discord, Meta Platforms)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsonporfolio.fun", // Fixed domain typo
    title: "Jason Platino | Full-Stack Engineer & Systems Builder",
    description: "Explore the software engineering portfolio of Jason Platino. Specializing in independent full-stack architecture, high-performance Next.js apps, and maintainable systems implementation.",
    siteName: "Jason Platino Portfolio",
    images: [
      {
        url: "/Bio/ProfilePic/Profile.jpg", 
        width: 1200,
        height: 630,
        alt: "Jason Platino Portfolio Preview",
      },
    ],
  },

  // X / Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Jason Platino | Full-Stack Engineer & Systems Builder",
    description: "Independent full-stack engineering and high-performance apps by Jason Platino.",
    images: ["/Bio/ProfilePic/Profile.jpg"],
  },

  // High-Contrast Web Tab Optimization (Optimized for 16x16 / 32x32 viewing)
  icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><circle cx='50' cy='50' r='46' fill='%23111111' /><circle cx='50' cy='50' r='40' stroke='%23333333' stroke-width='4' /><path d='M36 32H56V54C56 62 49 67 41 67' stroke='%23ffffff' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'/><path d='M56 32H68C74 32 78 36 78 42C78 48 74 52 68 52H56' stroke='%23a1a1aa' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'/><circle cx='50' cy='50' r='3.5' fill='%2334d399' /></svg>`,
  },
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
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}