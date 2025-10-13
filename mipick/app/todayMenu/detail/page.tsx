"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { MenuImage, OptionGroup, QuantitySelector } from "./components";
import { useMenuDetail } from "./hooks/useMenuDetail";

export default function MenuDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("menuId");

  const {
    menu,
    options,
    selectedOptions,
    quantity,
    loading,
    totalPrice,
    handleOptionSelect,
    handleQuantityChange,
    handleAddToCart,
  } = useMenuDetail(menuId);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>옵션 선택</HeaderTitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  if (!menu) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>오류</HeaderTitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  return (
    <Page>
      <Sheet>
        <Header>
          <CloseBtn onClick={handleBack}>←</CloseBtn>
          <HeaderTitle>옵션 선택</HeaderTitle>
        </Header>

        <Body>
          <Section>
            <MenuImage menu={menu} />
          </Section>

          <Section>
            <SummaryCard>
              <SummaryLine>
                <span>기본 가격</span>
                <b>₩{menu.price.toLocaleString()}</b>
              </SummaryLine>
            </SummaryCard>
          </Section>

          {options.map((group) => {
            const selected = selectedOptions.find(s => s.groupId === group.id);
            
            return (
              <Section key={group.id}>
                <OptionGroup
                  group={group}
                  selectedOptionIds={selected?.optionIds || []}
                  onOptionSelect={(option) => handleOptionSelect(group.id, option)}
                />
              </Section>
            );
          })}

          <Section>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => handleQuantityChange(1)}
              onDecrease={() => handleQuantityChange(-1)}
            />
          </Section>
        </Body>

        <Footer>
          <PayButton onClick={handleAddToCart}>
            장바구니 담기 • ₩{totalPrice.toLocaleString()}
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
  left: 16px;
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

const SummaryCard = styled.div`
  margin-top: 0;
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
