import React from "react";
import styled from "styled-components";
import { type MenuOptionGroup, type MenuOption } from "@/lib/api/menuService";

interface OptionGroupProps {
  group: MenuOptionGroup;
  selectedOptionIds: string[];
  onOptionSelect: (option: MenuOption | null) => void;
}

export default function OptionGroup({
  group,
  selectedOptionIds,
  onOptionSelect,
}: OptionGroupProps) {
  const isSingleSelect = group.maxSelections === 1;
  const canSelectMore = selectedOptionIds.length < group.maxSelections;

  const handleOptionClick = (option: MenuOption) => {
    if (isSingleSelect) {
      // 단일 선택: 선택/해제 토글
      const isCurrentlySelected = selectedOptionIds.includes(option.id);
      onOptionSelect(isCurrentlySelected ? null : option);
    } else {
      // 다중 선택
      const isCurrentlySelected = selectedOptionIds.includes(option.id);

      if (isCurrentlySelected) {
        // 이미 선택된 경우: 선택 해제
        onOptionSelect(option);
      } else if (canSelectMore) {
        // 선택 가능한 경우: 선택 추가
        onOptionSelect(option);
      }
      // 최대 개수 도달 시 아무것도 하지 않음
    }
  };

  const handleNoneSelect = () => {
    onOptionSelect(null);
  };

  return (
    <>
      <SectionTitle>
        {group.name}
        {group.isRequired ? (
          <RequiredBadge>필수</RequiredBadge>
        ) : (
          <OptionalBadge>선택</OptionalBadge>
        )}
        {group.maxSelections > 1 && (
          <MaxSelectionInfo>
            (최대 {group.maxSelections}개 • {selectedOptionIds.length}/{group.maxSelections})
          </MaxSelectionInfo>
        )}
      </SectionTitle>

      <List>
        {/* 필수가 아닌 경우 '선택 안함' 옵션 추가 */}
        {!group.isRequired && (
          <Row $selected={selectedOptionIds.length === 0} onClick={handleNoneSelect}>
            {isSingleSelect ? (
              <Radio $checked={selectedOptionIds.length === 0}>
                {selectedOptionIds.length === 0 && <RadioDot />}
              </Radio>
            ) : (
              <Checkbox $checked={selectedOptionIds.length === 0}>
                {selectedOptionIds.length === 0 && "✓"}
              </Checkbox>
            )}
            <RowInfo>
              <RowTitle>선택 안함</RowTitle>
            </RowInfo>
          </Row>
        )}

        {group.options.map((option) => {
          const isSelected = selectedOptionIds.includes(option.id);
          const isDisabled = !isSelected && !canSelectMore && !isSingleSelect;

          return (
            <Row
              key={option.id}
              $selected={isSelected}
              $disabled={isDisabled}
              onClick={() => !isDisabled && handleOptionClick(option)}
            >
              {isSingleSelect ? (
                <Radio $checked={isSelected}>{isSelected && <RadioDot />}</Radio>
              ) : (
                <Checkbox $checked={isSelected}>{isSelected && "✓"}</Checkbox>
              )}
              <RowInfo>
                <RowTitle $disabled={isDisabled}>{option.name}</RowTitle>
                {option.price > 0 && (
                  <RowPrice $disabled={isDisabled}>+₩{option.price.toLocaleString()}</RowPrice>
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

const OptionalBadge = styled.span`
  background: #6b7280;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
`;

const MaxSelectionInfo = styled.span`
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  margin-left: 4px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div<{ $selected?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${(props) => (props.$selected ? "#f97316" : "#e5e7eb")};
  border-radius: 12px;
  background: ${(props) => (props.$selected ? "#fff7ed" : "#fff")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.$disabled ? "#e5e7eb" : "#f97316")};
    background: ${(props) => (props.$disabled ? "#fff" : "#fff7ed")};
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

const Checkbox = styled.div<{ $checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid ${(p) => (p.$checked ? "#f97316" : "#d1d5db")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$checked ? "#f97316" : "#fff")};
  color: white;
  font-size: 12px;
  font-weight: 800;
  margin-right: 12px;
  flex-shrink: 0;
`;

const RowInfo = styled.div`
  flex: 1;
`;

const RowTitle = styled.div<{ $disabled?: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.$disabled ? "#9ca3af" : "#1f2937")};
`;

const RowPrice = styled.div<{ $disabled?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$disabled ? "#d1d5db" : "#f97316")};
  font-weight: 700;
  margin-top: 4px;
`;
