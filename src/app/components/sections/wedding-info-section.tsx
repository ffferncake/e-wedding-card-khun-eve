"use client";

import { useEffect, useState } from "react";
import WeddingCalendar from "../wedding-calendar";

type Props = {
  lang: "en" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";
type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const emptyTimeLeft: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const countdownTargets = {
  KOREA: new Date("2026-12-19T18:00:00+07:00"),
  THAILAND: new Date("2026-12-19T18:00:00+07:00"),
};

export default function WeddingInfoSection({
  lang,
  selectedVenue: controlledSelectedVenue,
  onSelectVenue,
}: Props) {
  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";

  const hallNameSize = "text-[18px]";
  const subTextSize = "text-[14px]";
  const countNumberSize = "text-[16px]";
  const countLabelSize = "text-[11px]";

  const [internalSelectedVenue, setInternalSelectedVenue] =
    useState<VenueMode>("THAILAND");
  const selectedVenue = controlledSelectedVenue ?? internalSelectedVenue;
  const setSelectedVenue = (venue: VenueMode) => {
    setInternalSelectedVenue(venue);
    onSelectVenue?.(venue);
  };

  const [countdowns, setCountdowns] = useState<Record<VenueMode, TimeLeft>>({
    KOREA: emptyTimeLeft,
    THAILAND: emptyTimeLeft,
  });

  const selectedInfo = {
    name: lang === "en" ? "Vivace Bangpu" : "วิวาเช่ บางปู",
    address:
      lang === "en"
        ? "Saturday, December 19, 2026"
        : "วันเสาร์ ที่ 19 ธันวาคม 2569",
    detail: lang === "en" ? "Vivace Bangpu" : "วิวาเช่ บางปู",
    link: "https://maps.app.goo.gl/rD9xKZB4zacTuMTCA?g_st=il",
  };

  const dressCodeColors = [
    { name: "Cream", color: "#f5ead8" },
    { name: "Light brown", color: "#c8a27b" },
    { name: "Chocolate", color: "#5a3527" },
    { name: "Caramel", color: "#b46f33" },
  ];

  const ceremonyTimeline = [
    {
      time: "07:09",
      label: lang === "en" ? "Buddhist ceremony" : "พิธีสงฆ์",
    },
    {
      time: "09:09",
      label: lang === "en" ? "Khan Maak procession" : "พิธีแห่ขันหมาก",
    },
    {
      time: "10:30",
      label:
        lang === "en"
          ? "Water blessing ceremony"
          : "พิธีหลั่งน้ำพระพุทธมนต์",
    },
    {
      time: "18:00",
      label: lang === "en" ? "Wedding reception" : "พิธีฉลองมงคลสมรส",
    },
    {
      time: "21:00",
      label: "After Party",
    },
  ];

  // countdown
  useEffect(() => {
    const getTimeLeft = (target: Date): TimeLeft => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return emptyTimeLeft;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      );
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      return { days, hours, minutes, seconds };
    };

    const update = () => {
      setCountdowns({
        KOREA: getTimeLeft(countdownTargets.KOREA),
        THAILAND: getTimeLeft(countdownTargets.THAILAND),
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownCards = [
    {
      venue: "THAILAND" as const,
      title: lang === "en" ? "Wedding Day" : "วันแต่งงาน",
      time: countdowns.THAILAND,
    },
  ];

  const renderCountdown = (item: (typeof countdownCards)[number]) => {
    const isSelected = selectedVenue === item.venue;
    const values = [
      { value: item.time.days, label: lang === "en" ? "Days" : "วัน" },
      { value: item.time.hours, label: lang === "en" ? "Hours" : "ชม." },
      { value: item.time.minutes, label: lang === "en" ? "Min" : "นาที" },
      { value: item.time.seconds, label: lang === "en" ? "Sec" : "วิ" },
    ];

    return (
      <button
        key={item.venue}
        onClick={() => setSelectedVenue(item.venue)}
        className={`${fontClass} rounded-lg border border-[#d9bfa8] bg-[#f7efe6]/55 px-2 py-3 transition`}
      >
        <p className={`${fontClass} ${subTextSize} font-semibold text-[#444]`}>
          {item.title}
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {values.map((value) => (
            <div key={value.label} className={`${fontClass} text-center`}>
              <div
                className={`${fontClass} rounded-md bg-[#efe0d0] px-1 py-1 font-bold text-[#4f4038] ${countNumberSize}`}
              >
                {value.value}
              </div>
              <div
                className={`${fontClass} mt-1 text-[#444] font-medium ${countLabelSize}`}
              >
                {value.label}
              </div>
            </div>
          ))}
        </div>
      </button>
    );
  };

  return (
    <div id="weddinginfo" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>WEDDING HALL</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Join Us on Our Special Day" : "ร่วมเฉลิมฉลองวันพิเศษของเรา"}
      </h3>

      <p className={`mt-2 text-[#8a6a5a] ${subTextSize} ${fontClass}`}>
        {lang === "en"
          ? "We warmly invite you to celebrate with us"
          : "เราขอเรียนเชิญทุกท่านมาร่วมเป็นสักขีพยาน"}
      </p>

      <div className="mt-4 mb-[10px] rounded-lg border border-[#d9bfa8] bg-[#f7efe6]/55 px-4 py-4 text-center leading-[1.8] text-[#6b5548]">
        <p className={`font-bold text-[#5a3527] ${hallNameSize} ${fontClass}`}>
          {selectedInfo.name}
        </p>
        <p className={`mt-1 text-[#7a5a4a] font-medium ${subTextSize} ${fontClass}`}>
          {selectedInfo.address}
        </p>
        <p className={`text-[#a28f85] text-[12px] ${fontClass}`}>
          {lang === "en" ? "Samut Prakan, Thailand" : "สมุทรปราการ, ประเทศไทย"}
        </p>
      </div>

      {/* Dress code — no container, single row */}
      <div className="mt-4 text-left">
        <p className={`${fontClass} text-[12px] font-semibold text-[#7a4f35] mb-2`}>
          {lang === "en" ? "✦ Dress Code" : "✦ ธีมสีงานแต่ง"}
        </p>
        <div className="flex flex-nowrap justify-between items-center gap-1.5 overflow-x-auto pb-1">
          {dressCodeColors.map((item) => (
            <div
              key={item.name}
              className="flex flex-shrink-0 items-center gap-1 rounded-full border border-[#d8baa2] bg-[#f2e4d5]/80 px-2 py-0.5"
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-white shadow-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-[#5c4a40] whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[#d9bfa8] bg-[#f7efe6]/55 px-4 py-4 text-left">
        <p className={`${fontClass} ${subTextSize} font-semibold text-[#4f4038]`}>
          {lang === "en" ? "✦ Ceremony Timeline" : "✦ ลำดับพิธีการ"}
        </p>
        <div className="relative mt-3 space-y-0">
          {ceremonyTimeline.map((item, index) => (
            <div
              key={`${item.time}-${item.label}`}
              className="relative grid grid-cols-[54px_18px_1fr] items-start gap-2 pb-3 last:pb-0"
            >
              <span className="font-semibold text-[#8a5a3b]">{item.time}</span>
              <span className="relative flex h-6 justify-center">
                {index !== ceremonyTimeline.length - 1 && (
                  <span className="absolute left-1/2 top-3 h-[calc(100%+12px)] w-px -translate-x-1/2 bg-[#caa98e]" />
                )}
                <span className="relative z-10 mt-1 h-2.5 w-2.5 rounded-full border border-[#b98561] bg-[#8a5a3b]" />
              </span>
              <span className="text-[#5f5048]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <WeddingCalendar
        lang={lang}
        selectedVenue={selectedVenue}
        onSelectVenue={setSelectedVenue}
      />

      {/* countdown */}
      <div className="mt-4 grid grid-cols-1 gap-2">
        {countdownCards.map(renderCountdown)}
      </div>
    </div>
  );
}
