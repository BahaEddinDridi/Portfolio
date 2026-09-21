import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ClickSpark from "@/components/effects/ClickSpark";
import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import { site } from "@/data/site";
import { themeInitScript } from "@/hooks/useTheme";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    "full-stack developer",
    "web developer",
    "Next.js",
    "React",
    "TypeScript",
    site.name,
  ],
  icons: { icon: "/smoke-v2.ico" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/images/user.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/user.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dce8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#030f18" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint; see `themeInitScript`. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden antialiased`}
      >
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Navbar />
          {children}
          <Footer />
          {/* Portal target for the project modal, above the carousel's 3D context. */}
          <div id="modal-root" className="relative z-[100]" />
        </ClickSpark>
      </body>
    </html>
  );
}
