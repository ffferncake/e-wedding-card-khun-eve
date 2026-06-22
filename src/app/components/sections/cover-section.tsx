"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// import SnowCanvas from "../snow-canvas";

const images = [
  "/images/bg_updated_1.webp",
  "/images/bg_updated_2.webp",
  "/images/bg_updated_3.webp",
];

export default function CoverSection() {
  const [current, setCurrent] = useState(0);

  // Preload next image for smooth crossfade
  useEffect(() => {
    const nextIndex = (current + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex];
  }, [current]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Wedding cover"
          fill
          priority={i === 0}
          className="absolute inset-0 object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 z-10 bg-black/16" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/18 via-transparent to-black/20" />
      {/* <SnowCanvas /> */}

      <div className="absolute left-1/2 top-[5.8%] z-20 w-full max-w-[420px] -translate-x-1/2 px-5">
        <div
          className="relative bodar-font select-none text-left text-[122px] font-normal uppercase leading-[0.73] text-white opacity-0 drop-shadow-[0_2px_14px_rgba(0,0,0,0.26)] animate-fadeIn sm:text-[138px]"
          style={{ animationDelay: "0.25s" }}
        >
          {/* & watermark behind names */}
          <span
            className="bodar-font absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
            style={{ fontSize: "clamp(180px, 45vw, 220px)", opacity: 0.32, lineHeight: 1, color: "#c8a27b" }}
          >
            &amp;
          </span>
          <p className="relative leading-[0.73]">EVE</p>
          <p className="relative ml-[100px] leading-[0.73]">NUN</p>
        </div>

        <p
          className="bodar-font mt-4 text-center text-[20px] font-light leading-none text-white opacity-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.32)] animate-fadeIn"
          style={{ animationDelay: "0.5s" }}
        >
          19.12.2026
        </p>
      </div>
    </section>
  );
}
