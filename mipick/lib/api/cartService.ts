import { CartItemWithOption, supabase, Menu, MenuOption } from "./supabase";
import { PriceCalculator } from "@/app/todayMenu/cart/utils/priceCalculator";

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
        .from("menus")
        .select("id, price")
        .eq("id", data.menuId)
        .single();

      if (menuError || !menu) {
        console.error("Error fetching menu:", menuError);
        return false;
      }

      // 선택된 옵션들의 정보 가져오기
      let options: Array<{ price: number }> = [];
      if (data.selectedOptionIds.length > 0) {
        const { data: optionsData, error: optionsError } = await supabase
          .from("menu_options")
          .select("id, price")
          .in("id", data.selectedOptionIds);

        if (optionsError) {
          console.error("Error fetching options:", optionsError);
          return false;
        }

        options = optionsData || [];
      }

      // 가격 계산 (명시적)
      const totalPrice = PriceCalculator.calculateTotal(menu.price, options, data.quantity);

      // cart_items 추가
      const { data: cartItem, error: cartError } = await supabase
        .from("cart_items")
        .insert({
          user_id: userId,
          menu_id: data.menuId,
          quantity: data.quantity,
          total_price: totalPrice,
        })
        .select("id")
        .single();

      if (cartError || !cartItem) {
        console.error("Error adding to cart:", cartError);
        return false;
      }

      // 선택된 옵션들을 cart_item_options 테이블에 추가
      if (data.selectedOptionIds.length > 0) {
        const optionInserts = data.selectedOptionIds.map((optionId) => ({
          cart_item_id: cartItem.id,
          menu_option_id: optionId,
        }));

        const { error: optionsInsertError } = await supabase
          .from("cart_item_options")
          .insert(optionInserts);

        if (optionsInsertError) {
          console.error("Error adding cart item options:", optionsInsertError);
          // 이미 추가된 cart_item을 롤백
          await supabase.from("cart_items").delete().eq("id", cartItem.id);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error in addToCart:", error);
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

      // 기존 아이템 정보 가져오기 (가격 재계산을 위해)
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart_items")
        .select(
          `
          menu_id,
          cart_item_options(menu_option_id)
        `,
        )
        .eq("id", cartItemId)
        .single();

      if (fetchError || !cartItem) {
        console.error("Error fetching cart item:", fetchError);
        return false;
      }

      // 메뉴 정보 가져오기
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("price")
        .eq("id", cartItem.menu_id)
        .single();

      if (menuError || !menu) {
        console.error("Error fetching menu:", menuError);
        return false;
      }

      // 옵션 정보 가져오기
      const optionIds =
        (cartItem.cart_item_options as Array<{ menu_option_id: string }>)?.map(
          (opt) => opt.menu_option_id,
        ) || [];

      let options: Array<{ price: number }> = [];
      if (optionIds.length > 0) {
        const { data: optionsData, error: optionsError } = await supabase
          .from("menu_options")
          .select("price")
          .in("id", optionIds);

        if (optionsError) {
          console.error("Error fetching options:", optionsError);
          return false;
        }

        options = optionsData || [];
      }

      // 가격 재계산 (명시적)
      const totalPrice = PriceCalculator.calculateTotal(menu.price, options, quantity);

      // 수량과 가격 업데이트
      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity,
          total_price: totalPrice,
        })
        .eq("id", cartItemId);

      if (error) {
        console.error("Error updating cart item quantity:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in updateCartItemQuantity:", error);
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
        .from("cart_item_options")
        .delete()
        .eq("cart_item_id", cartItemId);

      if (optionsError) {
        console.error("Error removing cart item options:", optionsError);
        return false;
      }

      // cart_items 삭제
      const { error: cartError } = await supabase.from("cart_items").delete().eq("id", cartItemId);

      if (cartError) {
        console.error("Error removing cart item:", cartError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in removeFromCart:", error);
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
        .from("cart_items")
        .select("id")
        .eq("user_id", userId);

      if (fetchError) {
        console.error("Error fetching cart items for clear:", fetchError);
        return false;
      }

      if (!cartItems || cartItems.length === 0) {
        return true; // 이미 비어있음
      }

      const cartItemIds = cartItems.map((item: { id: string }) => item.id);

      // cart_item_options 먼저 삭제
      const { error: optionsError } = await supabase
        .from("cart_item_options")
        .delete()
        .in("cart_item_id", cartItemIds);

      if (optionsError) {
        console.error("Error clearing cart item options:", optionsError);
        return false;
      }

      // cart_items 삭제
      const { error: cartError } = await supabase.from("cart_items").delete().eq("user_id", userId);

      if (cartError) {
        console.error("Error clearing cart items:", cartError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in clearCart:", error);
      return false;
    }
  }

  /**
   * 장바구니 아이템 목록 조회 (옵션 포함)
   * @param userId 사용자 ID
   * @returns 장바구니 아이템 목록
   */
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
          created_at,
          menu:menus (
            id,
            title,
            price,
            thumbnail
          ),
          cart_item_options (
            menu_option_id,
            menu_options:menu_options (
              id,
              name,
              price
            )
          )
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cart items with options:", error);
        return [];
      }

      // menu_option_ids 및 menu_options 매핑
      const formatted =
        data?.map((item: unknown) => {
          const cartItem = item as {
            id: string;
            user_id: string;
            menu_id: string;
            quantity: number;
            total_price: number;
            created_at: string;
            menu: unknown;
            cart_item_options?: Array<{
              menu_option_id: string;
              menu_options: unknown;
            }>;
          };

          return {
            id: cartItem.id,
            user_id: cartItem.user_id,
            menu_id: cartItem.menu_id,
            quantity: cartItem.quantity,
            total_price: cartItem.total_price,
            created_at: cartItem.created_at,
            menu: cartItem.menu as Menu,
            menu_option_ids: cartItem.cart_item_options?.map((opt) => opt.menu_option_id) || [],
            menu_options:
              cartItem.cart_item_options?.map((opt) => opt.menu_options as MenuOption) || [],
          } as CartItemWithOption;
        }) || [];

      return formatted;
    } catch (err) {
      console.error("Error in getCartItemsWithOptions:", err);
      return [];
    }
  }
}
