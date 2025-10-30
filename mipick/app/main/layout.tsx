"use client";

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { LocalStyle } from "./styles/LocalStyle";
import { Theme, theme } from "./styles/theme";

export default function MainMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalStyle />
        <Page>
          <Sheet>{children}</Sheet>
        </Page>
      </ThemeProvider>
    </>
  );
}

export const Page = styled.div`
  min-height: 100vh;
  background: #6c6c6c;

  //내부에 있는 Sheet를 화면 정중앙에 배치.
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Sheet = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid #fed7aa;

  // 해상도 관련
  max-width: 520px;
  width: 100%;
  min-height: 100vh;

  // 배치 관련
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;
