"use client"

import styled from "styled-components"
import Container from "./ui/Container"
import { Card } from "./ui/Card"
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
        <h2 style={{ marginBottom: 12 }}>특징</h2>
        <Grid>
          <Item>
            <Clock />
            <h3>메뉴 큐레이션</h3>
            <p>날마다 엄선된 맛집에서 새로운 맛을 즐겨보세요</p>
          </Item>
          <Item>
            <MapPin />
            <h3>픽업 스테이션</h3>
            <p>학교 픽업장소에서 줄 없이 바로 수령하세요.</p>
          </Item>
          <Item>
            <Package />
            <h3>신선 포장</h3>
            <p>온도 체크·맞춤 용기로 최상의 품질을 유지합니다.</p>
          </Item>
          <Item>
            <ShieldCheck />
            <h3>배달 책임제</h3>
            <p>배달 중 문제 발생 시 전액 환불을 보장합니다.</p>
          </Item>
        </Grid>
      </Container>
    </Wrap>
  )
}