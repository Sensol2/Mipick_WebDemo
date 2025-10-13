"use client"

import styled from "styled-components"
import Container from "./ui/Container"
import { Card } from "./ui/Card"

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
            <h3>4.5 / 5.0</h3>
            <p>초기 테스터 만족도</p>
          </Stat>
          <Stat>
            <h3>500+</h3>
            <p>누적 배달 건수</p>
          </Stat>
          <Stat>
            <h3>30+</h3>
            <p>제휴 음식점 수</p>
          </Stat>
        </Grid>
      </Container>
    </Wrap>
  )
}