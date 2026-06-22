import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "EVE&NUN 결혼합니다!",
  description:
    "2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요.",
  openGraph: {
    title: "EVE&NUN 결혼합니다!",
    description:
      "2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요.",
    url: "https://eve-nun.vercel.app/",
    siteName: "EVE&NUN 모바일 청첩장",
    images: [
      {
        url: "https://eve-nun.vercel.app/images/gallery/studio/1.JPG",
        width: 800,
        height: 600,
        alt: "EVE&NUN 웨딩 사진",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/images/icon/flowers.png" />
        <meta property="og:title" content="EVE&NUN 결혼합니다!" />
        <meta
          property="og:description"
          content="2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요."
        />
        <meta
          property="og:image"
          content="https://eve-nun.vercel.app/images/gallery/studio/1.JPG"
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
