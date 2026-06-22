"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WeddingCalendar from "../wedding-calendar";

const locationImages = ["/images/location_1.jpg", "/images/location_2.jpg"];

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % locationImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
  };

  const dressCodeColors = [
    { name: "Vanilla", color: "#f5ead8" },
    { name: "Light brown", color: "#c8a27b" },
    { name: "Chocolate", color: "#5a3527" },
    { name: "Mocha", color: "#b46f33" },
  ];

  const ceremonyTimeline = [
    {
      time: "7:09 AM",
      label: lang === "en" ? "Buddhist ceremony" : "พิธีสงฆ์",
      icon: "/images/icon_monk.png",
    },
    {
      time: "9:09 AM",
      label: lang === "en" ? "Khan Maak procession" : "พิธีแห่ขันหมาก",
      icon: "/images/icon_khanmaak.png",
    },
    {
      time: "10:30 AM",
      label:
        lang === "en"
          ? "Water blessing ceremony"
          : "พิธีหลั่งน้ำพระพุทธมนต์",
      icon: "/images/icon_water.png",
    },
    {
      time: "6:00 PM",
      label: lang === "en" ? "Wedding reception" : "พิธีฉลองมงคลสมรส",
      icon: "/images/icon_reception.png",
    },
    {
      time: "9:00 PM",
      label: "After Party",
      icon: "/images/icon_discoball.svg",
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
      <p className={`title-en ${fontClass} ${titleSize}`}>WEDDING DETAILS</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Our Wedding Day" : "รายละเอียดงานแต่งงาน"}
      </h3>

      <p className={`mt-2 text-[#8a6a5a] ${subTextSize} ${fontClass}`}>
        {lang === "en"
          ? "A day of love, laughter, and celebration"
          : "ร่วมฉลองความรักและความทรงจำดี ๆ ไปด้วยกัน"}
      </p>

      {/* Venue photo slideshow */}
      <div className="relative mt-4 mb-[10px] w-full h-[220px] overflow-hidden rounded-xl shadow-md">
        {locationImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="Vivace Bangpu"
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-[1500ms] ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* overlay label */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 text-left">
          <p className={`font-bold text-white text-[15px] ${fontClass}`}>
            {selectedInfo.name}
          </p>
          <p className={`text-white/80 text-[12px] ${fontClass}`}>
            {selectedInfo.address}
          </p>
        </div>
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

      <div className="mt-4 border-y border-[#caa98e] bg-transparent px-1 py-4 text-left">
        <p className={`${fontClass} ${subTextSize} font-semibold text-[#4f4038]`}>
          {lang === "en" ? "✦ Ceremony Timeline" : "✦ ลำดับพิธีการ"}
        </p>
        <div className="relative mt-3 space-y-0">
          {ceremonyTimeline.map((item, index) => (
            <div
              key={`${item.time}-${item.label}`}
              className="relative grid grid-cols-[64px_36px_1fr] items-start gap-2 pb-3 last:pb-0"
            >
              {/* time */}
              <span className={`font-semibold text-[11px] text-[#8a5a3b] pt-1 ${fontClass}`}>{item.time}</span>

              {/* icon + line */}
              <span className="relative flex flex-col items-center">
                {index !== ceremonyTimeline.length - 1 && (
                  <span className="absolute left-1/2 top-9 h-[calc(100%+4px)] w-px -translate-x-1/2 bg-[#caa98e]" />
                )}
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#f7efe6] border border-[#d9bfa8] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="object-contain"
                    style={{ background: "transparent" }}
                  />
                </span>
              </span>

              {/* label */}
              <span className={`text-[#5f5048] pt-1.5 text-[13px] ${fontClass}`}>{item.label}</span>
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
