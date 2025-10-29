import { useMemo, useState } from "react";
import styled from "styled-components";
import surveyData from "../surveyData.json";
import SingleChoiceField from "./fields/SingleChoiceField";
import MultipleChoiceField from "./fields/MultipleChoiceField";
import LikertField from "./fields/LikertField";
import LikertGroupField from "./fields/LikertGroupField";
import ImageRatingField from "./fields/ImageRatingField";
import ImageWithDescriptionField from "./fields/ImageWithDescriptionField";
import DescriptionField from "./fields/DescriptionField";
import DropdownField from "./fields/DropdownField";
import PhoneField from "./fields/PhoneField";
import ChildrenRenderer from "./fields/ConditionalField";
import type {
  SurveyPage,
  Question,
  SingleChoiceQuestion,
  DropdownQuestion,
  MultipleChoiceQuestion,
  LikertQuestion,
  LikertGroupQuestion,
  TextQuestion,
  TextareaQuestion,
  ImageRatingQuestion,
  ImageWithDescriptionQuestion,
  DescriptionQuestion,
} from "./fields/types";

interface SurveySectionProps {
  formData: Record<string, string>;
  onFormChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export default function SurveySection({ formData, onFormChange, onSubmit }: SurveySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = surveyData.pages as unknown as SurveyPage[];
  
  // imageRating 페이지가 아닌 것만 카운트
  const totalPages = useMemo(() => {
    return pages.filter(page => 
      !page.questions.every(q => q.type === 'imageRating')
    ).length;
  }, [pages]);

  type FormDataKeys = keyof SurveySectionProps["formData"];

  const pageConfig = useMemo(() => pages.find((p) => p.id === currentPage), [pages, currentPage]);

  const validateCurrentPage = () => {
    if (!pageConfig) return true;
    
    const validateQuestions = (questions: Question[]): Question[] => {
      const missing: Question[] = [];
      
      for (const q of questions) {
        // imageRating 타입의 경우 모든 옵션이 선택되었는지 확인
        if (q.type === "imageRating" && q.required) {
          const key = q.id as FormDataKeys;
          const val = formData[key] as unknown as string | undefined;
          
          if (!val || !val.trim()) {
            missing.push(q);
          } else {
            try {
              const ratings = JSON.parse(val);
              const irq = q as ImageRatingQuestion;
              const allOptionsFilled = irq.options.every(opt => 
                ratings[opt.id] && ratings[opt.id].trim() !== ""
              );
              
              if (!allOptionsFilled) {
                missing.push(q);
              }
            } catch {
              missing.push(q);
            }
          }
          continue;
        }
        
        // 일반 질문 검증
        const key = q.id as FormDataKeys;
        const val = formData[key] as unknown as string | undefined;
        if (q.required && !String(val ?? "").trim()) {
          missing.push(q);
        }

        // children이 있는 경우 하위 질문 검증
        if (q.children && q.children.length > 0) {
          const parentValue = (formData[q.id] as string) ?? "";
          const parentValues = q.type === "multiple"
            ? parentValue.split(",").map((v) => v.trim()).filter(Boolean)
            : [parentValue];

          for (const child of q.children) {
            // 부모 옵션이 선택되었는지 확인
            if (parentValues.includes(child.parentOption)) {
              // description 타입은 검증 스킵
              if (child.type === "description") {
                continue;
              }
              
              // 하위 질문 검증
              if (child.id) {
                const childVal = (formData[child.id] as string) ?? "";
                if (child.required && !childVal.trim()) {
                  missing.push({ ...q, id: child.id, label: child.label || "" } as Question);
                }
              }
            }
          }
        }
      }
      
      return missing;
    };
    
    const missing = validateQuestions(pageConfig.questions);
    
    if (missing.length > 0) {
      alert("모든 필수 항목을 입력/선택해주세요!");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentPage()) return;
    if (currentPage < pages.length) {
      setCurrentPage((p) => p + 1);
      // 페이지 변경 후 스크롤을 최상단으로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFinalSubmit = () => {
    if (!validateCurrentPage()) return;
    onSubmit();
  };

  const renderQuestion = (q: Question, value: string, onChange: (v: string) => void) => {
    if (q.type === "description") {
      const dq = q as DescriptionQuestion;
      return (
        <DescriptionField
          label={q.label}
          content={dq.content}
        />
      );
    }
    if (q.type === "text" || q.type === "tel") {
      const tq = q as TextQuestion;
      if (q.type === "tel") {
        return (
          <PhoneField
            value={value}
            onChange={onChange}
            placeholder={tq.placeholder}
          />
        );
      }
      return (
        <Input
          type={q.type}
          placeholder={tq.placeholder || ""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    if (q.type === "single") {
      return <SingleChoiceField options={(q as SingleChoiceQuestion).options || []} value={value} onChange={onChange} />;
    }
    if (q.type === "dropdown") {
      return (
        <DropdownField
          id={q.id}
          label={q.label}
          options={(q as DropdownQuestion).options || []}
          value={value}
          onChange={onChange}
          required={q.required}
        />
      );
    }
    if (q.type === "multiple") {
      const mq = q as MultipleChoiceQuestion;
      return (
        <MultipleChoiceField
          options={mq.options || []}
          value={value}
          onChange={onChange}
          minimum={mq.minimum}
          maximum={mq.maximum}
        />
      );
    }
    if (q.type === "likert") {
      const lq = q as LikertQuestion;
      return (
        <LikertField
          scale={lq.scale || 5}
          anchors={lq.anchors}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (q.type === "likertGroup") {
      const lgq = q as LikertGroupQuestion;
      return (
        <LikertGroupField
          items={lgq.items}
          scale={lgq.scale || 5}
          anchors={lgq.anchors}
          formData={formData}
          onChange={onFormChange}
        />
      );
    }
    if (q.type === "imageRating") {
      const irq = q as ImageRatingQuestion;
      return (
        <ImageRatingField
          imageUrl={irq.imageUrl}
          questionText={irq.questionText}
          title={irq.title}
          subtitle={irq.subtitle}
          address={irq.address}
          options={irq.options}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (q.type === "imageWithDescription") {
      const iwdq = q as ImageWithDescriptionQuestion;
      return (
        <ImageWithDescriptionField
          imageUrl={iwdq.imageUrl}
          title={iwdq.title}
          subtitle={iwdq.subtitle}
        />
      );
    }
    if (q.type === "textarea") {
      const taq = q as TextareaQuestion;
      return (
        <TextArea
          placeholder={taq.placeholder || ""}
          value={value}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    return null;
  };

  return (
    <Container>
      <ProgressBar>
        <ProgressFill width={`${
          (pages.slice(0, currentPage).filter(p => !p.questions.every(q => q.type === 'imageRating')).length / totalPages) * 100
        }%`} />
      </ProgressBar>

      {/* imageRating 페이지가 아닐 때만 페이지 인디케이터 표시 */}
      {pageConfig && !pageConfig.questions.every(q => q.type === 'imageRating') && (
        <PageIndicator>
          {pages.slice(0, currentPage).filter(p => !p.questions.every(q => q.type === 'imageRating')).length} / {totalPages}
        </PageIndicator>
      )}

      {/* 현재 페이지 동적 렌더링 */}
      {pageConfig && (
        <PageContent>
          <Title>{pageConfig.title}</Title>
          {pageConfig.subtitle && <Subtitle>{pageConfig.subtitle}</Subtitle>}

          <Form>
            {pageConfig.questions.map((q) => {
              const key = q.id as FormDataKeys;
              const value = (formData[key] as unknown as string) ?? "";
              const onChange = (val: string) => onFormChange(key, val);

              return (
                <FormSection key={q.id}>
                  <Label>{q.label}</Label>
                  {renderQuestion(q, value, onChange)}
                  
                  {/* children 렌더링 */}
                  {q.children && q.children.length > 0 && (
                    <ChildrenRenderer
                      childQuestions={q.children}
                      parentValue={value}
                      formData={formData}
                      onFormChange={onFormChange}
                    />
                  )}
                </FormSection>
              );
            })}
          </Form>
        </PageContent>
      )}

      {/* 네비게이션 버튼 */}
      <ButtonGroup>        
        {currentPage < pages.length ? (
          <NextButton onClick={handleNext}>
            다음
          </NextButton>
        ) : (
          <SubmitButton onClick={handleFinalSubmit}>
            제출
          </SubmitButton>
        )}
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 24px 40px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 32px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  background: linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%);
  transition: width 0.5s ease-out;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

const Subtitle = styled.div`
  font-size: 15px;
  color: #666;
  margin-bottom: 32px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FormSection = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 800;
  color: #333;
  margin-bottom: 12px;
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

// Radio/Checkbox option styles moved into field components

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PageIndicator = styled.div`
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
  font-weight: 600;
`;

const PageContent = styled.div`
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;

const PrevButton = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #FF6B35;
    color: #FF6B35;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const NextButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
