import { CartItemWithOption, supabase, type CartItem } from '../lib/supabase';

export interface AddToCartData {
  menuId: string;
  quantity: number;
  selectedOptionIds: string[];
}

export class CartService {
  /**
   * 메뉴와 선택된 옵션을 장바구니에 추가
   * @param userId 사용자 ID
   * @param data 장바구니 추가 데이터
   * @returns 성공 여부
   */
  static async addToCart(userId: string, data: AddToCartData): Promise<boolean> {
    try {
      // 메뉴 정보 가져오기
      const { data: menu, error: menuError } = await supabase
        .from('menus')
        .select('id, price')
        .eq('id', data.menuId)
        .single();

      if (menuError || !menu) {
        console.error('Error fetching menu:', menuError);
        return false;
      }

      // 선택된 옵션들의 가격 가져오기
      let optionsPrice = 0;
      if (data.selectedOptionIds.length > 0) {
        const { data: options, error: optionsError } = await supabase
          .from('menu_options')
          .select('id, price')
          .in('id', data.selectedOptionIds);

        if (optionsError) {
          console.error('Error fetching options:', optionsError);
          return false;
        }

        optionsPrice = options?.reduce((sum, option) => sum + option.price, 0) || 0;
      }

      // 총 가격 계산 (메뉴 가격 + 옵션 가격) * 수량
      const totalPrice = (menu.price + optionsPrice) * data.quantity;

      // 트랜잭션으로 cart_items와 cart_item_options 동시 추가
      const { data: cartItem, error: cartError } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          menu_id: data.menuId,
          quantity: data.quantity,
          total_price: totalPrice
        })
        .select('id')
        .single();

      if (cartError || !cartItem) {
        console.error('Error adding to cart:', cartError);
        return false;
      }

      // 선택된 옵션들을 cart_item_options 테이블에 추가
      if (data.selectedOptionIds.length > 0) {
        const optionInserts = data.selectedOptionIds.map(optionId => ({
          cart_item_id: cartItem.id,
          menu_option_id: optionId
        }));

        const { error: optionsInsertError } = await supabase
          .from('cart_item_options')
          .insert(optionInserts);

        if (optionsInsertError) {
          console.error('Error adding cart item options:', optionsInsertError);
          // 이미 추가된 cart_item을 롤백
          await supabase.from('cart_items').delete().eq('id', cartItem.id);
          return false;
        }
      }

      console.log('Successfully added to cart:', {
        cartItemId: cartItem.id,
        menuId: data.menuId,
        quantity: data.quantity,
        totalPrice,
        optionsCount: data.selectedOptionIds.length
      });

      return true;
    } catch (error) {
      console.error('Error in addToCart:', error);
      return false;
    }
  }

  /**
   * 장바구니 아이템 수량 업데이트
   * @param cartItemId 장바구니 아이템 ID
   * @param quantity 새로운 수량
   * @returns 성공 여부
   */
  static async updateCartItemQuantity(cartItemId: string, quantity: number): Promise<boolean> {
    try {
      if (quantity <= 0) {
        return await this.removeFromCart(cartItemId);
      }

      // 기존 아이템 정보 가져오기
      const { data: cartItem, error: fetchError } = await supabase
        .from('cart_items')
        .select(`
          menu_id,
          menu:menus(price),
          cart_item_options(
            menu_options:menu_options(price)
          )
        `)
        .eq('id', cartItemId)
        .single();

      if (fetchError || !cartItem) {
        console.error('Error fetching cart item:', fetchError);
        return false;
      }

      // 총 가격 재계산
      const menuPrice = (cartItem.menu as any)?.price || 0;
      const optionsPrice = cartItem.cart_item_options?.reduce(
        (sum: number, opt: any) => sum + (opt.menu_options?.price || 0), 
        0
      ) || 0;
      const totalPrice = (menuPrice + optionsPrice) * quantity;

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          total_price: totalPrice
        })
        .eq('id', cartItemId);

      if (error) {
        console.error('Error updating cart item quantity:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateCartItemQuantity:', error);
      return false;
    }
  }

  /**
   * 장바구니에서 아이템 제거
   * @param cartItemId 장바구니 아이템 ID
   * @returns 성공 여부
   */
  static async removeFromCart(cartItemId: string): Promise<boolean> {
    try {
      // cart_item_options 먼저 삭제 (외래키 제약 조건)
      const { error: optionsError } = await supabase
        .from('cart_item_options')
        .delete()
        .eq('cart_item_id', cartItemId);

      if (optionsError) {
        console.error('Error removing cart item options:', optionsError);
        return false;
      }

      // cart_items 삭제
      const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (cartError) {
        console.error('Error removing cart item:', cartError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      return false;
    }
  }

  /**
   * 사용자의 장바구니 전체 비우기
   * @param userId 사용자 ID
   * @returns 성공 여부
   */
  static async clearCart(userId: string): Promise<boolean> {
    try {
      // 사용자의 모든 cart_items ID 가져오기
      const { data: cartItems, error: fetchError } = await supabase
        .from('cart_items')
        .select('id')
        .eq('user_id', userId);

      if (fetchError) {
        console.error('Error fetching cart items for clear:', fetchError);
        return false;
      }

      if (!cartItems || cartItems.length === 0) {
        return true; // 이미 비어있음
      }

      const cartItemIds = cartItems.map(item => item.id);

      // cart_item_options 먼저 삭제
      const { error: optionsError } = await supabase
        .from('cart_item_options')
        .delete()
        .in('cart_item_id', cartItemIds);

      if (optionsError) {
        console.error('Error clearing cart item options:', optionsError);
        return false;
      }

      // cart_items 삭제
      const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (cartError) {
        console.error('Error clearing cart items:', cartError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in clearCart:', error);
      return false;
    }
  }

  static async getCartItemsWithOptions(userId: string): Promise<CartItemWithOption[]> {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          user_id,
          menu_id,
          quantity,
          total_price,
          menu:menus (
            id,
            title,
            price,
            image_url
          ),
          cart_item_options (
            menu_option_id,
            menu_options:menu_options (
              id,
              name,
              price
            )
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cart items with options:", error);
        return [];
      }

      // menu_option_ids 및 menu_options 매핑
      const formatted: CartItemWithOption[] =
        data?.map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          menu_id: item.menu_id,
          quantity: item.quantity,
          total_price: item.total_price,
          menu: item.menu,
          menu_option_ids: item.cart_item_options?.map(
            (opt: any) => opt.menu_option_id
          ) || [],
          menu_options:
            item.cart_item_options?.map((opt: any) => opt.menu_options) || [],
        })) || [];

      return formatted;
    } catch (err) {
      console.error("Error in getCartItemsWithOptions:", err);
      return [];
    }
  }
}