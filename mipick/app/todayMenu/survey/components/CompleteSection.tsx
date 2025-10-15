import styled from "styled-components";

interface CompleteSectionProps {
  tickets: number;
  onGoHome: () => void;
}

export default function CompleteSection({ tickets, onGoHome }: CompleteSectionProps) {
  return (
    <Container>
      <ProgressBar>
        <ProgressFill width="100%" />
      </ProgressBar>

      <CheckIcon>✅</CheckIcon>
      
      <Title>참여 완료!</Title>
      
      <TicketDisplay>
        <BigTicketIcon>🎟️</BigTicketIcon>
        <TicketCount>{tickets}장</TicketCount>
        <TicketLabel>최종 보유 추첨권</TicketLabel>
      </TicketDisplay>

      <AnnouncementBox>
        <AnnouncementTitle>📢 추첨 결과 발표</AnnouncementTitle>
        <AnnouncementText>
          • 일시: 12월 31일 오후 6시<br />
          • 발표 방법: 개별 문자 안내<br />
          • 당첨 인원: 총 30명
        </AnnouncementText>
      </AnnouncementBox>

      <ThankYouText>
        소중한 의견 감사합니다! 🙏<br />
        행운을 빕니다 ✨
      </ThankYouText>

      <HomeButton onClick={onGoHome}>
        메뉴 보러가기
      </HomeButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 24px 40px;
  text-align: center;
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

const CheckIcon = styled.div`
  font-size: 80px;
  margin: 40px 0 24px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 32px;
  color: #1a1a1a;
`;

const TicketDisplay = styled.div`
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  border-radius: 24px;
  padding: 48px 32px;
  margin-bottom: 32px;
  box-shadow: 0 12px 32px rgba(255, 107, 53, 0.3);
`;

const BigTicketIcon = styled.div`
  font-size: 80px;
  margin-bottom: 16px;
`;

const TicketCount = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
`;

const TicketLabel = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

const AnnouncementBox = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: left;
`;

const AnnouncementTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
`;

const AnnouncementText = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
`;

const ThankYouText = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 32px;
`;

const HomeButton = styled.button`
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
