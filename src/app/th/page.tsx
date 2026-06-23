"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import FlowerBackground from "../components/flower-background";
import EnvelopeOverlay from "../components/envelope-overlay";

import CoverSection from "../components/sections/cover-section";
import InvitationSection from "../components/sections/invitation-section";
import WeddingInfoSection from "../components/sections/wedding-info-section";
import GallerySection from "../components/sections/gallery-section";
import BehindSceneSection from "../components/sections/behind-scene-section";
import AccountSection from "../components/sections/account-section";
import LocationSection from "../components/sections/location-section";
import RSVPSection from "../components/sections/rspv-section";
import { useAudio } from "../hooks/useAudio";

import {
  Heart,
  Mail,
  Calendar,
  Image as ImageIcon,
  Gift,
  MapPin,
  Music4,
  VolumeOff,
  ClipboardList,
} from "lucide-react";
import BottomNav from "../components/bottom-nav";
import LoadingScreen from "../components/loading-screen";
import RsvpModal from "../components/rsvp-modal";
import { useInvitationReady } from "../hooks/useInvitationReady";
import { useRsvpModalPrompt } from "../hooks/useRsvpModalPrompt";

/* ---------- nav items ---------- */
const navItems = [
  { icon: Heart, label: "หน้าแรก" },
  { icon: Mail, label: "คำเชิญ" },
  { icon: Calendar, label: "กำหนดการ" },
  { icon: ImageIcon, label: "แกลเลอรี่" },
  { icon: Gift, label: "ของขวัญ" },
  { icon: MapPin, label: "สถานที่" },
  { icon: ClipboardList, label: "RSVP" },
];

// Maps nav index → sectionRefs index (Behind section is ref[4] but not in nav)
const navScrollTargets = [0, 1, 2, 3, 5, 6, 7];
// Maps sectionRefs index → nav index (-1 = not in nav)
const sectionToNavIndex = [0, 1, 2, 3, -1, 4, 5, 6];

type VenueMode = "KOREA" | "THAILAND";

function GiftSection() {
  return (
    <div className="space-y-4">
      <AccountSection lang="th" />
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-lg shadow-sm">
        <Image
          src="/images/hori_1.JPG"
          alt="wedding gallery horizontal"
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes="(max-width: 420px) 100vw, 420px"
        />
      </div>
    </div>
  );
}

/* ---------- main component ---------- */
export default function WeddingInvitation() {
  const { isReady, progress } = useInvitationReady();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const { isMuted, toggleMute } = useAudio(
    "/songs/Forever-and-Ever-and-Always.mp3",
    envelopeOpened,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState<VenueMode>("THAILAND");

  const visibleNavItems = navItems;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null), // 0 Cover
    useRef<HTMLDivElement>(null), // 1 Invitation
    useRef<HTMLDivElement>(null), // 2 WeddingInfo
    useRef<HTMLDivElement>(null), // 3 Gallery
    useRef<HTMLDivElement>(null), // 4 BehindScene
    useRef<HTMLDivElement>(null), // 5 Gift
    useRef<HTMLDivElement>(null), // 6 Location
    useRef<HTMLDivElement>(null), // 7 RSVP
  ];

  const rsvpModal = useRsvpModalPrompt({
    containerRef,
    enabled: envelopeOpened,
    lang: "th",
    triggerRef: sectionRefs[3], // Gallery section
  });

  /* ---------- scroll to section ---------- */
  const handleScrollTo = (navIndex: number) => {
    const sectionIndex = navScrollTargets[navIndex] ?? navIndex;
    sectionRefs[sectionIndex].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ---------- detect active section ---------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const offsets = sectionRefs.map((ref) => {
        if (!ref.current) return Number.POSITIVE_INFINITY;
        return Math.abs(ref.current.getBoundingClientRect().top);
      });
      const nearestSection = offsets.indexOf(Math.min(...offsets));
      const navIdx = sectionToNavIndex[nearestSection];
      if (navIdx >= 0) setActiveIndex(navIdx);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LoadingScreen lang="th" progress={progress} isReady={isReady} />
      <EnvelopeOverlay
        lang="th"
        isVisible={isReady && !envelopeOpened}
        onOpen={() => setEnvelopeOpened(true)}
      />
      <RsvpModal
        lang="th"
        isOpen={rsvpModal.isOpen}
        doNotShowToday={rsvpModal.doNotShowToday}
        onDoNotShowTodayChange={rsvpModal.setDoNotShowToday}
        onClose={rsvpModal.closeModal}
      />
      <FlowerBackground />

      <div className="w-full h-screen flex justify-center bg-[#e8ddd2]">
        <div
          ref={containerRef}
          className="wedding-page relative w-full max-w-[420px] h-screen overflow-y-auto scrollbar-hide text-[#4f4038] text-center leading-relaxed"
        >
          {/* Cover */}
          <div ref={sectionRefs[0]} className="min-h-screen">
            <CoverSection />
          </div>

          <div className="px-4 pt-4 pb-32 space-y-10">
            <div ref={sectionRefs[1]}>
              <InvitationSection lang="th" />
            </div>

            <div ref={sectionRefs[2]}>
              <WeddingInfoSection
                lang="th"
                selectedVenue={selectedVenue}
                onSelectVenue={setSelectedVenue}
              />
            </div>

            <div ref={sectionRefs[3]}>
              <GallerySection lang="th" />
            </div>

            <div ref={sectionRefs[4]}>
              <BehindSceneSection lang="th" />
            </div>

            <div ref={sectionRefs[5]}>
              <GiftSection />
            </div>

            <div ref={sectionRefs[6]}>
              <LocationSection
                lang="th"
                selectedVenue={selectedVenue}
                onSelectVenue={setSelectedVenue}
              />
            </div>

            {/* RSVP — always at the bottom */}
            <div ref={sectionRefs[7]}>
              <RSVPSection lang="th" />
            </div>

            <footer className="typo-crayon-font pb-2 text-center text-[12px] text-gray-400">
              © Copyright Mochung Lab 2026. All rights reserved.
            </footer>
          </div>

          {/* music button */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/60 border border-white/30 shadow-md text-sm hover:bg-white transition"
            >
              {!isMuted ? <Music4 size={16} /> : <VolumeOff size={16} />}
            </button>
          </div>

          <BottomNav
            navItems={visibleNavItems}
            activeIndex={activeIndex}
            onClick={handleScrollTo}
          />
        </div>
      </div>
    </>
  );
}
