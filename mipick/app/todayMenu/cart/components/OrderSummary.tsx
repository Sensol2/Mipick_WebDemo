import React from "react";
import styled from "styled-components";

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function OrderSummary({ subtotal, deliveryFee, total }: OrderSummaryProps) {
  const format = (n: number) => `${n.toLocaleString()}₩`;

  return (
    <>
      <SummaryCard>
        <SummaryLine>
          <span>상품 금액</span>
          <b>{format(subtotal)}</b>
        </SummaryLine>
        <SummaryLine>
          <span>배달비</span>
          <b>{format(deliveryFee)}</b>
        </SummaryLine>
      </SummaryCard>

      <TotalBar>
        <span>총 결제 금액</span>
        <TotalPrice>{format(total)}</TotalPrice>
      </TotalBar>
    </>
  );
}

const SummaryCard = styled.div`
  margin-top: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
`;

const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #374151;
  font-size: 14px;
`;

const TotalBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #ffe4cc;
  background: #fff7ed;
  border-radius: 12px;
  margin-top: 12px;
`;

const TotalPrice = styled.b`
  color: #f97316;
  font-weight: 800;
`;
