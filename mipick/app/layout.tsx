"use client"

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/app/styles/GlobalStyle";
import { theme } from "@/app/styles/theme";
import InAppBrowserDetector from "@/lib/utils/InAppBrowserDetector";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>MiPick – 미리 주문하면, 맛집이 학교 앞으로</title>
        <meta name="description" content="대학가/오피스 근처 테마 박스 사전 주문·픽업 서비스" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <InAppBrowserDetector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
