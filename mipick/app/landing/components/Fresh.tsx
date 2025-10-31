"use client";

import styled from "styled-components";
import Container from "./ui/Container";
import { Card } from "./ui/Card";

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const Poster = styled.div`
  height: 260px;
  border-radius: 12px;
  border: 1px dashed rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #fff, #fff7ed);
  display: grid;
  place-items: center;
  color: rgba(0, 0, 0, 0.5);
`;

export default function Fresh() {
  return (
    <Wrap>
      <Container>
        <Grid>
          <Poster>온도 체크 & 포장 이미지 영역</Poster>
          <Card>
            <h3>일관된 품질, 꼼꼼한 체크</h3>
            <p>
              장거리 이동에도 맛과 식감을 유지하도록 온도 로깅과 보냉/보온 용기를 사용합니다.
              픽업까지 신선함을 책임집니다.
            </p>
          </Card>
        </Grid>
      </Container>
    </Wrap>
  );
}
