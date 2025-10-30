"use client";

import InAppBrowserDetector from "@/lib/utils/InAppBrowserDetector";
import { StyleProvider } from "@/lib/providers";

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
        <StyleProvider>
          <InAppBrowserDetector />
          {children}
        </StyleProvider>
      </body>
    </html>
  );
}
