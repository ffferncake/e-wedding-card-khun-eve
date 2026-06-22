import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://eve-nun.vercel.app"),

  title: "EVE&NUN Wedding Invitation",
  description: "Saturday, December 19, 2026 at Vivace Bangpu.",

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  openGraph: {
    title: "EVE&NUN Wedding Invitation",
    description: "Saturday, December 19, 2026 at Vivace Bangpu.",
    url: "https://eve-nun.vercel.app/",
    siteName: "EVE&NUN Wedding Invitation",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "EVE&NUN Wedding Photo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EVE&NUN Wedding Invitation",
    description: "Saturday, December 19, 2026 at Vivace Bangpu.",
    images: ["/images/og_image.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="typo-crayon-font" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}