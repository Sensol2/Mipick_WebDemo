"use client"

import styled from "styled-components"
import Container from "./ui/Container"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Item = styled.details`
  background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06);
  padding: 16px 18px;
  summary { cursor: pointer; font-weight: 700; }
  p { margin-top: 8px; }
`

export default function FAQ(){
  return (
    <Wrap id="faq">
      <Container>
        <h2 style={{ marginBottom: 12 }}>FAQ</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <Item>
            <summary>주문 가능 시간은 언제인가요?</summary>
            <p>기본은 전날 주문이며, 거리에 따라 당일 오전 10:00 전까지 주문이 가능합니다.</p>
          </Item>
          <Item>
            <summary>픽업 가능 시간은 언제인가요?</summary>
            <p>11:30–13:30 사이 픽업이 가능합니다.</p>
          </Item>
          <Item>
            <summary>어디서 먹나요?</summary>
            <p>숭실대학교 카페(한경직 기념관)에 먹을 장소가 마련되어 있습니다.</p>
          </Item>
        </div>
      </Container>
    </Wrap>
  )
}