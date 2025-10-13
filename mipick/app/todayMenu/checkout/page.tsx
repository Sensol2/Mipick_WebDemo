"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { 
  EmptyCart, 
  OrderItem, 
  OrderSummary, 
  PickupInfoCard, 
  PaymentMethodSelector,
  type CartItem 
} from "./components";
import { Page, Sheet, Header, HeaderTitle, Body, Footer, CloseButton } from "../components/ui";

export default function CheckoutPage() {
  const router = useRouter();

  // Mocked cart items (UI only as requested)
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "프리미엄 한우 부채살",
      price: 15000,
      quantity: 2,
      thumbnail: null,
    },
    {
      id: "2",
      title: "리조또 감자 500g",
      price: 8000,
      quantity: 1,
      thumbnail: null,
    },
    {
      id: "3",
      title: "수제 소스 패키지",
      price: 5000,
      quantity: 3,
      thumbnail: null,
    },
  ]);

  const [selectedPickup] = useState<string>("한경직 기념관");
  const [pickupTime, setPickupTime] = useState<string>("내일 오전 12:30");
  const [paymentMethod, setPaymentMethod] = useState<string>("신용/체크카드");

  const deliveryFee = 0;

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const total = subtotal + deliveryFee;

  const format = (n: number) => `₩${n.toLocaleString()}`;

  // 수량 증가 핸들러
  const inc = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  // 수량 감소 핸들러
  const dec = (id: string) =>
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      // 수량이 0이 되면 해당 항목을 리스트에서 제거
      return updated.filter((i) => i.quantity > 0);
    });

  const handlePay = () => {
    // UI only
    alert(`결제 진행: ${format(total)}`);
  };

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>주문하기</HeaderTitle>
            <CloseButton onClick={() => router.back()}>×</CloseButton>
          </Header>
          <EmptyCart onBack={() => router.back()} />
        </Sheet>
      </Page>
    );
  }

  return (
    <Page>
      <Sheet>
        <Header>
          <HeaderTitle>주문하기</HeaderTitle>
          <CloseButton onClick={() => router.back()}>×</CloseButton>
        </Header>

        <Body>
          <Section>
            <SectionTitle>주문 내역</SectionTitle>
            <List>
              {items.map((item) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  onIncrease={inc}
                  onDecrease={dec}
                />
              ))}
            </List>

            <OrderSummary 
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          </Section>

          <Section>
            <SectionTitle>픽업 장소</SectionTitle>
            <PickupInfoCard
              type="location"
              title="숭실대학교 카페"
              subtitle={`${selectedPickup} • 서울특별시 동작구 상도로 369`}
              onChangeClick={() => alert("픽업 장소 변경 (UI)")}
            />
          </Section>

          <Section>
            <SectionTitle>픽업 시간</SectionTitle>
            <PickupInfoCard
              type="time"
              title={pickupTime}
              subtitle="영업시간 내 픽업 가능"
              onChangeClick={() => setPickupTime("내일 오후 1:00")}
            />
          </Section>

          <Section>
            <SectionTitle>결제 수단</SectionTitle>
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
            />
          </Section>
        </Body>

        <Footer>
          <PayBtn onClick={handlePay}>
            {`${format(total)} 결제하기`}
          </PayBtn>
        </Footer>
      </Sheet>
    </Page>
  );
}

// ========== styled ==========
const Section = styled.section``;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PayBtn = styled.button`
  width: 100%;
  border: none;
  border-radius: 14px;
  background: #f97316;
  color: #fff;
  padding: 16px 18px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ea580c;
  }
`;
