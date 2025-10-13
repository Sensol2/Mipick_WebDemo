"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService, type MenuOptionGroup, type MenuOption } from "@/lib/menuService";
import { type Menu } from "@/lib/supabase";
import styled from "styled-components";
import { MenuImage, OptionGroup, QuantitySelector } from "./components";

interface SelectedOption {
  groupId: string;
  optionIds: string[];  // 단일 선택 → 다중 선택으로 변경
  prices: { [optionId: string]: number };
}

export default function MenuDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("menuId");
  
  const [menu, setMenu] = useState<Menu | null>(null);
  const [options, setOptions] = useState<MenuOptionGroup[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      if (!menuId) return;
      
      const [menuData, optionsData] = await Promise.all([
        MenuService.getMenuById(menuId),
        MenuService.getMenuOptions(menuId)
      ]);

      setMenu(menuData);
      setOptions(optionsData);
      
      // 기본 선택사항 설정 (필수 옵션의 첫 번째 항목)
      const defaultSelections: SelectedOption[] = [];
      optionsData.forEach(group => {
        if (group.isRequired && group.options.length > 0) {
          const firstOption = group.options[0];
          defaultSelections.push({
            groupId: group.id,
            optionIds: [firstOption.id],
            prices: { [firstOption.id]: firstOption.price }
          });
        } else {
          // 선택 사항은 빈 배열로 초기화
          defaultSelections.push({
            groupId: group.id,
            optionIds: [],
            prices: {}
          });
        }
      });
      setSelectedOptions(defaultSelections);
      
    } catch (error) {
      console.error("메뉴 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (menuId) {
      loadMenuData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuId]);

  const handleOptionSelect = (groupId: string, option: MenuOption | null) => {
    setSelectedOptions(prev => {
      const groupSelection = prev.find(item => item.groupId === groupId);
      const group = options.find(g => g.id === groupId);
      
      if (!group || !groupSelection) return prev;

      const isSingleSelect = group.maxSelections === 1;

      if (option === null) {
        // '선택 안함' 클릭 또는 단일 선택 해제
        return prev.map(item => 
          item.groupId === groupId 
            ? { groupId, optionIds: [], prices: {} }
            : item
        );
      }

      if (isSingleSelect) {
        // 단일 선택: 토글 방식
        const isCurrentlySelected = groupSelection.optionIds.includes(option.id);
        return prev.map(item =>
          item.groupId === groupId
            ? {
                groupId,
                optionIds: isCurrentlySelected ? [] : [option.id],
                prices: isCurrentlySelected ? {} : { [option.id]: option.price }
              }
            : item
        );
      } else {
        // 다중 선택
        const isCurrentlySelected = groupSelection.optionIds.includes(option.id);
        
        if (isCurrentlySelected) {
          // 선택 해제
          const newOptionIds = groupSelection.optionIds.filter(id => id !== option.id);
          const newPrices = { ...groupSelection.prices };
          delete newPrices[option.id];
          
          return prev.map(item =>
            item.groupId === groupId
              ? { groupId, optionIds: newOptionIds, prices: newPrices }
              : item
          );
        } else {
          // 선택 추가 (최대 개수 체크는 컴포넌트에서 처리)
          return prev.map(item =>
            item.groupId === groupId
              ? {
                  groupId,
                  optionIds: [...groupSelection.optionIds, option.id],
                  prices: { ...groupSelection.prices, [option.id]: option.price }
                }
              : item
          );
        }
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!menu) return 0;
    
    const basePrice = menu.price;
    const optionsPrice = selectedOptions.reduce((sum, selection) => {
      const selectionTotal = Object.values(selection.prices).reduce((s, p) => s + p, 0);
      return sum + selectionTotal;
    }, 0);
    return (basePrice + optionsPrice) * quantity;
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    console.log("장바구니에 추가:", {
      menu,
      selectedOptions,
      quantity,
      totalPrice
    });
    alert(`장바구니에 추가되었습니다! (₩${totalPrice.toLocaleString()})`);
  };

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
            장바구니 담기 • ₩{calculateTotalPrice().toLocaleString()}
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

const HeaderSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
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
