import type { Metadata } from "next";
import { ReactNode } from "react";

const OG_IMAGE = "https://eve-nun.vercel.app/images/og_image.jpg";

export const metadata: Metadata = {
  title: "EVE&NUN Wedding Invitation",
  description: "Saturday, December 19, 2026 at Vivace Bangpu.",
  openGraph: {
    title: "EVE&NUN Wedding Invitation",
    description: "Saturday, December 19, 2026 at Vivace Bangpu.",
    url: "https://eve-nun.vercel.app/th",
    siteName: "EVE&NUN Wedding Invitation",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "EVE&NUN wedding photo",
        type: "image/jpeg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EVE&NUN Wedding Invitation",
    description: "Saturday, December 19, 2026 at Vivace Bangpu.",
    images: [OG_IMAGE],
  },
};

export default function ThLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
