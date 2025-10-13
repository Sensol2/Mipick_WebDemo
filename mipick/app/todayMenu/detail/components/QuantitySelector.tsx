import React from "react";
import styled from "styled-components";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({ 
  quantity, 
  onIncrease, 
  onDecrease 
}: QuantitySelectorProps) {
  return (
    <>
      <SectionTitle>수량</SectionTitle>
      <QtyControls>
        <CircleBtn
          aria-label="decrease"
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          −
        </CircleBtn>
        <QtyValue>{quantity}</QtyValue>
        <CircleBtn
          aria-label="increase"
          onClick={onIncrease}
        >
          +
        </CircleBtn>
      </QtyControls>
    </>
  );
}

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
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
