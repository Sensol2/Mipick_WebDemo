"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"
import { Card } from "@/app/components/ui/Card"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
`

const Stat = styled(Card)`
  text-align: center;
  h3 { font-size: 28px; margin-bottom: 6px; }
`

export default function SocialProof(){
  return (
    <Wrap>
      <Container>
        <Grid>
          <Stat>
            <h3>92%</h3>
            <p>초기 테스터 만족도</p>
          </Stat>
          <Stat>
            <h3>₩3,000</h3>
            <p>픽업 지연 보상 정책</p>
          </Stat>
          <Stat>
            <h3>10+</h3>
            <p>학교·기업 파일럿 진행</p>
          </Stat>
        </Grid>
      </Container>
    </Wrap>
  )
}