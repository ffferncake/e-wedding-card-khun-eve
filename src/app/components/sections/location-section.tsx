"use client";

import { MapPin, TrainFront } from "lucide-react";

const weddingMapUrl = "https://maps.app.goo.gl/rD9xKZB4zacTuMTCA?g_st=il";
const weddingMapEmbedUrl =
  "https://www.google.com/maps?q=Vivace%20Bangpu&output=embed";
type Props = {
  lang: "en" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";

export default function LocationSection({
  lang,
}: Props) {
  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";

  return (
    <div id="location" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>LOCATION</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Map & Location" : "การเดินทาง"}
      </h3>

      <div className="mt-4 w-full max-w-[420px] h-[330px] mx-auto rounded-[10px] overflow-hidden shadow-md bg-white">
        <iframe
          title="Vivace Bangpu Google Map"
          src={weddingMapEmbedUrl}
          className="h-full w-full border-0"
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className={`text-center leading-[1.8] pt-3 ${subTextSize}`}>
        <p className="font-semibold">
          {lang === "en" ? "Vivace Bangpu" : "วิวาเช่ บางปู"}
        </p>
        <p>
          {lang === "en"
            ? "Saturday, December 19, 2026"
            : "วันเสาร์ ที่ 19 ธันวาคม 2569"}
        </p>
      </div>

      <div
        className={`flex flex-wrap justify-center gap-3 mt-[15px] ${subTextSize} ${fontClass}`}
      >
        <a
          href={weddingMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[7px] bg-[#f7efe6] border border-[#d9bfa8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#f2e4d5] text-[#7a4f35] transition"
        >
          <MapPin size={18} />
          Google Maps
        </a>
      </div>

      {/* ── BTS Transportation Card ── */}
      <div className={`mt-5 rounded-xl border border-[#d9bfa8] bg-[#fdfaf6] overflow-hidden shadow-sm ${fontClass}`}>
        {/* Card header */}
        <div className="flex items-center gap-2.5 bg-[#f2e4d5] px-4 py-3 border-b border-[#d9bfa8]">
          <TrainFront size={16} className="text-[#7a4f35]" />
          <p className={`text-[13px] font-semibold text-[#5a3527] text-left ${fontClass}`}>
            {lang === "en" ? "Getting there by BTS" : "การเดินทางโดย BTS"}
          </p>
        </div>

        {/* Steps */}
        <div className="px-4 py-4 flex flex-col gap-0">

          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold"
                style={{ background: "#3ca45a" }}
              >
                1
              </div>
              <div className="mt-1 w-px flex-1 bg-[#d9bfa8]" style={{ minHeight: 28 }} />
            </div>
            <div className="pb-5 pt-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${fontClass}`}
                  style={{ background: "#3ca45a" }}
                >
                  BTS {lang === "en" ? "Green Line" : "สายสีเขียว"}
                </span>
                <span className={`text-[12px] text-[#5a3527] font-medium ${fontClass}`}>
                  {lang === "en" ? "Sukhumvit / Bearing direction" : "สาย Sukhumvit / ทิศทาง Bearing"}
                </span>
              </div>
              <p className={`mt-1 text-[12px] text-[#8a6a5a] leading-relaxed ${fontClass}`}>
                {lang === "en"
                  ? "Take BTS Green Line toward the Keha (Samut Prakan) end"
                  : "นั่งรถไฟฟ้า BTS สายสีเขียวมุ่งหน้าสายใต้ไปสุดสาย"}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold"
                style={{ background: "#8a5a3b" }}
              >
                2
              </div>
              <div className="mt-1 w-px flex-1 bg-[#d9bfa8]" style={{ minHeight: 28 }} />
            </div>
            <div className="pb-5 pt-0.5">
              <p className={`text-[13px] font-semibold text-[#5a3527] text-left ${fontClass}`}>
                {lang === "en" ? "Alight at Keha Station" : "ลงสถานีเคหะฯ"}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-[#d9bfa8] bg-[#f7efe6] px-2.5 py-1">
                <span className={`text-[11px] text-[#7a4f35] font-semibold ${fontClass}`}>
                  {lang === "en" ? "Exit 3" : "ทางออก 3"}
                </span>
                <span className="text-[10px] text-[#a28a75]">•</span>
                <span className={`text-[11px] text-[#8a6a5a] text-left ${fontClass}`}>
                  {lang === "en" ? "Keha Station (สถานีเคหะฯ)" : "BTS สถานีเคหะฯ"}
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold"
              style={{ background: "#c8a27b" }}
            >
              3
            </div>
            <div className="pt-0.5">
              <p className={`text-[13px] font-semibold text-[#5a3527] text-left ${fontClass}`}>
                {lang === "en" ? "Continue ~5 km to the venue" : "ต่อรถไปอีกประมาณ 5 กม."}
              </p>
              <p className={`mt-1 text-[12px] text-[#8a6a5a] leading-relaxed ${fontClass}`}>
                {lang === "en"
                  ? "Take a taxi, Grab, or local transport from Exit 3 — approx. 5 km to Vivace Bangpu"
                  : "นั่งแท็กซี่ หรือ Grab จากทางออก 3 ไปยังวิวาเช่ บางปู ระยะทางประมาณ 5 กิโลเมตร"}
              </p>
            </div>
          </div>

        </div>

        {/* Footer tip */}
        <div className="flex items-start gap-2 border-t border-[#e8d5bf] bg-[#f7efe6] px-4 py-2.5">
          <span className="text-[14px]">💡</span>
          <p className={`text-[11px] text-[#8a6a5a] leading-relaxed ${fontClass}`}>
            {lang === "en"
              ? "Tip: Book Grab in advance. Parking is available at the venue."
              : "แนะนำจอง Grab ล่วงหน้า มีที่จอดรถบริเวณสถานที่จัดงาน"}
          </p>
        </div>
      </div>

    </div>
  );
}
