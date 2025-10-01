"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"

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
            <summary>픽업 가능 시간은 언제인가요?</summary>
            <p>대부분의 스테이션은 11:30–13:30 사이 픽업이 가능합니다. 스테이션별로 상이할 수 있어 앱에서 안내합니다.</p>
          </Item>
          <Item>
            <summary>당일 주문도 가능한가요?</summary>
            <p>기본은 전날 주문이며, 재고가 있는 경우 한정 수량 당일 주문을 제공할 수 있습니다.</p>
          </Item>
          <Item>
            <summary>환불은 어떻게 진행되나요?</summary>
            <p>픽업 전 취소는 전액 환불됩니다. 품질 이슈는 사진 첨부 후 고객센터 검토를 거쳐 보상합니다.</p>
          </Item>
        </div>
      </Container>
    </Wrap>
  )
}