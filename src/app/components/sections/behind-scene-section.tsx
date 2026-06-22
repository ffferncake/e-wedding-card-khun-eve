"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { behindSceneImages } from "../../data/behind-scene";

type Props = {
  lang: "en" | "th";
};

export default function BehindSceneSection({ lang }: Props) {
  const isTH = lang === "th";
  const fontClass = "typo-crayon-font";
  const subTextSize = "text-[14px]";

  const behindImages: readonly string[] = behindSceneImages;
  const behindVisibleCount = Math.min(3, behindImages.length);
  const behindLastIndex = Math.max(behindImages.length - behindVisibleCount, 0);

  const [behindIndex, setBehindIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Auto-slide every 3 seconds, paused when lightbox is open
  useEffect(() => {
    if (behindLastIndex === 0 || lightboxIndex !== null) return;

    const intervalId = window.setInterval(() => {
      setBehindIndex((current) =>
        current + 1 > behindLastIndex ? 0 : current + 1,
      );
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [behindLastIndex, lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % behindImages.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + behindImages.length) % behindImages.length,
        );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, behindImages.length]);

  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % behindImages.length));
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + behindImages.length) % behindImages.length,
    );

  return (
    <>
      <section className={`mx-auto w-full max-w-[420px] ${fontClass}`}>
        <div className="section pb-3">
          <p className={`title-en ${fontClass} text-[16px]`}>BEHIND THE SCENE</p>
          <h3 className={`highlight ${fontClass} text-[18px]`}>
            {isTH ? "เบื้องหลัง" : "Behind the Scene"}
          </h3>
        </div>

        <div className="relative w-full max-w-[420px] mx-auto mt-2">
          {/* 3-up horizontal slider */}
          <div className="relative overflow-hidden rounded-xl bg-gray-100 p-2">
            <div
              className="flex gap-2 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(calc(-${behindIndex} * (((100% - 16px) / 3) + 8px)))`,
              }}
            >
              {behindImages.map((image, imageIndex) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setLightboxIndex(imageIndex)}
                  aria-label={isTH ? "ดูรูปภาพขนาดใหญ่" : "View photo"}
                  className="relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg border border-[#d9bfa8] bg-white"
                  style={{ flex: "0 0 calc((100% - 16px) / 3)" }}
                >
                  <Image
                    src={image}
                    alt={`behind-scene-${imageIndex + 1}`}
                    fill
                    quality={60}
                    sizes="(max-width: 420px) 33vw, 135px"
                    className="object-cover transition-transform duration-300 hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Counter */}
          <p className={`text-center mt-3 text-gray-500 ${fontClass} ${subTextSize}`}>
            {behindIndex + 1}–{Math.min(behindIndex + behindVisibleCount, behindImages.length)}{" "}
            / {behindImages.length}
          </p>

          {/* Dot indicators */}
          {behindLastIndex > 0 && (
            <div className="flex justify-center items-center gap-1.5 mt-2">
              {Array.from({ length: behindLastIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setBehindIndex(i)}
                  aria-label={`Go to set ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === behindIndex ? 20 : 8,
                    height: 8,
                    backgroundColor: i === behindIndex ? "#7a4f35" : "#d9bfa8",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={isTH ? "ดูรูปภาพเบื้องหลัง" : "View behind the scene photo"}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label={isTH ? "ปิด" : "Close"}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <X size={24} />
          </button>

          {behindImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label={isTH ? "รูปก่อนหน้า" : "Previous photo"}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label={isTH ? "รูปถัดไป" : "Next photo"}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div className="relative h-[100dvh] w-screen max-w-[420px]">
            <Image
              src={behindImages[lightboxIndex] ?? ""}
              alt={`behind-scene-${lightboxIndex + 1}`}
              fill
              quality={85}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-white backdrop-blur ${fontClass} ${subTextSize}`}
          >
            {lightboxIndex + 1} / {behindImages.length}
          </p>
        </div>
      )}
    </>
  );
}
