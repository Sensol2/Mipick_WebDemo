"use client";

import React, { useEffect, useState } from "react";
import { StoreService } from "@/lib/storeService";
import { Store } from "@/lib/supabase";
import styled from "styled-components";
import { useCountdown } from "@/app/hooks/utils";
import { Header, HeaderTitle, HeaderSubtitle, Body } from "./components/ui";
import { StoreHeader, StoreInfo, ProgressSection, CountdownSection } from "./components/features";

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

  // 로딩 상태
  if (loading) {
    return (
      <>
        <Header>
          <HeaderTitle>오늘의 메뉴</HeaderTitle>
        </Header>
      </>
    );
  }

  // 데이터가 없는 경우
  if (!store) {
    return (
      <>
        <Header>
          <HeaderTitle>오늘의 메뉴</HeaderTitle>
          <HeaderSubtitle>준비 중입니다</HeaderSubtitle>
        </Header>
      </>
    );
  }

  return (
    <>
      <Header>
        <HeaderTitle>오늘의 메뉴</HeaderTitle>
      </Header>

      <StoreHeader store={store} />

      <Body>
        <StoreInfo store={store} />
        
        <Section>
          <ProgressSection currentOrders={currentOrders} />
          <CountdownSection hours={hours} minutes={minutes} seconds={seconds} />
        </Section>
      </Body>

      <Footer>
        <PayButton href={`/todayMenu/list?storeId=${store.id}`}>
          주문하고 학교에서 먹기
        </PayButton>
      </Footer>
    </>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
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