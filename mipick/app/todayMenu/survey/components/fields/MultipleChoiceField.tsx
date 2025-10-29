import styled from "styled-components";

export interface MultipleChoiceFieldProps {
  options: string[];
  value: string; // comma separated values
  onChange: (value: string) => void;
  label?: string;
  minimum?: number; // 최소 선택 개수
  maximum?: number; // 최대 선택 개수
}

export default function MultipleChoiceField({ options, value, onChange, minimum, maximum }: MultipleChoiceFieldProps) {
  const SEPARATOR = "|||";
  const selected = new Set((value || "").split(SEPARATOR).filter(Boolean));
  
  const toggle = (opt: string) => {
    if (selected.has(opt)) {
      selected.delete(opt);
    } else {
      // 최대 개수 제한 체크
      if (maximum && selected.size >= maximum) {
        return;
      }
      selected.add(opt);
    }
    onChange(Array.from(selected).join(SEPARATOR));
  };

  // 선택 개수 검증
  const selectedCount = selected.size;
  const showMinimumWarning = minimum && selectedCount > 0 && selectedCount < minimum;
  const showMaximumWarning = maximum && selectedCount > maximum;
  
  return (
    <>
      <Group role="group">
        {options.map((option) => {
        const isOn = selected.has(option);
        return (
          <CheckboxLabel key={option}>
            <HiddenInput
              type="checkbox"
              checked={isOn}
              onChange={() => toggle(option)}
            />
            <CheckboxBox checked={isOn}>
              {isOn && (
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
          </CheckboxLabel>
        );
      })}
      </Group>
      {(showMinimumWarning || showMaximumWarning) && (
        <WarningText>
          {minimum && maximum && minimum === maximum
            ? `정확히 ${minimum}개를 선택해주세요. (현재 ${selectedCount}개 선택됨)`
            : showMinimumWarning
            ? `최소 ${minimum}개를 선택해주세요. (현재 ${selectedCount}개 선택됨)`
            : `최대 ${maximum}개까지 선택 가능합니다.`}
        </WarningText>
      )}
    </>
  );
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
`;

const HiddenInput = styled.input`
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

const WarningText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #FF6B35;
  font-weight: 500;
`;
