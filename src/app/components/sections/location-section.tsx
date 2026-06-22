"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";

const koreaMapUrl =
  "https://www.google.com/maps/search/?api=1&query=JK+Art+Convention%2C+164+Mullae-ro%2C+Yeongdeungpo-gu%2C+Seoul";
const koreaMapEmbedUrl =
  "https://www.google.com/maps?q=JK+Art+Convention%2C+164+Mullae-ro%2C+Yeongdeungpo-gu%2C+Seoul&output=embed";
const thailandMapUrl = "https://maps.app.goo.gl/KmSegrZQkE7tfJri8";
const thailandWebsiteUrl =
  "https://www.facebook.com/MellowGardenWineDineRestaurant";
const thailandMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.188559588486!2d100.6301381!3d13.8277133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d62860825a6a3%3A0xac71df54306132d7!2sMellow%20Garden!5e0!3m2!1sen!2skr!4v1778139853564!5m2!1sen!2skr";
type Props = {
  lang: "ko" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";

export default function LocationSection({
  lang,
  selectedVenue: controlledSelectedVenue,
  onSelectVenue,
}: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  const [internalVenueMode, setInternalVenueMode] =
    useState<VenueMode>("KOREA");
  const venueMode = controlledSelectedVenue ?? internalVenueMode;
  const setVenueMode = (venue: VenueMode) => {
    setInternalVenueMode(venue);
    onSelectVenue?.(venue);
  };
  const [mapViewMode, setMapViewMode] = useState<"MAP" | "IMAGE">("MAP");

  return (
    <div id="location" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>LOCATION</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "오시는 길" : "การเดินทาง"}
      </h3>

      <div className="flex justify-center gap-2 mb-4 mt-4">
        <button
          onClick={() => setVenueMode("KOREA")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            venueMode === "KOREA"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko" ? "한국 결혼식" : "งานแต่งที่เกาหลี"}
        </button>

        <button
          onClick={() => setVenueMode("THAILAND")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            venueMode === "THAILAND"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko"
            ? "태국 축하 파티 & After Party"
            : "งานฉลองที่ไทย & After Party"}
        </button>
      </div>

      {venueMode === "KOREA" ? (
        <>
          <div className={`text-center leading-[1.8] ${subTextSize}`}>
            <p>
              {lang === "ko"
                ? "JK 아트컨벤션 4층 엠버루체홀"
                : "JK Art Convention ชั้น 4 Amberluce Hall"}
            </p>

            <p>
              {lang === "ko"
                ? "서울특별시 영등포구 문래로 164 (문래동3가 55-16번지)"
                : "164 Mullae-ro, Yeongdeungpo-gu, Seoul"}
            </p>

            <p>{lang === "ko" ? "SK리더스뷰" : "SK Leaders View"}</p>
          </div>

          <div className="flex justify-center gap-2 mb-4 mt-4">
            <button
              onClick={() => setMapViewMode("MAP")}
              className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
                mapViewMode === "MAP"
                  ? "bg-[#111] text-white"
                  : "bg-white text-black border-[#ddd]"
              }`}
            >
              {lang === "ko" ? "지도 보기" : "แผนที่"}
            </button>

            <button
              onClick={() => setMapViewMode("IMAGE")}
              className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
                mapViewMode === "IMAGE"
                  ? "bg-[#111] text-white"
                  : "bg-white text-black border-[#ddd]"
              }`}
            >
              {lang === "ko" ? "약도 보기" : "แผนที่ภาพ"}
            </button>
          </div>

          {mapViewMode === "MAP" ? (
            <div className="relative w-full max-w-[420px] h-[350px] mx-auto rounded-[10px] overflow-hidden shadow-md">
              <iframe
                title="JK Art Convention Google Map"
                src={koreaMapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image
                src="/images/jk_map.jpg"
                alt="map"
                width={800}
                height={500}
                className="w-full max-w-[420px] rounded-xl"
              />
            </div>
          )}

          <div
            className={`flex justify-center gap-3 mt-[15px] ${subTextSize} ${fontClass}`}
          >
            <a
              href={koreaMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#eee]"
            >
              <MapPin size={20} />
              Google Maps
            </a>
          </div>
        </>
      ) : (
        <div>
          <div className="mt-4 w-full max-w-[420px] h-[330px] mx-auto rounded-[10px] overflow-hidden shadow-md bg-white">
            <iframe
              title="Mellow Garden Google Map"
              src={thailandMapEmbedUrl}
              className="h-full w-full border-0"
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className={`text-center leading-[1.8] pt-3 ${subTextSize}`}>
            <p className="font-semibold">Mellow Garden Wine & Dine Restaurant</p>
            <p>
              {lang === "ko"
                ? "10/895 Prasert-Manukitch Rd, Soi 33"
                : "10/895 ถนนประเสริฐมนูญกิจ ซอย 33"}
            </p>
            <p>
              {lang === "ko"
                ? "Nuanchan, Bueng Kum, Bangkok 10230"
              : "แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพฯ 10230"}
            </p>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-3 mt-[15px] ${subTextSize} ${fontClass}`}
          >
            <a
              href={thailandMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#eee]"
            >
              <MapPin size={20} />
              Google Maps
            </a>

            <a
              href={thailandWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#eee]"
            >
              <ExternalLink size={20} />
              {lang === "ko" ? "웹사이트" : "Facebook"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
