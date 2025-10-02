"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService, type MenuOptionGroup, type MenuOption } from "@/lib/menuService";
import { type Menu } from "@/lib/supabase";
import "./menuDetail.css";

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
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">메뉴 상세</h2>
            <p className="subtitle">메뉴 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">오류</h2>
            <p className="subtitle">메뉴 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <div className="header-content">
            <h2 className="title">오늘의 메뉴</h2>
            <p className="subtitle">매일 바뀌는 오늘의 픽</p>
          </div>
        </div>

        <div className="menu-image-section">
          {menu.thumbnail ? (
            <img
              src={menu.thumbnail}
              alt={menu.title}
              className="menu-detail-image"
            />
          ) : (
            <div className="menu-placeholder">
              <div className="placeholder-text">{menu.title}</div>
            </div>
          )}
        </div>

        <div className="menu-detail-content">
          <div className="price-section">
            <div className="price-label">기본</div>
            <div className="price-value">₩{menu.price.toLocaleString()}</div>
          </div>

          {options.map((group) => (
            <div key={group.id} className="option-group">
              <div className="option-group-header">
                <h3 className="option-group-title">{group.name}</h3>
                {group.isRequired && <span className="required-badge">필수</span>}
              </div>

              <div className="option-items">
                {group.options.map((option) => {
                  const isSelected = selectedOptions.some(
                    selected => selected.groupId === group.id && selected.optionId === option.id
                  );

                  return (
                    <div
                      key={option.id}
                      className={`option-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(group.id, option)}
                    >
                      <div className="option-radio">
                        <div className={`radio-button ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <div className="radio-dot"></div>}
                        </div>
                      </div>
                      <div className="option-info">
                        <div className="option-name">{option.name}</div>
                        {option.price > 0 && (
                          <div className="option-price">+₩{option.price.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="quantity-section">
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            장바구니 담기 • ₩{calculateTotalPrice().toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
