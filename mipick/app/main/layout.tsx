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
          <Sheet>
            <Grid>
              {children}
            </Grid>
          </Sheet>
        </Page>
      </ThemeProvider>
    </>
  );
}

export const Page = styled.div<{ theme: Theme }>`
  min-height: 100vh;
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
  min-height: 100vh;
  
  // 배치 관련
  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;

export const Grid = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  flex: 1;                      /* 남는 높이를 채우게 */
  margin: ${({ theme }) => theme.spacing.lg};
`;