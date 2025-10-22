import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuService, type MenuOptionGroup, type MenuOption } from "@/lib/api/menuService";
import { CartService } from "@/lib/api/cartService";
import { type Menu } from "@/lib/api/supabase";

const TEMP_USER_ID = "558fa1fc-f6b6-452a-9c96-eaf7af8078c5";

interface SelectedOption {
  groupId: string;
  optionIds: string[];
  prices: { [optionId: string]: number };
}

export function useMenuDetail(menuId: string | null) {
  const router = useRouter();
  
  const [menu, setMenu] = useState<Menu | null>(null);
  const [options, setOptions] = useState<MenuOptionGroup[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // 메뉴 데이터 로드
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setLoading(true);
        if (!menuId) return;

        const [menuData, optionsData] = await Promise.all([
          MenuService.getMenuById(menuId),
          MenuService.getMenuOptions(menuId),
        ]);

        setMenu(menuData);
        setOptions(optionsData);

        // 기본 선택사항 설정
        const defaultSelections: SelectedOption[] = optionsData.map((group) => {
          if (group.isRequired && group.options.length > 0) {
            const firstOption = group.options[0];
            return {
              groupId: group.id,
              optionIds: [firstOption.id],
              prices: { [firstOption.id]: firstOption.price },
            };
          } else {
            return {
              groupId: group.id,
              optionIds: [],
              prices: {},
            };
          }
        });
        setSelectedOptions(defaultSelections);
      } catch (error) {
        console.error("메뉴 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (menuId) {
      loadMenuData();
    }
  }, [menuId]);

  // 옵션 선택 처리
  const handleOptionSelect = (groupId: string, option: MenuOption | null) => {
    setSelectedOptions((prev) => {
      const groupSelection = prev.find((item) => item.groupId === groupId);
      const group = options.find((g) => g.id === groupId);

      if (!group || !groupSelection) return prev;

      const isSingleSelect = group.maxSelections === 1;

      if (option === null) {
        // 선택 해제
        return prev.map((item) =>
          item.groupId === groupId
            ? { groupId, optionIds: [], prices: {} }
            : item
        );
      }

      if (isSingleSelect) {
        // 단일 선택: 토글
        const isCurrentlySelected = groupSelection.optionIds.includes(option.id);
        return prev.map((item) =>
          item.groupId === groupId
            ? {
                groupId,
                optionIds: isCurrentlySelected ? [] : [option.id],
                prices: isCurrentlySelected ? {} : { [option.id]: option.price },
              }
            : item
        );
      } else {
        // 다중 선택
        const isCurrentlySelected = groupSelection.optionIds.includes(option.id);

        if (isCurrentlySelected) {
          // 선택 해제
          const newOptionIds = groupSelection.optionIds.filter(
            (id) => id !== option.id
          );
          const newPrices = { ...groupSelection.prices };
          delete newPrices[option.id];

          return prev.map((item) =>
            item.groupId === groupId
              ? { groupId, optionIds: newOptionIds, prices: newPrices }
              : item
          );
        } else {
          // 선택 추가
          return prev.map((item) =>
            item.groupId === groupId
              ? {
                  groupId,
                  optionIds: [...groupSelection.optionIds, option.id],
                  prices: {
                    ...groupSelection.prices,
                    [option.id]: option.price,
                  },
                }
              : item
          );
        }
      }
    });
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    if (!menu) return 0;

    const basePrice = menu.price;
    const optionsPrice = selectedOptions.reduce((sum, selection) => {
      const selectionTotal = Object.values(selection.prices).reduce(
        (s, p) => s + p,
        0
      );
      return sum + selectionTotal;
    }, 0);
    return (basePrice + optionsPrice) * quantity;
  };

  // 수량 변경
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // 장바구니 추가
  const handleAddToCart = async () => {
    if (!menu) return;

    try {
      const selectedOptionIds = selectedOptions.flatMap(
        (selection) => selection.optionIds
      );

      const success = await CartService.addToCart(TEMP_USER_ID, {
        menuId: menu.id,
        quantity,
        selectedOptionIds,
      });

      if (success) {
        const totalPrice = calculateTotalPrice();
        alert(`장바구니에 추가되었습니다! (₩${totalPrice.toLocaleString()})`);

        const goToCart = window.confirm("장바구니로 이동하시겠습니까?");
        if (goToCart) {
          router.push("/todayMenu/cart");
        } else {
          router.back();
        }
      } else {
        alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("장바구니 추가 중 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    menu,
    options,
    selectedOptions,
    quantity,
    loading,
    totalPrice: calculateTotalPrice(),
    handleOptionSelect,
    handleQuantityChange,
    handleAddToCart,
  };
}
