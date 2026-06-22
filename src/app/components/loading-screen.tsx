"use client";

type Props = {
  lang: "en" | "th";
  progress: number;
  isReady: boolean;
};

export default function LoadingScreen({ lang, progress, isReady }: Props) {
  const isTH = lang === "th";
  const fontClass = "typo-crayon-font";

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-[#fdfaf6] transition-opacity duration-700 ${
        isReady ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isReady}
    >
      <div className={`w-full max-w-[320px] px-8 text-center ${fontClass}`}>

        {/* Letter / envelope icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center animate-pulse">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Envelope body */}
            <rect x="4" y="16" width="56" height="38" rx="5" fill="#f2e4d5" stroke="#c8a27b" strokeWidth="2" />
            {/* Envelope flap */}
            <path d="M4 21 L32 38 L60 21" stroke="#c8a27b" strokeWidth="2" fill="none" strokeLinejoin="round" />
            {/* Flap top fold */}
            <path d="M4 16 L32 32 L60 16" fill="#e8d5bf" stroke="#c8a27b" strokeWidth="2" strokeLinejoin="round" />
            {/* Wax seal dot */}
            <circle cx="32" cy="40" r="6" fill="#8a5a3b" stroke="#c8a27b" strokeWidth="1.5" />
            <text x="32" y="44" textAnchor="middle" fontSize="6" fill="#f7efe6" fontWeight="bold">E&N</text>
          </svg>
        </div>

        <p className={`text-[18px] text-[#5a3527] ${fontClass}`}>
          {isTH ? "กำลังเตรียมการ์ดเชิญ" : "Preparing your invitation"}
        </p>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e8d5bf]">
          <div
            className="h-full rounded-full bg-[#8a5a3b] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className={`mt-3 text-[12px] text-[#a28a75] ${fontClass}`}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
