import styled from "styled-components";

export interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneField({ value, onChange, placeholder }: PhoneFieldProps) {
  const formatPhoneNumber = (inputValue: string): string => {
    // 숫자만 추출
    const numbers = inputValue.replace(/[^\d]/g, '');
    
    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    }
    // 11자리 초과는 자르기
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      type="tel"
      placeholder={placeholder || "010-0000-0000"}
      value={value}
      onChange={handleChange}
      maxLength={13}
    />
  );
}

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }

  &::placeholder {
    color: #aaa;
  }
`;
