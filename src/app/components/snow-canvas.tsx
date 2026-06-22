"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  wind: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  blur: number;
}

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let flakes: Flake[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeFlake = (randomY = false): Flake => ({
      x: Math.random() * (canvas.width || window.innerWidth),
      y: randomY
        ? Math.random() * (canvas.height || window.innerHeight)
        : -(Math.random() * 100),
      r: Math.random() * 2.8 + 0.6,           // 0.6 – 3.4 px
      speed: Math.random() * 1.2 + 0.4,        // 0.4 – 1.6 px/frame
      wind: (Math.random() - 0.5) * 0.4,       // gentle horizontal drift
      opacity: Math.random() * 0.55 + 0.25,    // 0.25 – 0.8
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.004,
      blur: Math.random() < 0.3 ? Math.random() * 1.5 : 0, // 30% slightly blurry
    });

    const init = () => {
      resize();
      flakes = Array.from({ length: 140 }, () => makeFlake(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const f of flakes) {
        f.wobble += f.wobbleSpeed;
        f.x += Math.sin(f.wobble) * 0.6 + f.wind;
        f.y += f.speed;

        // reset when off-screen
        if (f.y > canvas.height + f.r) {
          Object.assign(f, makeFlake(false));
        }
        if (f.x > canvas.width + f.r) f.x = -f.r;
        if (f.x < -f.r) f.x = canvas.width + f.r;

        ctx.save();
        if (f.blur > 0) ctx.filter = `blur(${f.blur}px)`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 h-full w-full pointer-events-none"
    />
  );
}
