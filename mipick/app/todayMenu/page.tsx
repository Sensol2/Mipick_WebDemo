"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Clock, Coffee, Check } from "lucide-react";
import { StoreService } from "@/lib/storeService";
import { Store } from "@/lib/supabase";
import styled from "styled-components";
import { useCountdown } from "@/app/hooks/utils";

export default function Home() {
  const { formatted } = useCountdown(211); // 03:31
  const currentOrders = 35;
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
        <Card>
          <CardHeader>
            <Title>오늘의 메뉴</Title>
            <Subtitle>로딩 중...</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  // 데이터가 없는 경우
  if (!store) {
    return (
      <Page>
        <Card>
          <CardHeader>
            <Title>오늘의 메뉴</Title>
            <Subtitle>준비 중입니다</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <CardHeader>
          <Title>오늘의 메뉴</Title>
          <Subtitle>매일 바뀌는 오늘의 픽</Subtitle>
        </CardHeader>

        <Media>
          <img
            src={store.thumbnail || "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250813_132%2F1755070254048Vr7FN_JPEG%2F%25C1%25A6%25C1%25D6%25BB%25F3%25C8%25B8_%25B8%25DE%25C0%25CE%25BB%25E7%25C1%25F8.jpg"}
            alt="오늘의 메뉴"
          />
          <Badge>{store.name}</Badge>
        </Media>

        <Content>
          <ContentHeader>
            <MenuTitle>{store.name}</MenuTitle>
            <Countdown>
              <Clock size={14} />
              <span>{formatted} 뒤에 사라져요!</span>
            </Countdown>
          </ContentHeader>

          <Description>{store.description || "#맛집 #가성비 #든든한끼"}</Description>

          <Info>
            <MapPin size={14} className="icon" />
            <span>{store.address || "위치 정보 없음"}</span>
          </Info>

          <Info>
            <Coffee size={14} className="icon" />
            <Bold>(픽업장소) 한경직 기념관</Bold>
          </Info>

          <ProgressSection>
            <CurrentOrders>현재 {currentOrders}명 주문중</CurrentOrders>
            <Steps>
              {steps.map((step, idx) => (
                <Step key={step.num}>
                  <StepLabel>{step.num}명</StepLabel>
                  <Circle $active={currentOrders >= step.num}>
                    {currentOrders >= step.num ? <Check size={14} /> : idx + 1}
                  </Circle>
                  <Reward>{step.reward}</Reward>
                </Step>
              ))}
              <ProgressLine>
                <ProgressFill $width={((currentOrders - 0) / 100) * 100} />
              </ProgressLine>
            </Steps>
          </ProgressSection>

          <OrderBtn href={`/todayMenu/list?storeId=${store.id}`}>
            주문하고 학교에서 먹기
          </OrderBtn>
        </Content>
      </Card>
    </Page>
  );
}



const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #fed7aa;
  max-width: 420px;
  width: 100%;
`;

const CardHeader = styled.div`
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #ea580c;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 0;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const Content = styled.div`
  padding: 24px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MenuTitle = styled.h1`
  display: flex;
  align-self: center;
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  line-height: 20px;
`;

const Countdown = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #dc2626;
  background: #fee2e2;
  padding: 2px 8px;
  border-radius: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .icon {
    margin-right: 4px;
    color: #f97316;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const ProgressSection = styled.div`
  margin-top: 28px;
  padding: 20px 0;
  background: #fafafa;
  border-radius: 12px;
  margin-bottom: 4px;
`;

const CurrentOrders = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
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
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6px;
`;

const Circle = styled.div<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
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

const Reward = styled.p`
  font-size: 11px;
  color: #1f2937;
  font-weight: 600;
  margin-top: 6px;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 43px;
  left: 50px;
  right: 50px;
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

const OrderBtn = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  background: #f97316;
  color: white;
  font-weight: 700;
  padding: 12px;
  border-radius: 12px;
  margin-top: 16px;
  text-decoration: none;

  &:hover {
    background: #ea580c;
  }
`;