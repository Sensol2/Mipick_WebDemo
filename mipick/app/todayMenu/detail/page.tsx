"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { MenuImage, OptionGroup, QuantitySelector } from "./components";
import { useMenuDetail } from "./hooks/useMenuDetail";
import { Page, Sheet, Header, HeaderTitle, Body, Footer, BackButton } from "../components/ui";

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
      <BackButton onClick={handleBack}>←</BackButton>
      
      <Sheet>
        <Header>
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
