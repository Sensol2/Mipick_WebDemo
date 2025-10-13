"use client";

import React, { useMemo, useState, useEffect } from "react";
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
import { CartService } from "@/lib/cartService";
import type { CartItemWithOption } from "@/lib/supabase";

// 임시 사용자 ID
const TEMP_USER_ID = "558fa1fc-f6b6-452a-9c96-eaf7af8078c5";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItemWithOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPickup] = useState<string>("한경직 기념관");
  const [pickupTime, setPickupTime] = useState<string>("내일 오전 12:30");
  const [paymentMethod, setPaymentMethod] = useState<string>("신용/체크카드");

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const items = await CartService.getCartItemsWithOptions(TEMP_USER_ID);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // CartItemWithOption을 CartItem 형태로 변환
  const items: CartItem[] = useMemo(
    () =>
      cartItems.map((item) => ({
        id: item.id,
        title: item.menu.title,
        price: item.menu.price, // 메뉴 기본 가격
        quantity: item.quantity,
        thumbnail: item.menu.thumbnail || null,
        options: item.menu_options?.map((opt) => ({ 
          name: opt.name, 
          price: opt.price 
        })) || [], // 옵션 이름과 가격 포함
      })),
    [cartItems]
  );

  const deliveryFee = 0;

  // total_price를 직접 사용 (trigger가 이미 계산함)
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total_price, 0),
    [cartItems]
  );
  const total = subtotal + deliveryFee;

  const format = (n: number) => `₩${n.toLocaleString()}`;

  // 수량 증가 핸들러
  const inc = async (id: string) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    const success = await CartService.updateCartItemQuantity(
      id,
      cartItem.quantity + 1
    );

    if (success) {
      // 전체 장바구니 새로고침 (trigger가 업데이트한 total_price 반영)
      const updatedItems = await CartService.getCartItemsWithOptions(TEMP_USER_ID);
      setCartItems(updatedItems);
    }
  };

  // 수량 감소 핸들러
  const dec = async (id: string) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity - 1;

    if (newQuantity <= 0) {
      // 수량이 0이 되면 삭제
      const success = await CartService.removeFromCart(id);
      if (success) {
        const updatedItems = await CartService.getCartItemsWithOptions(TEMP_USER_ID);
        setCartItems(updatedItems);
      }
    } else {
      // 수량 감소
      const success = await CartService.updateCartItemQuantity(id, newQuantity);
      if (success) {
        // 전체 장바구니 새로고침 (trigger가 업데이트한 total_price 반영)
        const updatedItems = await CartService.getCartItemsWithOptions(TEMP_USER_ID);
        setCartItems(updatedItems);
      }
    }
  };

  const handlePay = () => {
    // TODO: 실제 결제 로직 구현
    alert(`결제 진행: ${format(total)}`);
  };

  // 로딩 중
  if (loading) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>주문하기</HeaderTitle>
            <CloseButton onClick={() => router.back()}>×</CloseButton>
          </Header>
          <Body>
            <LoadingText>장바구니를 불러오는 중...</LoadingText>
          </Body>
        </Sheet>
      </Page>
    );
  }

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

const LoadingText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--color-gray-500);
  font-size: var(--font-base);
`;
