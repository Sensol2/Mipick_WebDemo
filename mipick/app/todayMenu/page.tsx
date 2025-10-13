"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Coffee, Check } from "lucide-react";
import { StoreService } from "@/lib/storeService";
import { Store } from "@/lib/supabase";
import styled from "styled-components";
import { useCountdown } from "@/app/hooks/utils";

export default function Home() {
  const { hours, minutes, seconds } = useCountdown(18211); // 5시간 3분 31초
  const currentOrders = 1;
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  // 스토어 데이터 가져오기
  useEffect(() => {
    const getTodayStore = async () => {
      try {
        setLoading(true);
        const storeData = await StoreService.getTodayStore();
        setStore(storeData);
      } catch (error) {
        console.error('Failed to fetch today store:', error);
      } finally {
        setLoading(false);
      }
    };

    getTodayStore();
  }, []);

  const steps = [
    { num: 0, reward: "배달비 무료" },
    { num: 30, reward: "300원 할인" },
    { num: 50, reward: "500원 할인" },
    { num: 100, reward: "음료 무료" },
  ];

  // 로딩 상태
  if (loading) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>오늘의 메뉴</HeaderTitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  // 데이터가 없는 경우
  if (!store) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>오늘의 메뉴</HeaderTitle>
            <HeaderSubtitle>준비 중입니다</HeaderSubtitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  return (
    <Page>
      <Sheet>
        <Header>
          <HeaderTitle>오늘의 메뉴</HeaderTitle>
        </Header>

        <StoreImageContainer>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={store.thumbnail || "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250813_132%2F1755070254048Vr7FN_JPEG%2F%25C1%25A6%25C1%25D6%25BB%25F3%25C8%25B8_%25B8%25DE%25C0%25CE%25BB%25E7%25C1%25F8.jpg"}
            alt="오늘의 메뉴"
          />
          <StoreBadge>{store.name}</StoreBadge>
        </StoreImageContainer>

        <Body>
          <Section>
            <TitleRow>
              <StoreTitle>{store.name}</StoreTitle>
            </TitleRow>
            
            <StoreDescription>{store.description || "#맛집 #가성비 #든든한끼"}</StoreDescription>

            <StoreInfo>
              <MapPin size={14} />
              <span>{store.address || "위치 정보 없음"}</span>
            </StoreInfo>

            <StoreInfo>
              <Coffee size={14} />
              <InfoBold>(픽업장소) 한경직 기념관</InfoBold>
            </StoreInfo>
          </Section>

          <Section>

            <ProgressContainer>
              <ProgressTitle>현재 {currentOrders}명 주문중</ProgressTitle>
              <Steps>
                {steps.map((step, idx) => (
                  <Step key={step.num}>
                    <StepLabel>{step.num}명</StepLabel>
                    <StepCircle $active={currentOrders >= step.num}>
                      {currentOrders >= step.num ? <Check size={14} /> : idx + 1}
                    </StepCircle>
                    <StepReward>{step.reward}</StepReward>
                  </Step>
                ))}
                <ProgressLine>
                  <ProgressFill $width={((currentOrders - 0) / 100) * 100} />
                </ProgressLine>
              </Steps>
            </ProgressContainer>
            <CountdownContainer>
              <CountdownHeader>
                <Clock size={18} />
                <CountdownTitle>주문 마감까지 남은 시간</CountdownTitle>
              </CountdownHeader>
              
              <CountdownTimer>
                <TimeBox>
                  <TimeValue>{String(hours).padStart(2, '0')}</TimeValue>
                  <TimeLabel>시간</TimeLabel>
                </TimeBox>
                
                <TimeSeparator>:</TimeSeparator>
                
                <TimeBox>
                  <TimeValue>{String(minutes).padStart(2, '0')}</TimeValue>
                  <TimeLabel>분</TimeLabel>
                </TimeBox>
                
                <TimeSeparator>:</TimeSeparator>
                
                <TimeBox>
                  <TimeValue>{String(seconds).padStart(2, '0')}</TimeValue>
                  <TimeLabel>초</TimeLabel>
                </TimeBox>
              </CountdownTimer>
            </CountdownContainer>
          </Section>
        </Body>

        <Footer>
          <PayButton href={`/todayMenu/list?storeId=${store.id}`}>
            주문하고 학교에서 먹기
          </PayButton>
        </Footer>
      </Sheet>
    </Page>
  );
}



const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Sheet = styled.div`
  background: #fff;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 20px 48px;
  text-align: center;
  border-bottom: 1px solid #ffe4cc;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const HeaderSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
`;

const StoreImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoreBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const ProgressTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 14px 0;
  text-align: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const StoreTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const StoreDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
  margin: 0 0 14px 0;
`;

const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  margin: 0 0 8px 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  svg {
    color: #f97316;
    flex-shrink: 0;
  }
`;

const InfoBold = styled.span`
  font-weight: 600;
`;

const ProgressContainer = styled.div`
  background: #fafafa;
  border-radius: 12px;
  padding: 20px 0;
  margin-top: 10px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  z-index: 10;
  position: relative;
`;

const StepLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const StepCircle = styled.div<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  border: 3px solid ${props => props.$active ? '#22c55e' : '#d1d5db'};
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? 'white' : '#6b7280'};
  background: ${props => props.$active ? '#22c55e' : 'white'};
  font-size: 13px;
  font-weight: 700;
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(34, 197, 94, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
`;

const StepReward = styled.p`
  font-size: 11px;
  color: #1f2937;
  font-weight: 600;
  margin: 6px 0 0 0;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: calc(12px + 6px + 19px);
  left: 55px;
  right: 55px;
  height: 5px;
  background: #e5e7eb;
  z-index: 0;
  border-radius: 3px;
`;

const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${props => props.$width}%;
`;

const Footer = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 -6px 12px rgba(0, 0, 0, 0.04);
`;

const CountdownContainer = styled.div`
  width: 100%;
  background: #fef3f2;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
`;

const CountdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;

  svg {
    color: #dc2626;
  }
`;

const CountdownTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #991b1b;
  margin: 0;
`;

const CountdownTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  min-width: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TimeValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
`;

const TimeLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
`;

const TimeSeparator = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #dc2626;
  margin: 0 2px;
  padding-bottom: 16px;
`;

const PayButton = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 14px;
  background: #f97316;
  color: #fff;
  padding: 16px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ea580c;
  }
`;