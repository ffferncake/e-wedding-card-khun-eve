"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  lang: "en" | "th";
};

const groomImages = ["/images/groom.JPG"] as const;
const brideImages = ["/images/bride.JPG"] as const;
const profilePhotoSize = "h-[260px] w-[172px]";

const couple = {
  groom: {
    nickname: { en: "NUN", th: "นัน" },
    fullName: {
      en: "Wongsakorn Prasartsri",
      th: "นายวงศกร ปราสาทศรี",
    },
  },
  bride: {
    nickname: { en: "EVE", th: "อีฟ" },
    fullName: {
      en: "Anchalee Prabmalai",
      th: "นางสาวอัญชลี ปราบมะไลย",
    },
  },
} as const;

export default function InvitationSection({ lang }: Props) {
  const isTH = lang === "th";
  const [groomImageIndex, setGroomImageIndex] = useState(0);
  const [brideImageIndex, setBrideImageIndex] = useState(0);

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const contentSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";
  const groomImage = groomImages[groomImageIndex];
  const brideImage = brideImages[brideImageIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGroomImageIndex((currentIndex) =>
        currentIndex === groomImages.length - 1 ? 0 : currentIndex + 1,
      );
      setBrideImageIndex((currentIndex) =>
        currentIndex === brideImages.length - 1 ? 0 : currentIndex + 1,
      );
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      id="message"
      className={`section text-center ${fontClass} ${sectionSize}`}
    >
      <p className={`title-en ${fontClass} ${titleSize}`}>INVITATION</p>

      <p className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en"
          ? "We invite you to celebrate with us."
          : "ขอเรียนเชิญทุกท่านมาร่วมเป็นเกียรติ"}
      </p>

      {lang === "en" ? (
        <>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>After finding each other,</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            our days have become brighter and full of laughter.
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            We are beginning our forever together.
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>On this joyful day,</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>we would love to share</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            our happiest moment with you.
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            Please join us with your warm blessings
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            as we celebrate our wedding 🌷
          </p>
        </>
      ) : (
        <>
          <p></p>
          <p></p>
          <p></p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>ในวันสำคัญนี้</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            เราขอเชิญทุกท่าน
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            มาร่วมแบ่งปันช่วงเวลาแห่งความสุขกับเรา
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            ด้วยความยินดีจากใจ
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            ขอให้ทุกท่านร่วมอวยพรให้กับเรา 🌷
          </p>
        </>
      )}

      {/* Parents */}
      <div
        className={`mt-6 text-center ${contentSize} leading-[1.8] text-[#333] flex flex-row items-start justify-center`}
      >
       
      </div>
      {/* Groom and bride */}
      <div className="flex flex-row items-start justify-center gap-3">
        {/* Groom */}
        <div className="flex flex-col items-center text-center">
          <div className={`profile-photo-frame ${profilePhotoSize}`}>
            <div key={groomImage} className="profile-photo-flip">
              <Image
                src={groomImage}
                alt="groom img"
                fill
                priority
                quality={75}
                sizes="112px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className={`font-bold ${contentSize}`}>
              {isTH ? couple.groom.nickname.th : couple.groom.nickname.en}
            </p>

            <a
              href="tel:+66855615256"
              aria-label="Call groom"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className={`${subTextSize} mt-[2px] leading-snug text-[#555]`}>
            {isTH ? couple.groom.fullName.th : couple.groom.fullName.en}
          </p>
        </div>

        {/* Bride */}
        <div className="flex flex-col items-center text-center">
          <div className={`profile-photo-frame ${profilePhotoSize}`}>
            <div key={brideImage} className="profile-photo-flip">
              <Image
                src={brideImage}
                alt="my img"
                fill
                priority
                quality={75}
                sizes="112px"
                className="object-cover object-[center_35%]"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className={`font-bold ${contentSize}`}>
              {isTH ? couple.bride.nickname.th : couple.bride.nickname.en}
            </p>

            <a
              href="tel:+66809399698"
              aria-label="Call bride"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className={`${subTextSize} mt-[2px] leading-snug text-[#555]`}>
            {isTH ? couple.bride.fullName.th : couple.bride.fullName.en}
          </p>

        </div>
      </div>
    </div>
  );
}
