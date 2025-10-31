"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronUp } from "lucide-react";
import { PageScrollUp, getCurrentSectionIndex } from "./scroll";
import type { Theme } from "../styles/theme";

export default function ScrollUpArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let startY = 0;
    let hideTimer: number | null = null;

    const show = () => {
      // Do not show on first page (intro)
      const idx = getCurrentSectionIndex();
      if (idx <= 0) return;

      setVisible(true);
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setVisible(false), 800);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) show(); // 위로 스크롤
    };

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientY - startY;
      if (diff > 40) show(); // 위로 스와이프
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <Wrapper data-visible={visible} onClick={PageScrollUp}>
      <ChevronUp size={28} />
    </Wrapper>
  );
}

const Wrapper = styled.button<{ theme: Theme }>`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  border: none;
  background: none; /* ✅ 완전 투명 배경 */
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;

  &[data-visible="true"] {
    opacity: 1;
  }
`;
