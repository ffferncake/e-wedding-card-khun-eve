import type { Metadata } from "next";
import { ReactNode } from "react";

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
        url: "https://eve-nun.vercel.app/images/bg_updated_1.JPG",
        width: 800,
        height: 600,
        alt: "EVE&NUN wedding photo",
      },
    ],
    type: "website",
  },
};

export default function ThLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
