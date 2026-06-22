"use client";

type Props = {
  lang: "en" | "th";
};

export default function BusSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";

  const busNumberSize = "text-[13px]";
  const busLabelSize = "text-[11px]";

  return (
    <div id="location-bus" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>BUS</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "By Bus" : "การเดินทางด้วยรถบัส"}
      </h3>

      <div className="mt-[10px] flex flex-col gap-[15px]">
        {/* Mullae Station */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "en"
              ? "○ Get off at Mullae Station"
              : "○ ลงที่ป้าย Mullae Station"}
          </p>

          <div className="flex flex-wrap gap-2 mt-[6px]">
            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}>
                {lang === "en" ? "Branch bus" : "รถบัสสายรอง"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>
                6211, 6625
              </span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#3b56c4]`}>
                {lang === "en" ? "Main bus" : "รถบัสสายหลัก"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>641</span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}>
                {lang === "en" ? "Local bus" : "รถบัสชุมชน"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>
                {lang === "en" ? "Yeongdeungpo 12" : "Yeongdeungpo 12"}
              </span>
            </div>
          </div>
        </div>

        {/* Community center */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "en"
              ? "○ Get off at Mullae Community Center / Yeongil Market / LOTS"
              : "○ ลงป้าย Mullae Community Center / ตลาด Yeongil / LOTS"}
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span
              className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}
            >
              {lang === "en" ? "Local bus" : "รถบัสชุมชน"}
            </span>
            <span className={`${busNumberSize} text-[#333]`}>
              {lang === "en" ? "Yeongdeungpo 05" : "Yeongdeungpo 05"}
            </span>
          </div>
        </div>

        {/* Apartment stop */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "en"
              ? "○ Get off at Byuksan Megatrium APT"
              : "○ ลงป้าย Byuksan Megatrium APT"}
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span
              className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}
            >
              {lang === "en" ? "Branch bus" : "รถบัสสายรอง"}
            </span>
            <span className={`${busNumberSize} text-[#333]`}>6516</span>
          </div>
        </div>
      </div>
    </div>
  );
}
