/**
 * 숫자를 원화 형식으로 포맷
 * @param amount 금액
 * @returns ₩X,XXX 형식의 문자열
 */
export function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString()}`;
}
