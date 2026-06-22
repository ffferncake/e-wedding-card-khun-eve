import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

const OG_IMAGE = "https://eve-nun.vercel.app/images/hori_1.JPG";

export const metadata: Metadata = {
  title: "EVE&NUN Wedding Invitation",
  description: "Saturday, December 19, 2026 at Vivace Bangpu.",
  openGraph: {
    title: "EVE&NUN Wedding Invitation",
    description: "Saturday, December 19, 2026 at Vivace Bangpu.",
    url: "https://eve-nun.vercel.app/",
    siteName: "EVE&NUN Wedding Invitation",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 800,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        {/* Extra tags for LINE compatibility */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
      </head>
      <body className="typo-crayon-font" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
