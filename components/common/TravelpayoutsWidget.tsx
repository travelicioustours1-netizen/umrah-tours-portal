"use client";

import { useEffect, useRef } from "react";

export default function TravelpayoutsWidget({
  src,
}: {
  src: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Prevent duplicate widgets during Fast Refresh / React development
    container.innerHTML = "";

    const script = document.createElement("script");

    script.async = true;
    script.src = src;
    script.charset = "utf-8";

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[120px]"
    />
  );
}