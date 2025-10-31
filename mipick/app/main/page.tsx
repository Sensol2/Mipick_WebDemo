"use client";

import IntroSection from "./intro/IntroSection";
import OrderSection from "./order/OrderSection";
import PaymentSection from "./payment/PaymentSection";
import styled from "styled-components";
import type { Theme } from "./styles/theme";
import CTA from "./components/CTA";
import ScrollUpArrow from "./components/ScrollUpArrow";

export default function Home() {
  return (
    <Container>
      <ScrollUpArrow />
      <Section id="intro">
        <IntroSection />
      </Section>
      <Section id="order">
        <OrderSection />
      </Section>
      <Section id="payment">
        <PaymentSection />
      </Section>
      <CTA />
    </Container>
  );
}

const Container = styled.div<{ theme: Theme }>`
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 섹션 간 스크롤 완전히 차단 */
  position: relative;
`;

const Section = styled.section<{ theme: Theme }>`
  width: 100%;
  height: 100vh; /* 각 섹션을 한 화면 단위로 고정 */
  overflow-y: auto; /* 섹션 내부 스크롤만 허용 */
  // scroll-snap-align: start; /* 스냅 제거 가능 (있어도 문제 없음) */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */

  /* 스크롤바 숨기기 (브라우저별 대응) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge 구버전 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;
