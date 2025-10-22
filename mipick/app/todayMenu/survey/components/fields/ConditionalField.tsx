import styled from "styled-components";
import type { ChildQuestion } from "./types";
import SingleChoiceField from "./SingleChoiceField";
import MultipleChoiceField from "./MultipleChoiceField";
import LikertField from "./LikertField";
import LikertGroupField from "./LikertGroupField";

export interface ChildrenRendererProps {
  childQuestions: ChildQuestion[];
  parentValue: string; // 부모 질문의 현재 값 (single) 또는 comma-separated (multiple)
  formData: Record<string, string>;
  onFormChange: (field: string, value: string) => void;
}

export default function ChildrenRenderer({
  childQuestions,
  parentValue,
  formData,
  onFormChange,
}: ChildrenRendererProps) {
  // parentValue가 multiple인 경우 배열로 변환
  // MultipleChoiceField에서 사용하는 구분자에 맞춰 split
  const parentValues = parentValue
    ? parentValue.split("|||").map((v) => v.trim()).filter(Boolean)
    : [];

  const renderChildQuestion = (child: ChildQuestion): React.ReactNode => {
    const value = child.id ? (formData[child.id] || "") : "";
    const onChange = (val: string) => {
      if (child.id) {
        onFormChange(child.id, val);
      }
    };

    switch (child.type) {
      case "single":
        return (
          <SingleChoiceField
            options={child.options || []}
            value={value}
            onChange={onChange}
          />
        );
      case "multiple":
        return (
          <MultipleChoiceField
            options={child.options || []}
            value={value}
            onChange={onChange}
          />
        );
      case "likert":
        return (
          <LikertField
            scale={child.scale || 5}
            anchors={child.anchors}
            value={value}
            onChange={onChange}
          />
        );
      case "likertGroup":
        return (
          <LikertGroupField
            items={child.items || []}
            scale={child.scale || 5}
            anchors={child.anchors}
            formData={formData}
            onChange={onFormChange}
          />
        );
      case "text":
      case "tel":
        return (
          <Input
            type={child.type}
            placeholder={child.placeholder || ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "textarea":
        return (
          <TextArea
            placeholder={child.placeholder || ""}
            value={value}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {childQuestions.map((child, index) => {
        // parentOption이 parentValue(s)에 포함되는지 확인
        const shouldShow =
          parentValue === child.parentOption || // single 케이스
          parentValues.includes(child.parentOption); // multiple 케이스

        if (!shouldShow) return null;

        // 고유한 키 생성 (id가 있으면 사용, 없으면 index 사용)
        const uniqueKey = child.id || `${child.parentOption}-${index}`;

        return (
          <ChildContainer key={uniqueKey}>
            {child.label && child.type !== "likertGroup" && <ChildLabel>{child.label}</ChildLabel>}
            {child.type === "likertGroup" && child.label && <GroupHeader>{child.label}</GroupHeader>}
            {renderChildQuestion(child)}

            {/* 재귀: 하위 children이 있으면 다시 렌더링 */}
            {child.children && child.children.length > 0 && (
              <ChildrenRenderer
                childQuestions={child.children}
                parentValue={child.id ? formData[child.id] || "" : ""}
                formData={formData}
                onFormChange={onFormChange}
              />
            )}
          </ChildContainer>
        );
      })}
    </>
  );
}

const ChildContainer = styled.div`
  margin: 30px 0;
  padding-left: 20px;
  border-left: 3px solid #FF6B35;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ChildLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

const GroupHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0e0e0;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }

  &::placeholder {
    color: #aaa;
  }
`;

