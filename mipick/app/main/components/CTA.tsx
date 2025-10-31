"use client";

import styled from "styled-components";
import { Theme } from "../styles/theme";
import { getCurrentSectionIndex, PageScrollDown, PageScrollUp, scrollToIndex } from "./scroll";
import { useEffect, useState } from "react";

export default function CTA() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CTA_CONFIG = [
    {
      id: "intro",
      content: "내일 학교에서 먹어보기",
      onClick: () => {
        PageScrollDown();
        setCurrentIndex(1);
      },
    },
    {
      id: "order",
      content: "주문하기",
      onClick: () => {
        PageScrollDown();
        setCurrentIndex(2);
      },
    },
    {
      id: "payment",
      content: "결제하기",
      onClick: () => {
        scrollToIndex(0);
        setCurrentIndex(0);
      },
    },
  ];

  const current = CTA_CONFIG[currentIndex];

  return (
    <>
      <CTAWrapper>
        <CTAButton onClick={current.onClick}>{current.content}</CTAButton>
      </CTAWrapper>
    </>
  );
}

export const CTASpacer = styled.div<{ theme: Theme }>`
  flex-shrink: 0; /* 높이 줄어드는 것 방지 */
  height: 15vh;
  width: 100%;
`;

export const CTAButton = styled.button<{ theme: Theme }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.cta};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.lg};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98); /* 눌렀을 때 살짝 눌리는 효과 */
  }
`;

export const CTAWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  position: fixed;

  bottom: 10px; /* 하단에서 10px 위 */

  /* 가운데 정렬 */
  left: 50%;
  transform: translateX(-50%);

  /* Sheet 최대 폭에 맞추기 */
  width: 100%;
  max-width: 460px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  z-index: 1000; /* 다른 요소들 위에 표시 */
`;
