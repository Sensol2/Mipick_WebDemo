import React from "react";
import styled from "styled-components";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

const PAYMENT_METHODS = ["신용/체크카드", "카카오페이", "네이버페이"];

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
}: PaymentMethodSelectorProps) {
  return (
    <PayMethods>
      {PAYMENT_METHODS.map((method) => (
        <PayMethod key={method} onClick={() => onMethodSelect(method)}>
          <Radio $checked={selectedMethod === method}>
            {selectedMethod === method && <RadioDot />}
          </Radio>
          <PickupLabel>{method}</PickupLabel>
        </PayMethod>
      ))}
    </PayMethods>
  );
}

const PayMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PayMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
`;

const Radio = styled.div<{ $checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$checked ? "#f97316" : "#d1d5db")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$checked ? "#f97316" : "#fff")};
`;

const RadioDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
`;

const PickupLabel = styled.div`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;
