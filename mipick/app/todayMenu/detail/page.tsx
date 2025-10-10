"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService, type MenuOptionGroup, type MenuOption } from "@/lib/menuService";
import { type Menu } from "@/lib/supabase";
import styled from "styled-components";

interface SelectedOption {
  groupId: string;
  optionId: string;
  price: number;
}

export default function MenuDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("menuId");
  const storeId = searchParams?.get("storeId");
  
  const [menu, setMenu] = useState<Menu | null>(null);
  const [options, setOptions] = useState<MenuOptionGroup[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menuId) {
      loadMenuData();
    }
  }, [menuId]);

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
          defaultSelections.push({
            groupId: group.id,
            optionId: group.options[0].id,
            price: group.options[0].price
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

  const handleOptionSelect = (groupId: string, option: MenuOption) => {
    setSelectedOptions(prev => {
      const filtered = prev.filter(item => item.groupId !== groupId);
      return [...filtered, {
        groupId,
        optionId: option.id,
        price: option.price
      }];
    });
  };

  const calculateTotalPrice = () => {
    if (!menu) return 0;
    
    const basePrice = menu.price;
    const optionsPrice = selectedOptions.reduce((sum, selected) => sum + selected.price, 0);
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
    // 여기에 장바구니 추가 로직 구현
    alert(`장바구니에 추가되었습니다! (₩${totalPrice.toLocaleString()})`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Page>
        <Card>
          <CardHeader>
            <Title>메뉴 상세</Title>
            <Subtitle>메뉴 정보를 불러오는 중...</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  if (!menu) {
    return (
      <Page>
        <Card>
          <CardHeader>
            <Title>오류</Title>
            <Subtitle>메뉴 정보를 찾을 수 없습니다.</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <CardHeader>
          <BackButton onClick={handleBack}>
            ←
          </BackButton>
          <HeaderContent>
            <Title>오늘의 메뉴</Title>
            <Subtitle>매일 바뀌는 오늘의 픽</Subtitle>
          </HeaderContent>
        </CardHeader>

        <MenuImageSection>
          {menu.thumbnail ? (
            <img
              src={menu.thumbnail}
              alt={menu.title}
            />
          ) : (
            <MenuPlaceholder>
              <PlaceholderText>{menu.title}</PlaceholderText>
            </MenuPlaceholder>
          )}
        </MenuImageSection>

        <MenuDetailContent>
          <PriceSection>
            <PriceLabel>기본</PriceLabel>
            <PriceValue>₩{menu.price.toLocaleString()}</PriceValue>
          </PriceSection>

          {options.map((group) => (
            <OptionGroup key={group.id}>
              <OptionGroupHeader>
                <OptionGroupTitle>{group.name}</OptionGroupTitle>
                {group.isRequired && <RequiredBadge>필수</RequiredBadge>}
              </OptionGroupHeader>

              <OptionItems>
                {group.options.map((option) => {
                  const isSelected = selectedOptions.some(
                    selected => selected.groupId === group.id && selected.optionId === option.id
                  );

                  return (
                    <OptionItem
                      key={option.id}
                      $selected={isSelected}
                      onClick={() => handleOptionSelect(group.id, option)}
                    >
                      <OptionRadio>
                        <RadioButton $checked={isSelected}>
                          {isSelected && <RadioDot />}
                        </RadioButton>
                      </OptionRadio>
                      <OptionInfo>
                        <OptionName>{option.name}</OptionName>
                        {option.price > 0 && (
                          <OptionPrice>+₩{option.price.toLocaleString()}</OptionPrice>
                        )}
                      </OptionInfo>
                    </OptionItem>
                  );
                })}
              </OptionItems>
            </OptionGroup>
          ))}

          <QuantitySection>
            <QuantityControls>
              <QuantityBtn 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </QuantityBtn>
              <QuantityValue>{quantity}</QuantityValue>
              <QuantityBtn 
                onClick={() => handleQuantityChange(1)}
              >
                +
              </QuantityBtn>
            </QuantityControls>
          </QuantitySection>

          <AddToCartBtn onClick={handleAddToCart}>
            장바구니 담기 • ₩{calculateTotalPrice().toLocaleString()}
          </AddToCartBtn>
        </MenuDetailContent>
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
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ea580c;
  font-weight: bold;
`;

const HeaderContent = styled.div``;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #ea580c;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const MenuImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f9fafb;
  color: #6b7280;
`;

const PlaceholderText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const MenuDetailContent = styled.div`
  padding: 24px;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const PriceLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const PriceValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #f97316;
`;

const OptionGroup = styled.div`
  margin-bottom: 24px;
`;

const OptionGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const OptionGroupTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const RequiredBadge = styled.span`
  background: #dc2626;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
`;

const OptionItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid ${props => props.$selected ? '#f97316' : '#e5e7eb'};
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.$selected ? '#fff7ed' : 'white'};
  transition: all 0.2s ease;

  &:hover {
    border-color: #f97316;
    background: #fff7ed;
  }
`;

const OptionRadio = styled.div`
  margin-right: 12px;
`;

const RadioButton = styled.div<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$checked ? '#f97316' : '#d1d5db'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$checked ? '#f97316' : 'white'};
`;

const RadioDot = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
`;

const OptionPrice = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const QuantitySection = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
`;

const QuantityBtn = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.disabled ? '#d1d5db' : '#f97316'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 4px 8px;
  
  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-radius: 4px;
  }
`;

const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
  text-align: center;
`;

const AddToCartBtn = styled.button`
  width: 100%;
  background: #f97316;
  color: white;
  font-size: 16px;
  font-weight: 700;
  padding: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ea580c;
  }
`;