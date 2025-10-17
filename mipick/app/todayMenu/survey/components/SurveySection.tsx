import { useMemo, useState } from "react";
import styled from "styled-components";
import surveyData from "../surveyData.json";

interface SurveySectionProps {
  formData: {
    name: string;
    phone: string;
    gender: string;
    affiliation: string;
    referrer: string;
    foodType: string;
    priceRange: string;
    location: string;
    frequency: string;
    knowPath: string;
    satisfaction: string;
    improvements: string;
  };
  onFormChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export default function SurveySection({ formData, onFormChange, onSubmit }: SurveySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = surveyData.pages;
  const totalPages = pages.length;

  type FormDataKeys = keyof SurveySectionProps["formData"];

  const pageConfig = useMemo(() => pages.find((p) => p.id === currentPage), [pages, currentPage]);

  const validateCurrentPage = () => {
    if (!pageConfig) return true;
    const missing = pageConfig.questions.filter((q) => {
      const key = q.id as FormDataKeys;
      const val = formData[key] as unknown as string | undefined;
      return q.required && !String(val ?? "").trim();
    });
    if (missing.length > 0) {
      alert("모든 필수 항목을 입력/선택해주세요!");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentPage()) return;
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
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

  return (
    <Container>
      <ProgressBar>
        <ProgressFill width={`${(currentPage / totalPages) * 100}%`} />
      </ProgressBar>

      <PageIndicator>{currentPage} / {totalPages}</PageIndicator>

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
                  {q.type === "text" || q.type === "tel" ? (
                    <Input
                      type={q.type}
                      placeholder={q.placeholder || ""}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  ) : q.type === "radio" ? (
                    <RadioGroup>
                      {(q.options || []).map((option) => (
                        <RadioOption
                          key={option}
                          selected={value === option}
                          onClick={() => onChange(option)}
                        >
                          {option}
                        </RadioOption>
                      ))}
                    </RadioGroup>
                  ) : q.type === "textarea" ? (
                    <TextArea
                      placeholder={q.placeholder || ""}
                      value={value}
                      rows={4}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  ) : null}
                </FormSection>
              );
            })}
          </Form>

          {pageConfig.privacyNote && (
            <PrivacyNote>{pageConfig.privacyNote}</PrivacyNote>
          )}
        </PageContent>
      )}

      {/* 네비게이션 버튼 */}
      <ButtonGroup>
        {currentPage > 1 && (
          <PrevButton onClick={handlePrev}>
            ← 이전
          </PrevButton>
        )}
        
        {currentPage < totalPages ? (
          <NextButton onClick={handleNext} fullWidth={currentPage === 1}>
            다음 →
          </NextButton>
        ) : (
          <SubmitButton onClick={handleFinalSubmit}>
            설문 제출하고 추첨권 받기 🎟️
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
  font-size: 15px;
  font-weight: 600;
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

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const RadioOption = styled.div<{ selected: boolean }>`
  padding: 14px;
  border: 2px solid ${(props) => (props.selected ? "#FF6B35" : "#e0e0e0")};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: ${(props) => (props.selected ? "#FFF4E6" : "white")};
  color: ${(props) => (props.selected ? "#FF6B35" : "#666")};
  transition: all 0.2s;

  &:hover {
    border-color: #FF6B35;
    background: #FFF4E6;
  }
`;

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
  margin-top: 16px;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrivacyNote = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  text-align: center;
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
  gap: 12px;
  margin-top: 32px;
`;

const PrevButton = styled.button`
  flex: 1;
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

const NextButton = styled.button<{ fullWidth?: boolean }>`
  flex: ${(props) => (props.fullWidth ? '1' : '2')};
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
