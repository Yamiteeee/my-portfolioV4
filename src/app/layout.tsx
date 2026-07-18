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

// Premium high-contrast vector string used to completely strip out default host headers
const svgFavicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><rect width='100' height='100' rx='22' fill='%2309090b'/><circle cx='50' cy='50' r='42' stroke='%2327272a' stroke-width='3' stroke-dasharray='6 4'/><path d='M38 32H58V54C58 63 50 68 42 68' stroke='%23fafafa' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/><path d='M58 32H70C76 32 80 36 80 42C80 48 76 52 70 52H58' stroke='%2371717a' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/><circle cx='50' cy='50' r='4' fill='%2310b981'/></svg>`;

export const metadata: Metadata = {
  title: {
    default: "Jason Platino | Full-Stack Engineer & Systems Builder",
    template: "%s | Jason Platino"
  },
  description: "Explore the software engineering portfolio of Jason Platino. Specializing in independent full-stack architecture, high-performance Next.js apps, and maintainable systems implementation.",
  keywords: ["Jason Platino", "Full-Stack Engineer", "Software Developer Portfolio", "Next.js Portfolio", "Supabase Developer", "Web Performance"],
  authors: [{ name: "Jason Platino" }],
  creator: "Jason Platino",
  metadataBase: new URL("https://jsonportfolio.fun"), 
  
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN_HERE", 
  },

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsonportfolio.fun",
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

  twitter: {
    card: "summary_large_image",
    title: "Jason Platino | Full-Stack Engineer & Systems Builder",
    description: "Independent full-stack engineering and high-performance apps by Jason Platino.",
    images: ["/Bio/ProfilePic/Profile.jpg"],
  },

  // ─── CRITICAL MOBILE FIXED ICON MATRIX ──────────────────────────────────────
  icons: {
    icon: [
      { url: svgFavicon, type: 'image/svg+xml' },
    ],
    shortcut: svgFavicon,
    apple: [
      { url: svgFavicon, type: 'image/svg+xml' },
    ],
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
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-50"
        suppressHydrationWarning
      >
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}