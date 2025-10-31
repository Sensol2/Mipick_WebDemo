"use client";

import React from "react";
import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Circle, CheckCircle } from "lucide-react";

type Option = {
  id: string;
  label: string;
};

type Props = {
  options?: Option[];
  defaultSelectedIds?: string[];
  onChange?: (selectedIds: string[]) => void;
};

const MOCK_OPTIONS: Option[] = [
  { id: "regular", label: "레귤러" },
  { id: "sizeup", label: "사이즈업 (+900원)" },
  { id: "no-cucumber", label: "오이 빼주세요" },
];

export default function OptionListSection({
  options = MOCK_OPTIONS,
  defaultSelectedIds = [],
  onChange,
}: Props) {
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set(defaultSelectedIds));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange?.(Array.from(next));
      return next;
    });
  };

  return (
    <List>
      {options.map((opt) => {
        const isSelected = selected.has(opt.id);
        return (
          <BadgeButton
            key={opt.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(opt.id)}
            $selected={isSelected}
          >
            <IconWrap aria-hidden>
              {isSelected ? <CheckCircle size={18} /> : <Circle size={18} />}
            </IconWrap>
            <span>{opt.label}</span>
          </BadgeButton>
        );
      })}
    </List>
  );
}

const List = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const BadgeButton = styled.button<{ theme: Theme; $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.sheetBackground};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadow.card};
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.05s ease;

  &:active {
    transform: translateY(1px);
  }
`;

const IconWrap = styled.span<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;
