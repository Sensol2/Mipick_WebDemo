"use client";

import styled from "styled-components";

/**
 * Landing Page 전용 Button 컴포넌트
 * todayMenu 등 다른 기능 페이지에서는 해당 페이지의 styled-components 사용
 */

type Variant = "primary" | "secondary";

export const Button = styled.button<{ variant?: Variant }>`
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: 25px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ theme, variant = "primary" }) =>
    variant === "primary"
      ? `background: #2B3A52; color: #fff; border: 2px solid #2B3A52;`
      : `background: transparent; color: ${theme.colors.textMain}; border: 2px solid #E5E5E5;`}

  &:hover {
    ${({ theme, variant = "primary" }) =>
      variant === "primary"
        ? `background: #1F2937; border-color: #1F2937; transform: translateY(-1px);`
        : `background: #F9F9F9; border-color: #D1D5DB;`}
  }
  &:active {
    transform: translateY(0);
  }
`;
