"use client";

import { LucideIcon, Globe } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = {
  icon: LucideIcon;
  label: string;
};

type Props = {
  navItems: NavItem[];
  activeIndex: number;
  onClick: (index: number) => void;
};

export default function BottomNav({ navItems, activeIndex, onClick }: Props) {
  const pathname = usePathname();

  const lang: "en" | "th" = pathname.startsWith("/th") ? "th" : "en";

  const handleLangChange = (target: "en" | "th") => {
    if (target === lang) return;

    localStorage.setItem("lang", target);

    window.location.href = target === "th" ? "/th" : "/";
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[410px] z-50 flex flex-col gap-2">
      {/* 🌐 language switch */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 rounded-full border border-[#caa98e]/70 bg-[#fffaf5]/85 px-3 py-1 text-xs shadow-md backdrop-blur-xl">
          <Globe size={14} className="text-[#7a4f35]" />

          <button
            onClick={() => handleLangChange("en")}
            className={`px-2 py-[2px] rounded-full transition-all duration-200 ${
              lang === "en"
                ? "bg-[#5a3527] text-white scale-105"
                : "text-[#8a6a5a] hover:bg-[#f2e4d5]"
            }`}
          >
            EN
          </button>

          <button
            onClick={() => handleLangChange("th")}
            className={`px-2 py-[2px] rounded-full transition ${
              lang === "th"
                ? "bg-[#5a3527] text-white"
                : "text-[#8a6a5a] hover:bg-[#f2e4d5]"
            }`}
          >
            TH
          </button>
        </div>
      </div>

      {/* bottom nav */}
      <div className="relative flex items-center rounded-full border border-[#caa98e]/70 bg-[#fffaf5]/85 px-2 shadow-lg backdrop-blur-xl">
        {/* active indicator */}
        <div
          className="absolute top-1/2 h-[48px] -translate-y-1/2 rounded-full bg-[#f2e4d5] shadow-md transition-all duration-300"
          style={{
            width: `calc((100% - 16px) / ${navItems.length})`,
            left: `calc(${activeIndex} * ((100% - 16px) / ${navItems.length}) + 8px)`,
          }}
        />

        {navItems.map(({ icon: Icon, label }, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => onClick(index)}
              className="relative z-10 flex flex-col items-center justify-center flex-1 h-[56px] gap-1"
            >
              <Icon
                size={18}
                className={isActive ? "scale-105 text-[#5a3527]" : "text-[#a28a75]"}
              />

              <span
                className={
                  isActive
                    ? "text-[8px] font-medium text-[#5a3527]"
                    : "text-[8px] text-[#a28a75]"
                }
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
