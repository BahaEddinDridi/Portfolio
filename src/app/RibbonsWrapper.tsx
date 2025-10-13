"use client";

import dynamic from "next/dynamic";

const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });

export default function RibbonsWrapper() {
  return (
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
        baseThickness={8}
        colors={["#191970", "#303F9F", "#3F51B5"]}
        speedMultiplier={0.5}
        maxAge={500}
        enableFade={false}
        enableShaderEffect={true}
      />
    </div>
  );
}