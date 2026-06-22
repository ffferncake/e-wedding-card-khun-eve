"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  lang: "en" | "th";
  isVisible: boolean;
  onOpen: () => void;
};

export default function EnvelopeOverlay({ lang, isVisible, onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const isTH = lang === "th";
  const fontClass = "typo-crayon-font";

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1000);
  };

  if (!isVisible || phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[1500] flex flex-col items-center justify-center"
      style={{
        transition: "opacity 0.7s ease",
        opacity: phase === "opening" ? 0 : 1,
        pointerEvents: phase === "opening" ? "none" : "auto",
      }}
    >
      {/* Background photo — soft blurred */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/bg_updated_1.webp"
          alt="background"
          fill
          priority
          className="object-cover"
          style={{ filter: "blur(2px) brightness(0.92)", transform: "scale(1.05)" }}
        />
        {/* Warm cream overlay to soften */}
        <div className="absolute inset-0 bg-[#f5ead8]/60" />
      </div>

      <div
        className="relative flex flex-col items-center select-none cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleOpen}
      >
        {/* === ENVELOPE === */}
        <div className="relative" style={{ width: 300 }}>

          {/* Flap — folds open when phase=opening */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 300,
              zIndex: 20,
              transformOrigin: "top center",
              transform: phase === "opening" ? "rotateX(-175deg)" : "rotateX(0deg)",
              transition: "transform 0.75s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Triangle flap shape */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderTop: "110px solid #c8a27b",
              }}
            />
          </div>

          {/* Envelope body */}
          <div
            style={{
              width: 300,
              height: 195,
              background: "#f2e4d5",
              border: "1.5px solid #caa98e",
              borderRadius: "0 0 16px 16px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(90,53,39,0.18)",
            }}
          >
            {/* Left fold */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "150px solid #dcc8af",
                borderRight: "150px solid transparent",
                borderBottom: "95px solid #dcc8af",
              }}
            />
            {/* Right fold */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid #d0bc9d",
                borderBottom: "95px solid #d0bc9d",
              }}
            />
            {/* Top inner triangle (underside of flap) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderTop: "110px solid #e8d5bf",
              }}
            />

            {/* Center: wax seal */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #a0694a, #5a3527)",
                  border: "2.5px solid #c8a27b",
                  boxShadow: "0 4px 12px rgba(90,53,39,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="bodar-font"
                  style={{
                    fontSize: 13,
                    color: "#f7efe6",
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  E&N
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Names & date below envelope */}
        <div className="mt-7 text-center">
          <p
            className="bodar-font"
            style={{ fontSize: 32, color: "#5a3527", letterSpacing: 2 }}
          >
            EVE & NUN
          </p>
          <p
            className={`${fontClass}`}
            style={{
              fontSize: 12,
              color: "#8a6a5a",
              marginTop: 4,
              letterSpacing: 5,
            }}
          >
            19 · 12 · 2026
          </p>

          {/* Tap label */}
          <div
            className="mt-6 flex items-center justify-center gap-3"
          >
            <div style={{ height: 1, width: 40, background: "#caa98e" }} />
            <p
              className={`${fontClass} animate-bounce`}
              style={{ fontSize: 14, color: "#7a4f35" }}
            >
              {isTH ? "แตะเพื่อเปิดซอง" : "Tap to open"}
            </p>
            <div style={{ height: 1, width: 40, background: "#caa98e" }} />
          </div>
          <p className="mt-2 text-[22px] animate-bounce">💌</p>
        </div>
      </div>
    </div>
  );
}
