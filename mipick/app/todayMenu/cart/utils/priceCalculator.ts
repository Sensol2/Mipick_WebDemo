import type { MenuOption } from "@/lib/api/supabase";

/**
 * 가격 계산 유틸리티 클래스
 * 모든 가격 계산 로직을 중앙화하여 일관성과 테스트 가능성을 보장
 */
export class PriceCalculator {
  /**
   * 메뉴와 옵션을 포함한 총 가격 계산
   * @param menuPrice 메뉴 기본 가격
   * @param options 선택된 옵션 배열
   * @param quantity 수량
   * @returns 총 가격 (메뉴 가격 + 옵션 가격) * 수량
   */
  static calculateTotal(
    menuPrice: number,
    options: Pick<MenuOption, "price">[],
    quantity: number,
  ): number {
    const optionsPrice = options.reduce((sum, opt) => sum + opt.price, 0);
    return (menuPrice + optionsPrice) * quantity;
  }
}
