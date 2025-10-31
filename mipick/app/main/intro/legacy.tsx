"use client";

import React from "react";
import styled from "styled-components";
import { MapPin, Clock } from "lucide-react";

const Page = styled.div`
  display: flex;
  min-height: 1440px;
  min-width: 810px;
  width: 100%;
  background: #ebeae4;
`;

const Frame = styled.div`
  flex: 1;
  height: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

/* 중앙 770px 컬럼(원본: margin-right 19px 기준) */
const Column = styled.div`
  width: 770px;
  height: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

/* ───────── Header area (원본 Div) ───────── */
const HeaderBar = styled.div`
  width: 100%;
  max-width: 810px;
  margin-bottom: 4px;
  padding: 20px 35px 0; /* 좌우 35px, 상단 여백으로 이미지와 동일하게 */
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBottomLine = styled.div`
  width: 100%;
  height: 1px;
  background: #595753; /* 상단 구분선 */
`;

const Subscribe = styled.div`
  color: #484642;
  font-family: "Inter-Medium", Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 21.6px;
`;

const HeaderDate = styled.div`
  white-space: nowrap;
  color: #55534f;
  font-family: "Inter-Medium", Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 21.2px;
`;

/* ───────── Title area ───────── */
const Strapline = styled.div`
  margin-bottom: 16px;

  color: #3d3a37;
  font-family: "Inter-SemiBold", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 43.9px;
`;

const TopDivider = styled.div`
  width: 100%;
  max-width: 741px;
  height: 1px;
  background: #868581;
  margin-bottom: 38px;
`;

const MainTitle = styled.div`
  margin-bottom: 16px;
  align-self: flex-start;
  padding-left: 20px;

  white-space: nowrap;

  color: #322f2c;
  font-family: "Inter-SemiBold", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 77.5px;
`;

/* ───────── Content area ───────── */
const ContentWrap = styled.div`
  width: 718px;
  height: 921px;
  margin-right: 27px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Hero = styled.img`
  width: 672px;
  height: 419px;
  object-fit: cover;
  margin-right: 24px;
  margin-bottom: 22px;
`;

const SectionTitle = styled.div`
  width: 273px;
  height: 37px;
  margin-right: 415px;
  margin-bottom: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #262625;
  font-family: "Inter-SemiBold", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 27.7px;
`;

const Body = styled.p`
  width: 660px;
  height: 115px;
  margin-right: 28px;
  margin-bottom: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #51514f;
  font-family: "Inter-Regular", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 19.5px;
  line-height: 27.7px;
`;

const EditorTitle = styled.div`
  width: 163px;
  height: 36px;
  margin-right: 525px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #252524;
  font-family: "Inter-SemiBold", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 27.7px;
`;

const EditorQuote = styled.div`
  width: 342px;
  height: 26px;
  margin-right: 346px;
  margin-bottom: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #4e4e4c;
  font-family: "Inter-Regular", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
`;

/* ───────── Info box (원본 Groups3) ───────── */
const InfoBox = styled.div`
  width: 655px;
  margin-right: 21px;
  margin-bottom: 7px;
  padding: 24px 32px;

  background: #e4e2dd;
  border: 1px solid #5e5d5b;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoPlace = styled.div`
  color: #424140;
  font-family: "Inter-Regular", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
`;

const PlaceIcon = styled(MapPin)`
  width: 25px;
  height: 25px;
  color: #424140;
  flex-shrink: 0;
`;

const InfoTime = styled.div`
  color: #41403f;
  font-family: "Inter-Regular", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
`;

const TimeIcon = styled(Clock)`
  width: 25px;
  height: 25px;
  color: #41403f;
  flex-shrink: 0;
`;

/* ───────── CTA (원본 ButtonWrapper) ───────── */
const CTAWrap = styled.div`
  width: 100%;
  max-width: 711px;
  margin-right: 52px;
  margin-bottom: 42px;
  display: flex;
  justify-content: flex-end;
`;

const CTAInner = styled.button`
  all: unset;
  width: 100%;
  max-width: 700px;
  padding: 21px 0;
  background: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CTAText = styled.div`
  color: #dbdbdb;
  font-family: "Inter-SemiBold", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 28.6px;
`;

/* ───────── Exported Component ───────── */
export default function IntroSection2() {
  return (
    <Page>
      <Frame>
        <Column>
          {/* Header */}
          <HeaderBar>
            <HeaderTop>
              <HeaderDate>2025-10-23</HeaderDate>
              <Subscribe>구독하기</Subscribe>
            </HeaderTop>
            <HeaderBottomLine />
          </HeaderBar>

          {/* Title */}
          <Strapline>점심 읽어주는 남자</Strapline>
          <TopDivider />
          <MainTitle>원 디그리 노스</MainTitle>

          {/* Content */}
          <ContentWrap>
            <Hero src={"/menuImages/menu1.png"} alt="원 디그리 노스 대표 이미지" />
            <SectionTitle>오늘의 데일리 큐레이션</SectionTitle>
            <Body>
              닭, 오리, 돼지. 촉촉하게 구운 싱가포르식 닭과 오리. 그리고 차슈. 껍질을 바삭하게 구운
              돼지바베큐. 다 구워, 먹기 좋게 썰어 나오고, 찬요리로 나오니 기다릴 필요가 없다.
              성수에는 없는 덤플링이 있어 맛볼 수 있다. 와인도 백주도 맥주도 잘 어울리는 안주. 밥과
              누들을 곁들이면 식사로도 손색이 없다.
            </Body>
            <EditorTitle>에디터 코멘트</EditorTitle>
            <EditorQuote>“미쉐린 가이드에는 감동과 낭만이 있다.”</EditorQuote>

            {/* Info */}
            <InfoBox>
              <InfoRow>
                <PlaceIcon />
                <InfoPlace>한경직 기념관</InfoPlace>
              </InfoRow>
              <InfoRow>
                <TimeIcon />
                <InfoTime>다음날 11:30~ 13:00픽업가능</InfoTime>
              </InfoRow>
            </InfoBox>
          </ContentWrap>
        </Column>

        {/* CTA */}
        <CTAWrap>
          <CTAInner>
            <CTAText>내일 학교에서 먹어보기</CTAText>
          </CTAInner>
        </CTAWrap>
      </Frame>
    </Page>
  );
}
