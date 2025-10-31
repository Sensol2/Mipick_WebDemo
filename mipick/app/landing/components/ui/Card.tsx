"use client";

import styled from "styled-components";

/**
 * Landing Page 전용 Card 컴포넌트
 * todayMenu 등 다른 기능 페이지에서는 해당 페이지의 styled-components 사용
 */

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 20px;
`;
