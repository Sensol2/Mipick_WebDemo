"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"
import { Card } from "@/app/components/ui/Card"
import { Clock, MapPin, ShieldCheck, Package } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
`

const Item = styled(Card)`
  display: grid; gap: 8px; align-content: start;
  svg { width: 24px; height: 24px; color: ${({ theme }) => theme.colors.primary}; }
  h3 { font-size: 18px; }
`

export default function Features(){
  return (
    <Wrap id="features">
      <Container>
        <Grid>
          <Item>
            <Clock />
            <h3>전날 주문</h3>
            <p>바쁜 점심 피크를 피해 전날 미리 예약.</p>
          </Item>
          <Item>
            <MapPin />
            <h3>픽업 스테이션</h3>
            <p>가까운 스테이션에서 줄 없이 바로 수령.</p>
          </Item>
          <Item>
            <Package />
            <h3>신선 포장</h3>
            <p>온도 체크·맞춤 용기로 품질 유지.</p>
          </Item>
          <Item>
            <ShieldCheck />
            <h3>안전 결제</h3>
            <p>암호화 결제와 이중 확인으로 안심.</p>
          </Item>
        </Grid>
      </Container>
    </Wrap>
  )
}