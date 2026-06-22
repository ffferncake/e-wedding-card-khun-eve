"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

type Account = {
  bank: string;
  bankIcon: string;
  number: string;
  role: string;
  name?: string;
};

export default function AccountSection({
  lang = "en",
}: {
  lang?: "en" | "th";
}) {
  const accounts: Account[] = [
    {
      bank: lang === "en" ? "SCB" : "ไทยพาณิชย์ (SCB)",
      bankIcon: "/images/scb_logo.svg",
      number: "163-221986-9",
      role: lang === "en" ? "👰🏻‍♀️ Bride" : "👰🏻‍♀️ เจ้าสาว",
      name: lang === "en" ? "Anchalee Prabmalai" : "อัญชลี ปราบมะไลย",
    },
  ];

  const copyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    alert(
      lang === "en"
        ? "Account number copied."
        : "คัดลอกเลขบัญชีเรียบร้อยแล้ว 💌",
    );
  };

  const isTH = lang === "th";

  const fontClass = "typo-crayon-font";
  const sectionSize = "text-[13px]";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";

  return (
    <div id="accountnumber" className="section">
      <p className={`title-en ${fontClass} ${titleSize}`}>ACCOUNT</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Gift Details" : "ร่วมแสดงความยินดี"}
      </h3>

      <p className={`text-center ${fontClass} ${subTextSize}`}>
        {lang === "en" ? (
          <>
            Thank you for your warm wishes
            <br />
            and generous support.
          </>
        ) : (
          <>
            ขอบพระคุณสำหรับคำอวยพร
            <br />
            และความยินดีจากทุกท่าน
          </>
        )}
      </p>

      <div className="flex flex-col gap-4 mt-3">
        {accounts.map((acc, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <span
              className={`${subTextSize} font-semibold mb-1 text-[#555] ${fontClass}`}
            >
              {acc.role}
              {acc.name && <span> · {acc.name}</span>}
            </span>

            <div className="flex items-center justify-between gap-3 w-full bg-[#f7efe6] rounded-lg border border-[#d9bfa8] shadow-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src={acc.bankIcon}
                  alt={acc.bank}
                  width={28}
                  height={28}
                  className="rounded"
                />

                <span
                  className={`${subTextSize} font-medium text-[#333] ${fontClass}`}
                >
                  {acc.number}
                </span>
              </div>

              <button
                onClick={() => copyAccount(acc.number)}
                className={`flex items-center gap-1 bg-white border border-[#d9bfa8] px-3 py-1.5 text-xs rounded-md hover:bg-[#f2e4d5] transition text-[#7a4f35] ${fontClass}`}
              >
                {lang === "en" ? "Copy" : "คัดลอก"}
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
