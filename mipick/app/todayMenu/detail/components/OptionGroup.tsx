import React from "react";
import styled from "styled-components";
import { type MenuOptionGroup, type MenuOption } from "@/lib/menuService";

interface OptionGroupProps {
  group: MenuOptionGroup;
  selectedOptionId?: string;
  onOptionSelect: (option: MenuOption) => void;
}

export default function OptionGroup({ 
  group, 
  selectedOptionId, 
  onOptionSelect 
}: OptionGroupProps) {
  return (
    <>
      <SectionTitle>
        {group.name}
        {group.isRequired && <RequiredBadge>필수</RequiredBadge>}
      </SectionTitle>

      <List>
        {group.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <Row
              key={option.id}
              $selected={isSelected}
              onClick={() => onOptionSelect(option)}
            >
              <Radio $checked={isSelected}>
                {isSelected && <RadioDot />}
              </Radio>
              <RowInfo>
                <RowTitle>{option.name}</RowTitle>
                {option.price > 0 && (
                  <RowPrice>+₩{option.price.toLocaleString()}</RowPrice>
                )}
              </RowInfo>
            </Row>
          );
        })}
      </List>
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

const RequiredBadge = styled.span`
  background: #dc2626;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${props => props.$selected ? '#f97316' : '#e5e7eb'};
  border-radius: 12px;
  background: ${props => props.$selected ? '#fff7ed' : '#fff'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f97316;
    background: #fff7ed;
  }
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
  margin-right: 12px;
  flex-shrink: 0;
`;

const RadioDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
`;

const RowInfo = styled.div`
  flex: 1;
`;

const RowTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
`;

const RowPrice = styled.div`
  font-size: 12px;
  color: #f97316;
  font-weight: 700;
  margin-top: 4px;
`;
