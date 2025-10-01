"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"
import { Card } from "@/app/components/ui/Card"
import { ShoppingBasket, CreditCard, Store } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px; counter-reset: step;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
`

const Step = styled(Card)`
  position: relative; padding-top: 28px;
  &::before {
    counter-increment: step; content: counter(step);
    position: absolute; top: 12px; left: 12px; font-weight: 800; color: ${({ theme }) => theme.colors.primary};
  }
  display: grid; gap: 8px;
  svg { width: 24px; height: 24px; color: ${({ theme }) => theme.colors.primary}; }
`

export default function HowItWorks(){
  return (
    <Wrap>
      <Container>
        <h2 style={{ marginBottom: 12 }}>이용 방법</h2>
        <Grid>
          <Step>
            <ShoppingBasket />
            <h3>메뉴 고르기</h3>
            <p>매일 바뀌는 테마 박스 중 취향대로 선택.</p>
          </Step>
          <Step>
            <CreditCard />
            <h3>결제하기</h3>
            <p>간편 결제로 다음날 픽업 예약 완료.</p>
          </Step>
          <Step>
            <Store />
            <h3>스테이션 픽업</h3>
            <p>예약 시간에 줄 없이 바로 픽업.</p>
          </Step>
        </Grid>
      </Container>
    </Wrap>
  )
}