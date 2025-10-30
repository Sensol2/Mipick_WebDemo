"use client";

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { LocalStyle } from "./styles/LocalStyle";
import theme from "./styles/theme";

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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const Sheet = styled.div`
  background: #ebeae4;
  border: 1px solid #fed7aa;
  border-radius: 0;
  max-width: 420px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;
