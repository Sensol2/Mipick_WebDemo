import styled from "styled-components";

interface ShareSectionProps {
  tickets: number;
  onShare: (platform: string) => void;
  onSkip: () => void;
}

export default function ShareSection({ tickets, onShare, onSkip }: ShareSectionProps) {
  return (
    <Container>
      <ProgressBar>
        <ProgressFill width="66%" />
      </ProgressBar>

      <CongratsBadge>🎉 추첨권 1장 획득!</CongratsBadge>
      
      <Title>친구와 함께하면<br />당첨 확률이 UP! 📈</Title>
      
      <TicketDisplay>
        <TicketIcon>🎟️</TicketIcon>
        <TicketCount>현재 보유 추첨권: {tickets}장</TicketCount>
      </TicketDisplay>

      <Description>
        친구에게 공유하고 추첨권을 1장 더 받아보세요!
      </Description>

      <ShareButtons>
        <ShareButton color="#FEE500" onClick={() => onShare("kakao")}>
          <ShareIcon>💬</ShareIcon>
          카카오톡 공유
        </ShareButton>
        <ShareButton color="#E4405F" onClick={() => onShare("instagram")}>
          <ShareIcon>📷</ShareIcon>
          인스타 스토리
        </ShareButton>
        <ShareButton color="#4285F4" onClick={() => onShare("link")}>
          <ShareIcon>🔗</ShareIcon>
          링크 복사
        </ShareButton>
      </ShareButtons>

      <SkipButton onClick={onSkip}>
        나중에 할게요 →
      </SkipButton>
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

const CongratsBadge = styled.div`
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: 32px;
  color: #1a1a1a;
`;

const TicketDisplay = styled.div`
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 24px;
`;

const TicketIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const TicketCount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

const Description = styled.div`
  font-size: 15px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ShareButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const ShareButton = styled.button<{ color: string }>`
  width: 100%;
  padding: 16px;
  background: ${(props) => props.color};
  color: ${(props) => (props.color === "#FEE500" ? "#000" : "#fff")};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ShareIcon = styled.span`
  font-size: 20px;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  padding: 12px;
  
  &:hover {
    color: #666;
  }
`;
