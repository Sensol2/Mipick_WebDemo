"use client";

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { LocalStyle } from "./styles/LocalStyle";
import { Theme, theme } from "./styles/theme";

export default function MainMobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalStyle />
        <Page>
          <Sheet>
            <Grid>{children}</Grid>
          </Sheet>
        </Page>
      </ThemeProvider>
    </>
  );
}

export const Page = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.pageBackground};

  //내부에 있는 Sheet를 화면 정중앙에 배치.
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Sheet = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.sheetBackground};

  // 해상도 관련
  max-width: 480px;
  width: 100%;
  height: 100svh;

  // 배치 관련
  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; // 외부 스크롤 생성 방지
`;

export const Grid = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: 64px;

  // 섹션 스크롤 스냅
  overflow-y: auto;
  max-height: 100svh;
  scroll-snap-type: y mandatory; // 살짝 걸리는 느낌
  scroll-padding-top: ${({ theme }) => theme.spacing.sm};
  scroll-padding-bottom: ${({ theme }) => theme.spacing.xl};
  scroll-behavior: smooth;

  /* 스크롤바 숨기기 (크로스 브라우징) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;
