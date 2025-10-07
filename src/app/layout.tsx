"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import ClickSpark from "@/components/ClickSpark";
import dynamic from "next/dynamic";

const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });
const Navbar = dynamic(() => import("@/components/layout/Navbar/Navbar"), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ position: "relative", minHeight: "100vh" }}
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
            <Ribbons
              baseThickness={18}
              colors={["#191970", "#303F9F", "#3F51B5"]}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade={false}
              enableShaderEffect={true}
            />
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}
