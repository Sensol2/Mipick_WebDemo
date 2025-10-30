"use client"

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/app/styles/GlobalStyle";
import { theme } from "@/app/styles/theme";
import InAppBrowserDetector from "@/lib/utils/InAppBrowserDetector";
import StyledComponentsProvider from "@/lib/providers/StyledComponentsProvider";

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
        <StyledComponentsProvider>
          {/* <ThemeProvider theme={theme}>
            <GlobalStyle /> */}
            <InAppBrowserDetector />
            {children}
          {/* </ThemeProvider> */}
        </StyledComponentsProvider>
      </body>
    </html>
  );
}
