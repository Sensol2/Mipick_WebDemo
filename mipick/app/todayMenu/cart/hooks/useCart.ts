import { useState, useEffect, useMemo } from "react";
import { CartService } from "@/lib/api/cartService";
import type { CartItemWithOption } from "@/lib/api/supabase";
import { PriceCalculator } from "../utils/priceCalculator";
import type { CartItem } from "../components";

const TEMP_USER_ID = "558fa1fc-f6b6-452a-9c96-eaf7af8078c5";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemWithOption[]>([]);
  const [loading, setLoading] = useState(true);

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
        price: item.menu.price,
        quantity: item.quantity,
        thumbnail: item.menu.thumbnail || null,
        options: item.menu_options?.map((opt) => ({
          name: opt.name,
          price: opt.price,
        })) || [],
      })),
    [cartItems]
  );

  // 총 가격 계산
  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const itemTotal = PriceCalculator.calculateTotal(
          item.menu.price,
          item.menu_options || [],
          item.quantity
        );
        return sum + itemTotal;
      }, 0),
    [cartItems]
  );

  // 수량 증가
  const increaseQuantity = async (id: string) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + 1;

    // Optimistic Update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    const success = await CartService.updateCartItemQuantity(id, newQuantity);

    // 실패 시 롤백
    if (!success) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: cartItem.quantity } : item
        )
      );
    }
  };

  // 수량 감소
  const decreaseQuantity = async (id: string) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity - 1;

    if (newQuantity <= 0) {
      // 삭제
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      const success = await CartService.removeFromCart(id);
      
      if (!success) {
        setCartItems((prev) => [...prev, cartItem]);
      }
    } else {
      // 수량 감소
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      const success = await CartService.updateCartItemQuantity(id, newQuantity);

      if (!success) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: cartItem.quantity } : item
          )
        );
      }
    }
  };

  return {
    items,
    loading,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
  };
}
