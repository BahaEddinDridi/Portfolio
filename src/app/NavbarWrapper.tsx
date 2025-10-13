"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/Navbar/Navbar"), { ssr: false });

export default function NavbarWrapper() {
  return <Navbar />;
}