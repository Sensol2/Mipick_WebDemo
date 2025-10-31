"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  EmptyCart,
  OrderItem,
  OrderSummary,
  PickupInfoCard,
  PaymentMethodSelector,
} from "./components";
import { Header, HeaderTitle, Body, Footer, CloseButton } from "../components/ui";
import { useCart } from "./hooks/useCart";
import { formatCurrency } from "./utils/formatters";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, loading, subtotal, increaseQuantity, decreaseQuantity } = useCart();

  const [selectedPickup] = useState<string>("한경직 기념관");
  const [pickupTime, setPickupTime] = useState<string>("내일 오전 12:30");
  const [paymentMethod, setPaymentMethod] = useState<string>("신용/체크카드");

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handlePay = () => {
    // TODO: 실제 결제 로직 구현
    alert(`결제 진행: ${formatCurrency(total)}`);
  };

  // 로딩 중
  if (loading) {
    return (
      <>
        <Header>
          <HeaderTitle>주문하기</HeaderTitle>
          <CloseButton onClick={() => router.back()}>×</CloseButton>
        </Header>
        <Body>
          <LoadingText>장바구니를 불러오는 중...</LoadingText>
        </Body>
      </>
    );
  }

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <>
        <Header>
          <HeaderTitle>주문하기</HeaderTitle>
          <CloseButton onClick={() => router.back()}>×</CloseButton>
        </Header>
        <EmptyCart onBack={() => router.back()} />
      </>
    );
  }

  return (
    <>
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
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </List>

          <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
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
          <PaymentMethodSelector selectedMethod={paymentMethod} onMethodSelect={setPaymentMethod} />
        </Section>
      </Body>

      <Footer>
        <PayBtn onClick={handlePay}>{`${formatCurrency(total)} 결제하기`}</PayBtn>
      </Footer>
    </>
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

const LoadingText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--color-gray-500);
  font-size: var(--font-base);
`;
