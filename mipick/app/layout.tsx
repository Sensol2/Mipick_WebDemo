"use client";

import InAppBrowserDetector from "@/lib/utils/InAppBrowserDetector";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>미픽</title>
        <meta name="description" content="맛집이 학교 안으로" />
      </head>
      <body>
        <InAppBrowserDetector />
        {children}
      </body>
    </html>
  );
}
