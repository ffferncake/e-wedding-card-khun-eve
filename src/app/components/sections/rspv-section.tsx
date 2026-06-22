"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type Props = {
  lang: "en" | "th";
  compact?: boolean;
};

export default function RSVPSection({ lang, compact = false }: Props) {
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [guestSide, setGuestSide] = useState<"bride" | "groom" | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const isTH = lang === "th";

  const handleSend = async () => {
    if (!attend) {
      alert(isTH ? "กรุณาเลือกว่าจะเข้าร่วมหรือไม่" : "Please select whether you will attend");
      return;
    }

    if (!name.trim()) {
      alert(isTH ? "กรุณากรอกชื่อ" : "Please enter your name");
      return;
    }

    if (!guestSide) {
      alert(isTH ? "กรุณาเลือกฝั่งเจ้าสาวหรือเจ้าบ่าว" : "Please select bride or groom side");
      return;
    }

    setLoading(true);

    const attendText =
      attend === "yes"
        ? isTH
          ? "เข้าร่วม"
          : "Attend"
        : isTH
          ? "ไม่เข้าร่วม"
          : "Unable to attend";

    const sideText = guestSide === "bride" ? "Bride side" : "Groom side";

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwolzLhX4smX6x8WO7ynPfa6zL094nS9QObkVHR4GPNzoDsUABOBA71OAShSXEAWk8lAA/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams({
            name: name.trim(),
            attend: attendText,
            side: sideText,
          }),
        },
      );

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setName("");
        setAttend(null);
        setGuestSide(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert(isTH ? "ส่งไม่สำเร็จ 😢" : "Failed to send 😢");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="section py-8 text-center">
        <div className="text-[48px] mb-3">💌</div>
        <p className="text-[18px] font-semibold text-[#5a3527]">
          {isTH ? "ขอบคุณมากค่ะ!" : "Thank you!"}
        </p>
        <p className="mt-1 text-[13px] text-[#8a6a5a]">
          {isTH ? "เราได้รับข้อมูลของคุณแล้ว" : "We received your response."}
        </p>
      </div>
    );
  }

  const StepLabel = ({ num, label }: { num: string; label: string }) => (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white flex-shrink-0"
        style={{ background: "#7a4f35" }}
      >
        {num}
      </span>
      <span className="text-[13px] font-semibold text-[#5a3527] tracking-wide">
        {label}
      </span>
    </div>
  );

  const Chip = ({
    active,
    onClick,
    disabled,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-2xl border px-4 py-2.5 text-[13px] transition-all duration-200 ${
        active
          ? "border-[#7a4f35] bg-[#7a4f35] text-white shadow-md"
          : "border-[#d9bfa8] bg-white text-[#7a4f35] hover:border-[#c8a27b] hover:bg-[#f7efe6]"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="section">
      <p className="title-en text-[15px] text-center">R.S.V.P.</p>
      <h3 className="highlight text-[18px] text-center mb-6">
        {isTH ? "ยืนยันการเข้าร่วม" : "Confirm Attendance"}
      </h3>

      <div className="flex flex-col gap-6 px-2">
        <div>
          <StepLabel num="1" label={isTH ? "จะเข้าร่วมงานไหม?" : "Will you attend?"} />
          <div className="flex gap-2 pl-8">
            <Chip active={attend === "yes"} onClick={() => setAttend("yes")} disabled={loading}>
              🙌🏼 {isTH ? "เข้าร่วม" : "Attend"}
            </Chip>
            <Chip active={attend === "no"} onClick={() => setAttend("no")} disabled={loading}>
              🙏 {isTH ? "ไม่เข้าร่วม" : "Unable"}
            </Chip>
          </div>
        </div>

        <div>
          <StepLabel num="2" label={isTH ? "ฝั่งเจ้าสาวหรือเจ้าบ่าว?" : "Bride or Groom side?"} />
          <div className="flex gap-2 pl-8">
            <Chip active={guestSide === "bride"} onClick={() => setGuestSide("bride")} disabled={loading}>
              👰 {isTH ? "เจ้าสาว" : "Bride"}
            </Chip>
            <Chip active={guestSide === "groom"} onClick={() => setGuestSide("groom")} disabled={loading}>
              🤵 {isTH ? "เจ้าบ่าว" : "Groom"}
            </Chip>
          </div>
        </div>

        <div>
          <StepLabel num="3" label={isTH ? "ชื่อของคุณ" : "Your name"} />
          <div className="pl-8">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-[#d9bfa8] bg-white px-4 py-3 text-[13px] text-[#3d2d24] outline-none placeholder-[#c8a27b]/70 focus:border-[#7a4f35] focus:ring-2 focus:ring-[#7a4f35]/15 transition"
              placeholder={isTH ? "กรุณากรอกชื่อ" : "Enter your name"}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{
                background: "#7a4f35",
                boxShadow: "0 4px 14px rgba(122,79,53,0.25)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isTH ? "กำลังส่ง..." : "Sending..."}
                </>
              ) : (
                <>
                  {isTH ? "ส่งข้อมูล" : "Send"}
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}