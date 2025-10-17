import styled from "styled-components";

export interface CheckboxGroupFieldProps {
  options: string[];
  value: string; // comma separated values
  onChange: (value: string) => void;
  label?: string;
}

export default function CheckboxGroupField({ options, value, onChange }: CheckboxGroupFieldProps) {
  const selected = new Set((value || "").split(",").map((v) => v.trim()).filter(Boolean));
  const toggle = (opt: string) => {
    if (selected.has(opt)) selected.delete(opt); else selected.add(opt);
    onChange(Array.from(selected).join(","));
  };
  const needsSingleColumn = (options || []).some((opt) => (opt || "").length > 12);
  return (
    <Group columns={needsSingleColumn ? 1 : 2} role="group">
      {options.map((option) => {
        const isOn = selected.has(option);
        return (
          <Option
            key={option}
            selected={isOn}
            onClick={() => toggle(option)}
            role="checkbox"
            aria-checked={isOn}
          >
            {option}
          </Option>
        );
      })}
    </Group>
  );
}

const Group = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns ?? 2}, 1fr);
  gap: 12px;
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.selected ? "#FF6B35" : "#e0e0e0")};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: ${(props) => (props.selected ? "#FFF4E6" : "white")};
  color: ${(props) => (props.selected ? "#FF6B35" : "#666")};
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.4;
  white-space: normal;
  word-break: keep-all;

  &:hover {
    border-color: #FF6B35;
    background: #FFF4E6;
  }
`;
