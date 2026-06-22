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

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/28 via-white/4 to-white/10" />
      <div className="absolute inset-x-0 top-0 z-10 h-[33%]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[34%] bg-gradient-to-t from-white/74 via-white/22 to-white/0" />

      <div className="pg-bathbomb absolute inset-x-0 top-[6.5%] z-20 flex items-baseline justify-between gap-3 px-5 text-[15px] uppercase leading-none tracking-[0.2em] text-black/72 drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)]">
        <p
          className="shrink-0 whitespace-nowrap text-left opacity-0 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          2026.09.13 (2 PM)
        </p>
        <p
          className="shrink-0 whitespace-nowrap text-right opacity-0 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          JK Art Convention
        </p>
      </div>

      <div className="absolute left-1/2 top-[15%] z-20 w-full -translate-x-1/2 -translate-y-1/2 px-3 text-center">
        <h1
          className="font-[BODAR] text-[74px] font-normal uppercase leading-none tracking-[0.018em] text-black/90 opacity-0 drop-shadow-[0_2px_18px_rgba(255,255,255,0.88)] animate-fadeIn sm:text-[86px]"
          style={{ animationDelay: "0.35s" }}
        >
          WEDDING
        </h1>

        <p
          className="pg-bathbomb mx-auto -mt-3 max-w-[260px] text-[17px] leading-none tracking-[0.08em] text-black/74 opacity-0 drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)] animate-fadeIn"
          style={{ animationDelay: "0.55s" }}
        >
          EVE&amp;NUN
        </p>
      </div>
    </section>
  );
}
