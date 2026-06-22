"use client";

type Props = {
  lang: "en" | "th";
};

export default function ParkingSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";

  return (
    <div
      id="location-parking"
      className={`section ${fontClass} ${sectionSize}`}
    >
      <p className={`title-en ${fontClass} ${titleSize}`}>PARKING</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Parking" : "ที่จอดรถ"}
      </h3>

      <p className={`${subTextSize}`}>
        {lang === "en"
          ? 'Navigation: search for "Vivace Bangpu"'
          : 'นำทาง : ค้นหา "วิวาเช่ บางปู" หรือ "Vivace Bangpu"'}
      </p>

      <p className={`${subTextSize}`}>
        {lang === "en"
          ? "Please follow venue staff guidance for parking."
          : "กรุณาจอดรถตามคำแนะนำของเจ้าหน้าที่สถานที่"}
      </p>
    </div>
  );
}
