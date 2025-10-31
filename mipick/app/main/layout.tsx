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
            <Grid id="main-scroll">{children}</Grid>
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
  overflow: hidden; // 외부 스크롤 생성 방지
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
`;

export const Grid = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg} 0`};

  // 섹션 스크롤 스냅
  overflow-y: auto;
`;
