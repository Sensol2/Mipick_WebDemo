import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import CheckoutHeader from '@/components/CheckoutScreen/CheckoutHeader';
import CartSummary from '@/components/CheckoutScreen/CartSummary';
import PickupLocationCard from '@/components/CheckoutScreen/PickupLocationCard';
import PickupTimeCard from '@/components/CheckoutScreen/PickupTimeCard';
import PaymentMethodSection from '@/components/CheckoutScreen/PaymentMethodSection';
import { useAuth } from '@/contexts/AuthContext';
import { useCartItems, useUpdateCartItemQuantity, useRemoveFromCart } from '@/hooks/useQueries';
import type { CartItemWithOption } from '@/lib/supabase';


type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  options?: Array<{
    name: string;
    price: number;
  }>;
  totalPrice: number;
};

export default function CheckoutScreen(): React.ReactElement {
  const { session } = useAuth();
  const [items, setItems] = useState<OrderItem[]>([]);
  
  // TanStack Query hooks
  const { data: cartItems, isLoading, refetch } = useCartItems(session?.user?.id || '');
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveFromCart();


  // TODO : 배달비 0으로 하드코딩 되어있으므로 수정 필요
  const deliveryFee = 0;

  useEffect(() => {
    if (cartItems) {
      // OrderSummary 형식에 맞게 변환
      const formattedItems: OrderItem[] = cartItems.map((item: CartItemWithOption) => {
        const basePrice = item.menu?.price || 0;
        const optionsPrice = item.menu_options?.reduce((sum: number, option: { price: number }) => sum + option.price, 0) || 0;
        const itemTotalPrice = (basePrice + optionsPrice) * item.quantity;

        return {
          id: item.id,
          title: item.menu?.title || '알 수 없는 메뉴',
          price: basePrice,
          quantity: item.quantity,
          imageUrl: item.menu?.image_url || 'https://picsum.photos/200/200',
          options: item.menu_options?.map((option: { name: string; price: number }) => ({
            name: option.name,
            price: option.price
          })) || [],
          totalPrice: itemTotalPrice
        };
      });
      setItems(formattedItems);
    }
  }, [cartItems]);

  const handleIncrease = async (id: string) => {
    const item = items.find(item => item.id === id);
    if (!item || updateQuantityMutation.isPending) return;

    const newQuantity = item.quantity + 1;
    
    try {
      await updateQuantityMutation.mutateAsync({ cartItemId: id, quantity: newQuantity });
      // refetch 대신 optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { 
            ...item, 
            quantity: newQuantity,
            totalPrice: (item.totalPrice / item.quantity) * newQuantity
          } : item
        )
      );
    } catch (error) {
      console.error('Failed to increase quantity:', error);
      refetch(); // 실패 시 다시 가져오기
    }
  };

  const handleDecrease = async (id: string) => {
    const item = items.find(item => item.id === id);
    if (!item || updateQuantityMutation.isPending || removeItemMutation.isPending) return;

    if (item.quantity <= 1) {
      // 수량이 1이면 아이템 삭제
      try {
        await removeItemMutation.mutateAsync(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Failed to remove item:', error);
        refetch();
      }
    } else {
      // 수량 감소
      const newQuantity = item.quantity - 1;
      try {
        await updateQuantityMutation.mutateAsync({ cartItemId: id, quantity: newQuantity });
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { 
              ...item, 
              quantity: newQuantity,
              totalPrice: (item.totalPrice / item.quantity) * newQuantity
            } : item
          )
        );
      } catch (error) {
        console.error('Failed to decrease quantity:', error);
        refetch();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CheckoutHeader />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            <CartSummary
                items={items}
                deliveryFee={deliveryFee}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                disabled={updateQuantityMutation.isPending || removeItemMutation.isPending}
            />
            <PickupLocationCard
              name="숭실대학교 카페"
              address="서울특별시 동작구 상도로 369"
              imageUrl="https://cdn.ssunews.net/news/photo/201805/6399_5253_00.jpg"
              onPress={() => console.log("강남역 카드 클릭")}
            />
            <PickupTimeCard 
              time="내일 오전 12:30"
              onPress={() => console.log("픽업 시간 선택")} 
            />
            <PaymentMethodSection />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
});