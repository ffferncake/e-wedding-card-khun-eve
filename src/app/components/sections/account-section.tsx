"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

type Account = {
  bank: string;
  bankIcon: string;
  number: string;
  name: string;
};

export default function AccountSection({
  lang = "en",
}: {
  lang?: "en" | "th";
}) {
  const accounts: Account[] = [
    {
      bank: lang === "en" ? "SCB" : "ไทยพาณิชย์ (SCB)",
      bankIcon: "/images/scb_logo.jpeg",
      number: "163-221986-9",
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

  const fontClass = "typo-crayon-font";
  const titleSize = "text-[16px]";
  const highlightSize = "text-[18px]";
  const subTextSize = "text-[14px]";

  return (
    <div id="accountnumber" className="section">
      <p className={`title-en ${fontClass} ${titleSize}`}>ACCOUNT</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "en" ? "Wedding Gift" : "ช่องทางแสดงความยินดี"}
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

      <div className="mt-4 flex flex-col gap-4">
        {accounts.map((acc, i) => (
          <div key={i} className={fontClass}>
            <p className="mb-2 text-center text-[14px] font-semibold text-[#4f4038]">
              {acc.name}
            </p>

            <div className="flex w-full items-center gap-2 rounded-lg border border-[#caa98e] bg-[#f4e9dc]/80 px-3 py-3 text-left shadow-[0_8px_20px_rgba(90,53,39,0.08)]">
              <div className="flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={acc.bankIcon}
                  alt={acc.bank}
                  width={42}
                  height={42}
                  className="h-[38px] w-[38px] rounded-md object-cover"
                />
              </div>

              <p className="min-w-0 flex-1 whitespace-nowrap text-[11px] font-semibold text-[#4f4038] sm:text-[12px]">
                <span>{acc.bank}</span>{" "}
                <span className="font-bold text-[#5a3527]">{acc.number}</span>
              </p>

              <button
                type="button"
                onClick={() => copyAccount(acc.number)}
                title={lang === "en" ? "Copy account number" : "คัดลอกเลขบัญชี"}
                aria-label={lang === "en" ? "Copy account number" : "คัดลอกเลขบัญชี"}
                className="flex h-9 flex-shrink-0 items-center justify-center gap-1 rounded-md border border-[#caa98e] bg-[#fffaf5] px-2 text-[11px] font-semibold text-[#7a4f35] transition hover:bg-[#ead8c7]"
              >
                {lang === "en" ? "Copy" : "คัดลอก"}
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
