import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "EVE&NUN Wedding Invitation",
  description:
    "Saturday, December 19, 2026 at Vivace Bangpu.",
  openGraph: {
    title: "EVE&NUN Wedding Invitation",
    description:
      "Saturday, December 19, 2026 at Vivace Bangpu.",
    url: "https://eve-nun.vercel.app/",
    siteName: "EVE&NUN Wedding Invitation",
    images: [
      {
        url: "https://eve-nun.vercel.app/images/og_image.jpg",
        width: 800,
        height: 600,
        alt: "EVE&NUN Wedding Photo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta property="og:title" content="EVE&NUN Wedding Invitation" />
        <meta
          property="og:description"
          content="Saturday, December 19, 2026 at Vivace Bangpu."
        />
        <meta
          property="og:image"
          content="https://eve-nun.vercel.app/images/og_image.jpg"
        />
        <meta property="og:url" content="https://eve-nun.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className="typo-crayon-font" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
