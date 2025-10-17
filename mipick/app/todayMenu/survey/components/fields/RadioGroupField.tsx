import styled from "styled-components";

export interface RadioGroupFieldProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RadioGroupField({ options, value, onChange }: RadioGroupFieldProps) {
  const needsSingleColumn = (options || []).some((opt) => (opt || "").length > 12);
  return (
    <RadioGroup columns={needsSingleColumn ? 1 : 2}>
      {options.map((option) => (
        <RadioOption
          key={option}
          selected={value === option}
          onClick={() => onChange(option)}
          role="radio"
          aria-checked={value === option}
        >
          {option}
        </RadioOption>
      ))}
    </RadioGroup>
  );
}

const RadioGroup = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns ?? 2}, 1fr);
  gap: 12px;
`;

const RadioOption = styled.div<{ selected: boolean }>`
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
