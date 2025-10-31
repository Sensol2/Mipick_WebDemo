import React from "react";
import styled from "styled-components";
import { PriceCalculator } from "../utils/priceCalculator";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string | null;
  description?: string;
  options?: Array<{ name: string; price: number }>; // 옵션 이름과 가격 포함
}

interface OrderItemProps {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export default function OrderItem({ item, onIncrease, onDecrease }: OrderItemProps) {
  const format = (n: number) => `₩${n.toLocaleString()}`;

  // PriceCalculator를 사용하여 총 가격 계산
  const totalPrice = PriceCalculator.calculateTotal(item.price, item.options || [], item.quantity);

  return (
    <Row>
      <Thumb>
        {item.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumbnail} alt={item.title} />
        ) : (
          <ThumbPlaceholder>🥡</ThumbPlaceholder>
        )}
      </Thumb>

      <RowInfo>
        <RowTitle>{item.title}</RowTitle>
        {item.options && item.options.length > 0 && (
          <RowOptions>
            {item.options.map((opt, index) => (
              <OptionItem key={index}>
                - {opt.name} {opt.price > 0 && `(+${format(opt.price)})`}
              </OptionItem>
            ))}
          </RowOptions>
        )}
        <RowPrice>{format(totalPrice)}</RowPrice>
      </RowInfo>

      <QtyControls>
        <CircleBtn aria-label="decrease" onClick={() => onDecrease(item.id)}>
          −
        </CircleBtn>
        <QtyValue>{item.quantity}</QtyValue>
        <CircleBtn aria-label="increase" onClick={() => onIncrease(item.id)}>
          +
        </CircleBtn>
      </QtyControls>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
`;

const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbPlaceholder = styled.div`
  font-size: 22px;
  color: #9ca3af;
`;

const RowInfo = styled.div`
  flex: 1;
`;

const RowTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
`;

const RowOptions = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
  line-height: 1.4;
`;

const OptionItem = styled.div`
  margin-top: 1px;
`;

const RowPrice = styled.div`
  font-size: 12px;
  color: #f97316;
  font-weight: 700;
  margin-top: 4px;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CircleBtn = styled.button<{ disabled?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: ${(p) => (p.disabled ? "#f9fafb" : "#fff")};
  color: ${(p) => (p.disabled ? "#d1d5db" : "#111827")};
  font-size: 16px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

const QtyValue = styled.div`
  min-width: 16px;
  text-align: center;
  font-weight: 700;
`;
