import { useState } from "react";
import styled from "styled-components";

interface SurveySectionProps {
  formData: {
    name: string;
    phone: string;
    gender: string;
    affiliation: string;
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
  const totalPages = 3;

  const handleNext = () => {
    // 현재 페이지 필수 항목 검증
    if (currentPage === 1) {
      if (!formData.name || !formData.phone || !formData.gender || !formData.affiliation) {
        alert("모든 필수 항목을 입력해주세요!");
        return;
      }
    } else if (currentPage === 2) {
      if (!formData.foodType || !formData.priceRange || !formData.location || !formData.frequency) {
        alert("모든 필수 항목을 선택해주세요!");
        return;
      }
    }
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFinalSubmit = () => {
    // 마지막 페이지 필수 항목 검증
    if (!formData.knowPath || !formData.satisfaction) {
      alert("모든 필수 항목을 입력해주세요!");
      return;
    }
    onSubmit();
  };

  return (
    <Container>
      <ProgressBar>
        <ProgressFill width={`${(currentPage / totalPages) * 100}%`} />
      </ProgressBar>

      <PageIndicator>{currentPage} / {totalPages}</PageIndicator>

      {/* 페이지 1: 기본 정보 */}
      {currentPage === 1 && (
        <PageContent>
          <Title>기본 정보를 입력해주세요</Title>
          <Subtitle>간단한 정보만 입력하면 돼요 ✨</Subtitle>

          <Form>
            <FormSection>
              <Label>이름 *</Label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={(e) => onFormChange("name", e.target.value)}
              />
            </FormSection>

            <FormSection>
              <Label>전화번호 *</Label>
              <Input
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => onFormChange("phone", e.target.value)}
              />
            </FormSection>

            <FormSection>
              <Label>성별 *</Label>
              <RadioGroup>
                {["남성", "여성"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.gender === option}
                    onClick={() => onFormChange("gender", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>소속 *</Label>
              <RadioGroup>
                {["대학생", "대학원생", "교직원", "일반인"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.affiliation === option}
                    onClick={() => onFormChange("affiliation", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>
          </Form>
        </PageContent>
      )}

      {/* 페이지 2: 식사 선호도 */}
      {currentPage === 2 && (
        <PageContent>
          <Title>평소 점심 식사 패턴을 알려주세요</Title>
          <Subtitle>선호하는 스타일을 선택해주세요 🍽️</Subtitle>

          <Form>
            <FormSection>
              <Label>평소 선호하는 음식 종류는? *</Label>
              <RadioGroup>
                {["🍚 한식", "🍝 양식", "🍣 일식", "🥗 기타"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.foodType === option}
                    onClick={() => onFormChange("foodType", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>점심 평균 가격대는? *</Label>
              <RadioGroup>
                {["5천원 미만", "5천~7천원", "7천~1만원", "1만원 이상"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.priceRange === option}
                    onClick={() => onFormChange("priceRange", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>점심을 주로 어디서 해결하시나요? *</Label>
              <RadioGroup>
                {["학교 식당", "근처 식당", "편의점", "배달"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.location === option}
                    onClick={() => onFormChange("location", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>일주일에 몇 번 외식하시나요? *</Label>
              <RadioGroup>
                {["거의 매일", "주 3~4회", "주 1~2회", "거의 안 함"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.frequency === option}
                    onClick={() => onFormChange("frequency", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>
          </Form>
        </PageContent>
      )}

      {/* 페이지 3: 서비스 피드백 */}
      {currentPage === 3 && (
        <PageContent>
          <Title>Mipick 서비스에 대해 알려주세요</Title>
          <Subtitle>소중한 의견 감사합니다 💚</Subtitle>

          <Form>
            <FormSection>
              <Label>Mipick을 어떻게 알게 되셨나요? *</Label>
              <RadioGroup>
                {["친구 추천", "SNS", "검색", "광고"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.knowPath === option}
                    onClick={() => onFormChange("knowPath", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>서비스 만족도는? *</Label>
              <RadioGroup>
                {["매우 만족", "만족", "보통", "불만족"].map((option) => (
                  <RadioOption
                    key={option}
                    selected={formData.satisfaction === option}
                    onClick={() => onFormChange("satisfaction", option)}
                  >
                    {option}
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormSection>

            <FormSection>
              <Label>개선사항이나 의견 (선택)</Label>
              <TextArea
                placeholder="자유롭게 의견을 남겨주세요"
                value={formData.improvements}
                onChange={(e) => onFormChange("improvements", e.target.value)}
                rows={4}
              />
            </FormSection>
          </Form>

          <PrivacyNote>
            🔒 입력하신 개인정보는 본 이벤트 당첨자 발표 및 안내 용도로만 사용됩니다.
          </PrivacyNote>
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
