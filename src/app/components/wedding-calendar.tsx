"use client";
import React from "react";

type Props = {
  lang: "en" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";

type EventSchedule = {
  title: string;
  place: string;
  dateText: string;
  timeText: string;
  date: Date;
};

export default function WeddingCalendar({
  lang,
  selectedVenue = "KOREA",
  onSelectVenue,
}: Props) {
  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";

  const titleSize = "text-[15px]";
  const subTextSize = "text-[12px]";
  const weekSize = "text-[10px]";
  const daySize = "text-[10px]";
  const circleSize = isTH ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]";

  const weekDays =
    lang === "en"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const events: EventSchedule[] =
    lang === "en"
      ? [
          {
            title: "Wedding Ceremony",
            place: "Vivace Bangpu",
            dateText: "Saturday, December 19, 2026",
            timeText: "Vivace Bangpu",
            date: new Date(2026, 11, 19),
          },
        ]
      : [
          {
            title: "พิธีแต่งงาน",
            place: "วิวาเช่ บางปู",
            dateText: "วันเสาร์ ที่ 19 ธันวาคม 2569",
            timeText: "วิวาเช่ บางปู",
            date: new Date(2026, 11, 19),
          },
        ];

  const renderCalendar = (event: EventSchedule) => {
    const venueMode: VenueMode = "THAILAND";
    const isSelected = selectedVenue === venueMode;
    const year = event.date.getFullYear();
    const month = event.date.getMonth();
    const day = event.date.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [
      ...Array(firstDayOfWeek).fill(""),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];

    return (
      <div
        key={event.title}
        role="button"
        tabIndex={0}
        onClick={() => onSelectVenue?.(venueMode)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectVenue?.(venueMode);
          }
        }}
        className="flex min-h-full cursor-pointer flex-col px-2 py-3"
      >
        <p className={`${titleSize} font-semibold text-[#444] leading-snug`}>
          {event.title}
        </p>
        {/* <p className={`${subTextSize} mt-1 text-[#777] leading-snug`}>
          {event.place}
        </p> */}
        <p className={`${subTextSize} mt-2 text-[#444] font-semibold`}>
          {event.dateText}
        </p>
        <p className={`${subTextSize} text-gray-400 leading-snug`}>
          {event.timeText}
        </p>

        <div className="mt-3 border-t border-b border-[#d9bfa8] py-[6px]">
          <div className={`grid grid-cols-7 ${weekSize} mb-[5px] text-gray-400`}>
            {weekDays.map((weekday, index) => (
              <span
                key={weekday}
                className={
                  index === 0
                    ? "text-[#d69fa6]"
                    : index === 6
                      ? "text-[#8a5a3b]"
                      : ""
                }
              >
                {weekday}
              </span>
            ))}
          </div>

          <div className={`grid grid-cols-7 gap-y-[2px] ${daySize}`}>
            {days.map((date, index) => {
              const isSunday = index % 7 === 0;
              const isSaturday = index % 7 === 6;
              const isSelected = date === day;

              return (
                <span
                  key={`${event.title}-${date}-${index}`}
                  className={`text-[#555] ${
                    isSunday ? "text-[#d69fa6]" : ""
                  } ${isSaturday ? "text-[#8a5a3b]" : ""} ${
                    isSelected
                      ? `bg-[#8a5a3b] text-white ${circleSize} inline-flex items-center justify-center rounded-full mx-auto`
                      : ""
                  }`}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div
      className={`${fontClass} text-center mt-3 text-[#555] ${
        lang === "th" ? "" : ""
      }`}
    >
      <div className="grid grid-cols-1 gap-2">{events.map(renderCalendar)}</div>
      <div className="mt-3 text-[12px] text-[#888]">
        {lang === "en"
          ? "Please join us on our special day."
          : "ขอเชิญมาร่วมในวันสำคัญของเรา"}
      </div>
    </div>
  );
}
