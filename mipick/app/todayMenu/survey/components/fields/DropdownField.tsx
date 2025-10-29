import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";

interface DropdownFieldProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function DropdownField({
  id,
  options,
  value,
  onChange,
  required = false,
}: DropdownFieldProps) {
  return (
    <FieldWrapper>

      <SelectWrapper>
        <Select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          $hasValue={!!value}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <IconWrapper>
          <IoChevronDown />
        </IconWrapper>
      </SelectWrapper>
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.3px;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select<{ $hasValue: boolean }>`
  width: 100%;
  padding: 14px 16px;
  padding-right: 40px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.$hasValue ? '#1f2937' : '#9ca3af'};
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  option {
    color: #1f2937;
    font-weight: 500;
  }

  option:disabled {
    color: #9ca3af;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;

  svg {
    font-size: 20px;
  }
`;
