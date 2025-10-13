"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import EmptyCart from "./EmptyCart";

type CartItem = {
  id: string;
  title: string;
  price: number; // unit price
  quantity: number;
  thumbnail?: string | null;
  description?: string;
};

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
            <CloseBtn onClick={() => router.back()}>×</CloseBtn>
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
          <CloseBtn onClick={() => router.back()}>×</CloseBtn>
        </Header>

        <Body>
          <Section>
            <SectionTitle>주문 내역</SectionTitle>
            <List>
              {items.map((item) => (
                <Row key={item.id}>
                  <Thumb>
                    {item.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.thumbnail} alt={item.title} />
                    ) : (
                      <ThumbPlaceholder>🥡</ThumbPlaceholder>
                    )}
                  </Thumb>

                  <RowInfo>
                    <RowTitle>{item.title}</RowTitle>
                    <RowPrice>{format(item.price)}</RowPrice>
                  </RowInfo>

                  <QtyControls>
                    <CircleBtn
                      aria-label="decrease"
                      onClick={() => dec(item.id)}
                    >
                      −
                    </CircleBtn>
                    <QtyValue>{item.quantity}</QtyValue>
                    <CircleBtn
                      aria-label="increase"
                      onClick={() => inc(item.id)}
                    >
                      +
                    </CircleBtn>
                  </QtyControls>
                </Row>
              ))}
            </List>

            <SummaryCard>
              <SummaryLine>
                <span>상품 금액</span>
                <b>{format(subtotal)}</b>
              </SummaryLine>
              <SummaryLine>
                <span>배달비</span>
                <b>{format(deliveryFee)}</b>
              </SummaryLine>
            </SummaryCard>

            <TotalBar>
              <span>총 결제 금액</span>
              <TotalPrice>{format(total)}</TotalPrice>
            </TotalBar>
          </Section>

          <Section>
            <SectionTitle>픽업 장소</SectionTitle>
            <InfoCard>
              <CardMedia>
                <MediaPlaceholder>📸</MediaPlaceholder>
              </CardMedia>
              <InfoContent>
                <InfoTitle>숭실대학교 카페</InfoTitle>
                <InfoSub>
                  {selectedPickup} • 서울특별시 동작구 상도로 369
                </InfoSub>
              </InfoContent>
              <LinkBtn onClick={() => alert("픽업 장소 변경 (UI)")}>변경</LinkBtn>
            </InfoCard>
          </Section>

          <Section>
            <SectionTitle>픽업 시간</SectionTitle>
            <InfoCard>
              <IconCircle>⏰</IconCircle>
              <InfoContent>
                <InfoTitle>{pickupTime}</InfoTitle>
                <InfoSub>영업시간 내 픽업 가능</InfoSub>
              </InfoContent>
              <LinkBtn onClick={() => setPickupTime("내일 오후 1:00")}>
                변경
              </LinkBtn>
            </InfoCard>
          </Section>

          <Section>
            <SectionTitle>결제 수단</SectionTitle>
            <PayMethods>
              {["신용/체크카드", "카카오페이", "네이버페이"].map((m) => (
                <PayMethod key={m} onClick={() => setPaymentMethod(m)}>
                  <Radio $checked={paymentMethod === m}>
                    {paymentMethod === m && <RadioDot />}
                  </Radio>
                  <PickupLabel>{m}</PickupLabel>
                </PayMethod>
              ))}
            </PayMethods>
          </Section>
        </Body>

        <Footer>
          <PayButton onClick={handlePay}>
            {`${format(total)} 결제하기`}
          </PayButton>
        </Footer>
      </Sheet>
    </Page>
  );
}

// ========== styled ==========
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
  padding: 18px 48px;
  text-align: center;
  border-bottom: 1px solid #ffe4cc;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #fff7ed;
  color: #111827;
  font-size: 18px;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

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

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
`;

const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbPlaceholder = styled.div`
  font-size: 22px;
  color: #9ca3af;
`;

const RowInfo = styled.div`
  flex: 1;
`;

const RowTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
`;

const RowPrice = styled.div`
  font-size: 12px;
  color: #f97316;
  font-weight: 700;
  margin-top: 4px;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CircleBtn = styled.button<{ disabled?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: ${(p) => (p.disabled ? "#f9fafb" : "#fff")};
  color: ${(p) => (p.disabled ? "#d1d5db" : "#111827")};
  font-size: 16px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

const QtyValue = styled.div`
  min-width: 16px;
  text-align: center;
  font-weight: 700;
`;

const SummaryCard = styled.div`
  margin-top: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
`;

const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #374151;
  font-size: 14px;
`;

const TotalBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #ffe4cc;
  background: #fff7ed;
  border-radius: 12px;
  margin-top: 12px;
`;

const TotalPrice = styled.b`
  color: #f97316;
  font-weight: 800;
`;

const MediaPlaceholder = styled.div`
  opacity: 0.6;
  font-size: 28px;
`;

const Radio = styled.div<{ $checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$checked ? "#f97316" : "#d1d5db")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$checked ? "#f97316" : "#fff")};
`;

const RadioDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
`;

const PickupLabel = styled.div`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

const Footer = styled.div`
  padding: 14px;
  background: #fff;
  box-shadow: 0 -6px 12px rgba(0, 0, 0, 0.04);
`;

const PayButton = styled.button`
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

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
`;

const CardMedia = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #1f2937;
`;

const InfoSub = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const LinkBtn = styled.button`
  border: none;
  background: #fff7ed;
  color: #ea580c;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PayMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PayMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
`;
