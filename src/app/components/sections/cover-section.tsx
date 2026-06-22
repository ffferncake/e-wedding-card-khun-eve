import Image from "next/image";

export default function CoverSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <Image
        src="/images/bg_updated_1.webp"
        alt="Wedding cover"
        fill
        priority
        className="absolute inset-0 object-cover"
      />

      <div className="absolute inset-0 z-10 bg-black/16" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/18 via-transparent to-black/20" />

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
