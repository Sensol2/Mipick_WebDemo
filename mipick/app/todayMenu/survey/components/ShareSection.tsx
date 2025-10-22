import styled from "styled-components";
import { useKakaoSDK } from "../hooks/useKakaoSDK";
import { useMyInviteCode } from "../hooks/useMyInviteCode";
import { useMyTicketCount } from "../hooks/useMyTicketCount";
import { shareToKakao } from "../utils/kakaoShare";

interface ShareSectionProps {
  onSkip: () => void;
}

export default function ShareSection({ onSkip }: ShareSectionProps) {
  const { isInitialized } = useKakaoSDK();
  const { inviteCode, loading: inviteCodeLoading } = useMyInviteCode();
  const { ticketCount, loading: ticketLoading } = useMyTicketCount();

  const handleKakaoShare = () => {
    if (!isInitialized) {
      alert("카카오톡 공유 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 카카오톡 공유 실행
    shareToKakao({
      title: "Mipick 무료 점심 이벤트",
      description: `설문 참여하고 무료 점심 받자! 추천인 코드: ${inviteCode}`,
      imageUrl: `${window.location.origin}/character.png`,
      linkUrl: `${window.location.origin}/todayMenu/survey?ref=${inviteCode}`,
      buttonText: "참여하기",
    });
  };

  const handleSystemShare = async () => {
    const shareData = {
      title: "Mipick 무료 점심 이벤트",
      text: `Mipick 무료 점심 이벤트에 참여하세요! 추천인 코드: ${inviteCode}`,
      url: `${window.location.origin}/todayMenu/survey?ref=${inviteCode}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Web Share API를 지원하지 않는 경우 URL 복사
        await navigator.clipboard.writeText(shareData.url);
        alert("이 브라우저는 공유 기능을 지원하지 않아 링크가 복사되었습니다!");
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우
      console.log("Share cancelled:", error);
    }
  };

  const handleLinkCopy = async () => {
    const url = `${window.location.origin}/todayMenu/survey`;
    
    try {
      await navigator.clipboard.writeText(url);
      alert("추천인 코드가 포함된 링크가 복사되었습니다!");
    } catch {
      // clipboard API 실패 시 fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand("copy");
        alert("추천인 코드가 포함된 링크가 복사되었습니다!");
      } catch {
        alert("링크 복사에 실패했습니다.");
      }
      
      document.body.removeChild(textArea);
    }
  };
  return (
    <Container>
      <ProgressBar>
        <ProgressFill width="100%" />
      </ProgressBar>

      <CongratsBadge>설문조사 완료</CongratsBadge>
      
      <Title>소중한 응답 감사합니다!</Title>
      <Description>
        더 나은 서비스를 만들기 위해 노력하겠습니다.
      </Description>
      
      <TicketDisplay>
        <TicketIcon>🎟️</TicketIcon>
        <TicketCount>현재 보유 추첨권: {ticketLoading ? "-" : ticketCount}장</TicketCount>
      </TicketDisplay>


      <ReferralCodeSection>
        <ReferralCodeLabel>내 추천인 코드</ReferralCodeLabel>
        <ReferralCodeBox
          onClick={() => {
            if (inviteCode) {
              navigator.clipboard.writeText(inviteCode);
              alert("추천인 코드가 복사되었습니다!");
            }
          }}
        >
          <ReferralCode>
            {inviteCodeLoading ? "-" : inviteCode || "코드 없음"}
          </ReferralCode>
        </ReferralCodeBox>
        <ReferralCodeHint>
          코드를 클릭하면 복사돼요!
        </ReferralCodeHint>
      </ReferralCodeSection>

      <ShareButtons>
        <ShareButton color="#FEE500" onClick={handleKakaoShare}>
          <ShareIcon>💬</ShareIcon>
          카카오톡 공유
        </ShareButton>
        <ShareButton color="#10B981" onClick={handleSystemShare}>
          <ShareIcon>�</ShareIcon>
          기타 공유하기
        </ShareButton>
        <ShareButton color="#4285F4" onClick={handleLinkCopy}>
          <ShareIcon>🔗</ShareIcon>
          링크 복사
        </ShareButton>
      </ShareButtons>

      <SkipButton onClick={onSkip}>
        메뉴 보러가기 →
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

// 추천인 코드 섹션
const ReferralCodeSection = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%);
  border: 2px dashed #FF6B35;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const ReferralCodeLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const ReferralCodeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ReferralCode = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #FF6B35;
  letter-spacing: 6px;
  text-align: center;
`;

const ReferralCodeHint = styled.div`
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  text-align: center;
`;
