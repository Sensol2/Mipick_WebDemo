import styled from "styled-components";

export interface SingleChoiceFieldProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function SingleChoiceField({ options, value, onChange }: SingleChoiceFieldProps) {
  return (
    <RadioGroup>
      {options.map((option) => (
        <RadioLabel key={option}>
          <CheckboxInput
            type="radio"
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <CheckboxBox checked={value === option}>
            {value === option && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4.5 8.5L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </CheckboxBox>
          <OptionText>{option}</OptionText>
        </RadioLabel>
      ))}
    </RadioGroup>
  );
}

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CheckboxBox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 2px solid ${(props) => (props.checked ? "#FF6B35" : "#d0d0d0")};
  border-radius: 6px;
  background: ${(props) => (props.checked ? "#FF6B35" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionText = styled.span`
  font-size: 15px;
  color: #333;
  line-height: 1.5;
`;
