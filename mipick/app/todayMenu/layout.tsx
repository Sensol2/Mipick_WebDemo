"use client";

import React, { Suspense } from "react";
import styled from "styled-components";
import { Page, Sheet } from "./components/ui";

interface TodayMenuLayoutProps {
  children: React.ReactNode;
}

export default function TodayMenuLayout({ children }: TodayMenuLayoutProps) {
  return (
    <Suspense fallback={
      <Page>
        <Sheet>
          <LoadingContainer>
            로딩 중...
          </LoadingContainer>
        </Sheet>
      </Page>
    }>
      <Page>
        <Sheet>
          {children}
        </Sheet>
      </Page>
    </Suspense>
  );
}

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;