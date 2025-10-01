"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"
import { Card } from "@/app/components/ui/Card"
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

const Row = styled(Card)`
  display: grid; grid-template-columns: 24px 1fr; gap: 10px; align-items: center;
  h4 { margin: 0; font-size: 16px; }
  small { color: ${({ theme }) => theme.colors.textSecondary}; }
`

const stations = [
  { name: "숭실대 7호관 앞 스테이션", addr: "서울 동작구 상도로 369", eta: "도보 2분" },
  { name: "강남 테헤란로 위워크", addr: "서울 강남구 테헤란로 142", eta: "도보 4분" },
  { name: "서강대 후문 카페", addr: "서울 마포구 백범로 35", eta: "도보 3분" },
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
              <Row key={s.name}>
                <MapPin style={{ width: 20, height: 20, color: "#FF6B35" }} />
                <div>
                  <h4>{s.name}</h4>
                  <small>{s.addr} · {s.eta}</small>
                </div>
              </Row>
            ))}
          </List>
        </Grid>
      </Container>
    </Wrap>
  )
}