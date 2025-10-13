"use client"

import styled from "styled-components"
import Container from "./ui/Container"
import { Card } from "./ui/Card"
import { MapPin } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: 1fr 1fr; }
`

const MapMock = styled.div`
  height: 320px; border-radius: 12px; border: 1px dashed rgba(0,0,0,0.1);
  background: repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f4f4f4 10px, #f4f4f4 20px);
  display: grid; place-items: center; color: rgba(0,0,0,0.5);
`

const List = styled.div`
  display: grid; gap: 10px;
`

const Row = styled(Card)<{ disabled?: boolean }>`
  display: grid; grid-template-columns: 24px 1fr; gap: 10px; align-items: center;
  h4 { margin: 0; font-size: 16px; }
  small { color: ${({ theme }) => theme.colors.textSecondary}; }
  
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    background: #f8f8f8;
    border: 1px dashed #ddd;
    
    h4 {
      color: #999;
    }
    
    small {
      color: #bbb;
    }
  `}
`

const stations = [
  { name: "숭실대 픽업 스테이션", addr: "한경직 기념관", disabled: false },
  { name: "픽업 스테이션 준비중", addr: "미정", disabled: true },
  { name: "픽업 스테이션 준비중", addr: "미정", disabled: true },
]

export default function PickupStations(){
  return (
    <Wrap id="stations">
      <Container>
        <h2 style={{ marginBottom: 12 }}>픽업 스테이션</h2>
        <Grid>
          <MapMock>지도/캡처 이미지 영역</MapMock>
          <List>
            {stations.map((s) => (
              <Row key={s.name} disabled={s.disabled}>
                <MapPin style={{ 
                  width: 20, 
                  height: 20, 
                  color: s.disabled ? "#ccc" : "#FF6B35" 
                }} />
                <div>
                  <h4>{s.name}</h4>
                  <small>{s.addr}</small>
                </div>
              </Row>
            ))}
          </List>
        </Grid>
      </Container>
    </Wrap>
  )
}