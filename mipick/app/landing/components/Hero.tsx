"use client";

import styled from "styled-components";
import Container from "./ui/Container";
import { Button } from "./ui/Button";

const Wrap = styled.section`
  padding: 80px 0 0px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 20px;
  line-height: 1.2;

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sub = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export default function Hero() {
  return (
    <Wrap>
      <Container>
        <ContentWrapper>
          <Title>
            미리 주문하면, <br /> <span className="highlight">맛집</span>이 학교 안으로
          </Title>
          <Sub>
            매일 달라지는 메뉴를 미리 고르고, 원하는 시간에 가까운 스테이션에서 간편하게 찾아가세요.
          </Sub>

          <ButtonGroup>
            <Button as="a" href="/todayMenu">
              오늘 메뉴 보러가기
            </Button>
            <Button as="a" href="/todayMenu/survey" variant="secondary">
              설문 참여하기
            </Button>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    </Wrap>
  );
}
