import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import ClickSpark from "@/components/ClickSpark";
import { Suspense } from "react";

import NavbarWrapper from "./NavbarWrapper"; // Adjust path if needed
import RibbonsWrapper from "./RibbonsWrapper";
import { ThemeProvider } from "@/hooks/useTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baha Eddine Dridi | Developer Portfolio",
  description: "Full-stack web developer portfolio showcasing projects, skills, and creativity.",
  icons: {
    icon: "/smoke-v2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden overflow-y-hidden`}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <ThemeProvider>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <NavbarWrapper />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
          <div
            id="modal-root"
            style={{ position: "relative", zIndex: 100 }}
          ></div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <RibbonsWrapper />
          </div>
        </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
