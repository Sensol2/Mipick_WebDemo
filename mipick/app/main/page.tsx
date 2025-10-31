"use client";

import IntroSection from "./intro/IntroSection";
import OrderSection from "./order/OrderSection";
import PaymentSection from "./payment/PaymentSection";
import styled from "styled-components";
import type { Theme } from "./styles/theme";

export default function Home() {
  return (
    <>
      <OrderSection />
    </>
  );
}

{/* <IntroSection />
<OrderSection />
<PaymentSection /> */}

const Section = styled.section<{ theme: Theme }>`
  /* 각 섹션을 한 화면 높이로 배치 (상하 여백 고려) */
  min-height: calc(100svh - 2 * ${({ theme }) => theme.spacing.lg});
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
`;
