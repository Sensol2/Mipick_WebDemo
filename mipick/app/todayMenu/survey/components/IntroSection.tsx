import styled from "styled-components";
import { useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { BiSolidCoffee, BiSolidGift } from "react-icons/bi";

interface IntroSectionProps {
  onStart: () => void;
  hasParticipated: boolean;
  isLoading: boolean;
}

export default function IntroSection({ onStart, hasParticipated, isLoading }: IntroSectionProps) {
  const [expandedCard, setExpandedCard] = useState<'survey' | 'beta' | null>(null);

  const toggleCard = (card: 'survey' | 'beta') => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <Container>
      <ContentWrapper>
        <HeaderSection>
          <BadgeWrapper>
            <EventBadge>설문 이벤트</EventBadge>
          </BadgeWrapper>
          
          <MainTitle>
            설문 참여하고<br />
            <Highlight>커피 기프티콘</Highlight> 받아가세요!
          </MainTitle>

          <EventPeriod>
            <ClockIcon><MdAccessTime /></ClockIcon>
            <span>이벤트 기간: 11월 19일 23시 59분까지</span>
          </EventPeriod>
        </HeaderSection>

        <VisualSection>
          <CharacterWrapper>
            <CharacterImage src={"/character.png"} alt="설문 참여 캐릭터" />
          </CharacterWrapper>
        </VisualSection>

        <BenefitsSection>
          <SectionTitle>참여 혜택</SectionTitle>
          
          <BenefitCards>
            <AccordionCard 
              $expanded={expandedCard === 'survey'}
              onClick={() => toggleCard('survey')}
            >
              <CardHeader>
                <IconWrapper><BiSolidCoffee /></IconWrapper>
                <CardContent>
                  <CardTitle>설문 참여</CardTitle>
                  <CardReward>커피 기프티콘</CardReward>
                </CardContent>
                <ToggleIcon $expanded={expandedCard === 'survey'}>
                  {expandedCard === 'survey' ? '−' : '+'}
                </ToggleIcon>
              </CardHeader>
              
              <CardDescription $expanded={expandedCard === 'survey'}>
                설문 참여 시 30명에게 추첨을 통해 지급
              </CardDescription>
            </AccordionCard>
            
            <AccordionCard 
              $expanded={expandedCard === 'beta'}
              onClick={() => toggleCard('beta')}
            >
              <CardHeader>
                <IconWrapper><BiSolidGift /></IconWrapper>
                <CardContent>
                  <CardTitle>베타 테스터 선정</CardTitle>
                  <CardReward>무료 점심 제공</CardReward>
                </CardContent>
                <ToggleIcon $expanded={expandedCard === 'beta'}>
                  {expandedCard === 'beta' ? '−' : '+'}
                </ToggleIcon>
              </CardHeader>
              
              <CardDescription $expanded={expandedCard === 'beta'}>
                사전알림 신청한 분들 중 추첨을 통해 선발, 테스터 선정 시 테스트 기간동안 무료 점심 제공
              </CardDescription>
            </AccordionCard>
          </BenefitCards>
        </BenefitsSection>

        <ActionSection>
          <StartButton onClick={onStart} disabled={hasParticipated || isLoading}>
            {isLoading 
              ? "확인 중..." 
              : hasParticipated 
                ? "이미 설문에 참여하셨습니다" 
                : "지금 바로 시작하기"
            }
          </StartButton>
        </ActionSection>
      </ContentWrapper>
    </Container>
  );
}

// ==================== Container & Layout ====================

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: linear-gradient(180deg, #FFF5EB 0%, #FFFFFF 50%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
`;

// ==================== Header Section ====================

const HeaderSection = styled.div`
  padding: 36px 24px 24px;
  text-align: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const EventBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8F5C 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.25);
  letter-spacing: -0.3px;
`;

const MainTitle = styled.h1`
  font-size: 28px;
  font-weight: 900;
  line-height: 1.35;
  color: #1F2937;
  margin: 0 0 16px 0;
  letter-spacing: -0.8px;
  word-break: keep-all;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #FF6B35 0%, #FF8F5C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #FF6B35 0%, #FF8F5C 100%);
    opacity: 0.3;
    border-radius: 2px;
  }
`;

const EventPeriod = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: rgba(255, 107, 53, 0.08);
  border-radius: 12px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

const ClockIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 16px;
    color: #FF6B35;
  }
`;

// ==================== Visual Section ====================

const VisualSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  min-height: 240px;
`;

const CharacterWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08));
`;

// ==================== Benefits Section ====================

const BenefitsSection = styled.div`
  padding: 0 20px 0px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #1F2937;
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const BenefitCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AccordionCard = styled.div<{ $primary?: boolean; $expanded?: boolean }>`
  background: ${props => props.$primary 
    ? 'linear-gradient(135deg, #FFF5EB 0%, #FFE8D6 100%)'
    : '#FFFFFF'};
  border: 2px solid ${props => props.$primary ? '#FF6B35' : '#F3F4F6'};
  border-radius: 16px;
  box-shadow: ${props => props.$primary 
    ? '0 4px 16px rgba(255, 107, 53, 0.15)'
    : '0 2px 8px rgba(0, 0, 0, 0.04)'};
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$primary 
      ? '0 8px 24px rgba(255, 107, 53, 0.2)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  
  svg {
    font-size: 24px;
    color: #FF6B35;
  }
`;

const CardContent = styled.div`
  flex: 1;
  text-align: left;
`;

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
`;

const CardReward = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #FF6B35;
  letter-spacing: -0.2px;
`;

const ToggleIcon = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 107, 53, 0.1);
  border-radius: 8px;
  font-size: 20px;
  color: #FF6B35;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;
  transform: ${props => props.$expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const CardDescription = styled.div<{ $expanded?: boolean }>`
  padding: ${props => props.$expanded ? '0 20px 18px 82px' : '0 20px 0 82px'};
  max-height: ${props => props.$expanded ? '200px' : '0'};
  opacity: ${props => props.$expanded ? '1' : '0'};
  font-size: 13px;
  line-height: 1.6;
  color: #6B7280;
  transition: all 0.3s ease;
  overflow: hidden;
`;

// ==================== Action Section ====================

const ActionSection = styled.div`
  padding: 24px 20px 32px;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8F5C 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
  letter-spacing: -0.3px;
  position: relative;
  overflow: hidden;
`;
