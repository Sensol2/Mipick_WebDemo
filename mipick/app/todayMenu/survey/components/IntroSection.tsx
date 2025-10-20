import styled from "styled-components";

interface IntroSectionProps {
  onStart: () => void;
  hasParticipated: boolean;
  isLoading: boolean;
}

export default function IntroSection({ onStart, hasParticipated, isLoading }: IntroSectionProps) {
  return (
    <Container>
      <EventBadge>🎉 무료 점심 이벤트</EventBadge>
      
      <MainTitle>
        1분만 설문 참여하고<br />
        <Highlight>추첨권</Highlight> 받아가세요!
      </MainTitle>

      <EventPeriod>이벤트 기간: 11월 19일 23시 59분까지</EventPeriod>

      <BenefitCard>
        <BenefitIcon>🎟️</BenefitIcon>
        <BenefitTitle>30명에게 무료 점심 제공</BenefitTitle>
        <BenefitDesc>설문 참여만 해도 추첨권 1장 지급!</BenefitDesc>
      </BenefitCard>

      <ParticipationSteps>
        <StepItem>
          <StepIcon>📝</StepIcon>
          <StepText>간단한 설문조사 참여</StepText>
          <StepReward>🎟️ 1장</StepReward>
        </StepItem>
        <StepItem>
          <StepIcon>📤</StepIcon>
          <StepText>친구가 추천인 입력</StepText>
          <StepReward>🎟️ 1장</StepReward>
        </StepItem>
      </ParticipationSteps>

      <StartButton onClick={onStart} disabled={hasParticipated || isLoading}>
        {isLoading 
          ? "확인 중..." 
          : hasParticipated 
            ? "이미 설문에 참여하셨습니다" 
            : "지금 바로 시작하기 🚀"
        }
      </StartButton>

      {hasParticipated && (
        <ParticipatedNotice>
          ✅ 설문 참여 완료! 추첨 결과를 기다려주세요
        </ParticipatedNotice>
      )}

      <InfoText>
        * 추첨 결과는 11월 7일에 개별 문자로 안내드립니다!
      </InfoText>
    </Container>
  );
}

const Container = styled.div`
  padding: 60px 24px 40px;
  text-align: center;
`;

const EventBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EventPeriod = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 32px;
`;

const BenefitCard = styled.div`
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  border-radius: 20px;
  padding: 32px 24px;
  margin-bottom: 32px;
  color: white;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
`;

const BenefitIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const BenefitTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const BenefitDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const ParticipationSteps = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const StepIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

const StepText = styled.div`
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  text-align: left;
`;

const StepReward = styled.div`
  font-size: 13px;
  color: #FF6B35;
  font-weight: 600;
  white-space: nowrap;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #ddd;
    color: #999;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ParticipatedNotice = styled.div`
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  color: #166534;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const InfoText = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.6;
`;
