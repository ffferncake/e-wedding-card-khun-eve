"use client";

import Image from "next/image";

type Props = {
  lang: "en" | "th";
};

export default function SubwaySection({ lang }: Props) {
 const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";


  return (
    <div id="location-subway" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>SUBWAY</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "By Subway" : "การเดินทางด้วยรถไฟฟ้า"}
      </h3>

      <div className={`flex flex-row justify-center gap-5 ${titleSize}`}>
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/icon/ellipse_green.svg"
            alt="line2"
            width={19}
            height={19}
          />
          <p>{lang === "en" ? "Line 2 Mullae Station" : "รถไฟฟ้าสาย 2 สถานี Mullae"}</p>
        </div>
      </div>

      <p className={`mt-2 ${subTextSize}`}>
        {lang === "en"
          ? "Shuttle bus: available behind Exit 4"
          : "รถรับส่ง : ออกทางออก 4 (ด้านหลัง) มีรถรับส่ง"}
      </p>

      <p className={`mt-2 ${subTextSize}`}>
        {lang === "en"
          ? "On foot: walk straight 300 m from Exit 5"
          : "เดินเท้า : ออกทางออก 5 เดินตรงประมาณ 300 เมตร"}
      </p>
    </div>
  );
}
