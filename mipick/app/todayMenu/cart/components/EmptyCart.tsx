import React from "react";
import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";

/**
 * todayMenu - 장바구니가 비어있을 때 표시되는 Empty State 컴포넌트
 */

interface EmptyCartProps {
  onBack: () => void;
}

export default function EmptyCart({ onBack }: EmptyCartProps) {
  return (
    <EmptyContainer>
      <EmptyIcon>
        <BsCart3 />
      </EmptyIcon>
      <EmptyTitle>장바구니가 비어있습니다</EmptyTitle>
      <EmptyDescription>
        메뉴를 추가하고 주문을 시작해보세요!
      </EmptyDescription>
      <BackButton onClick={onBack}>
        메뉴 보러가기
      </BackButton>
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 64px;
    color: #9ca3af;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
  text-align: center;
`;

const BackButton = styled.button`
  border: none;
  border-radius: 14px;
  background: #f97316;
  color: #fff;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ea580c;
  }
`;
