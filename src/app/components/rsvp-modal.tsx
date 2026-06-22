"use client";

import { X } from "lucide-react";
import RSVPSection from "./sections/rspv-section";

type Props = {
  lang: "en" | "th";
  isOpen: boolean;
  doNotShowToday: boolean;
  onDoNotShowTodayChange: (checked: boolean) => void;
  onClose: () => void;
};

export default function RsvpModal({
  lang,
  isOpen,
  doNotShowToday,
  onDoNotShowTodayChange,
  onClose,
}: Props) {
  const isTH = lang === "th";
  const fontClass = "typo-crayon-font";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-label={isTH ? "ยืนยันการเข้าร่วม" : "RSVP"}
    >
      <div className="relative w-full max-w-[340px]">
        <div className="relative z-[1] mx-auto max-h-[82dvh] w-[92%] overflow-hidden rounded-[24px] border border-[#d9bfa8] bg-[#fdfaf6] shadow-[0_20px_50px_rgba(90,53,39,0.18)]">
          {/* Subtle texture overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-[length:6px_6px]" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isTH ? "ปิด" : "Close"}
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#d9bfa8] bg-white/90 text-[#7a4f35] shadow-sm transition hover:bg-[#f7efe6]"
          >
            <X size={17} />
          </button>

          {/* Scrollable content */}
          <div className="scrollbar-hide relative max-h-[82dvh] overflow-y-auto pt-2 pb-5">
            <RSVPSection lang={lang} compact />
          </div>

          {/* Do not show today */}
          <div className="border-t border-[#e8d5bf] bg-[#fdfaf6] px-4 py-3">
            <label
              className={`flex items-center justify-center gap-2 text-[#8a6a5a] ${fontClass} text-[11px] cursor-pointer`}
            >
              <input
                type="checkbox"
                checked={doNotShowToday}
                onChange={(e) => onDoNotShowTodayChange(e.target.checked)}
                className="grid h-4 w-4 appearance-none place-items-center rounded-[4px] border-2 border-[#c8a27b] bg-transparent transition checked:border-[#7a4f35] checked:bg-[#7a4f35] checked:after:block checked:after:h-2 checked:after:w-1 checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white checked:after:content-['']"
              />
              {isTH ? "ไม่แสดงอีกวันนี้" : "Do not show again today"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
