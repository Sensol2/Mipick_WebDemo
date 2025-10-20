import styled from "styled-components";
import { useEffect, useState } from "react";
import { shareToKakao } from "../utils/kakaoShare";

interface ShareSectionProps {
  tickets: number;
  onComplete: () => void;
  onSkip: () => void;
}

export default function ShareSection({ tickets, onComplete, onSkip }: ShareSectionProps) {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  // Kakao SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        setIsKakaoInitialized(true);
      } else if (window.Kakao && window.Kakao.isInitialized()) {
        setIsKakaoInitialized(true);
      }
    };

    // Kakao SDK 스크립트가 로드되었는지 확인
    if (window.Kakao) {
      initKakao();
    } else {
      // 스크립트 로드 대기
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = initKakao;
      document.body.appendChild(script);
    }
  }, []);

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const handleKakaoShare = () => {
    if (!isKakaoInitialized) {
      alert("카카오톡 공유 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 카카오톡 공유 실행
    shareToKakao({
      title: "Mipick 무료 점심 이벤트",
      description: "설문 참여하고 무료 점심 받자! 친구도 초대하면 당첨 확률 UP!",
      imageUrl: "https://your-domain.com/og-image.jpg", // TODO: 실제 이미지 URL로 교체
      linkUrl: `${window.location.origin}/todayMenu/survey`,
      buttonText: "참여하기",
    });

    // 공유 완료 처리
    handleShare("kakao");
  };

  const handleSystemShare = async () => {
    const shareData = {
      title: "Mipick 무료 점심 이벤트",
      text: "🍽️ Mipick 무료 점심 이벤트에 참여하세요! 설문 참여하고 무료 점심 받자!",
      url: `${window.location.origin}/todayMenu/survey`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        handleShare("system");
      } else {
        // Web Share API를 지원하지 않는 경우 URL 복사
        await navigator.clipboard.writeText(shareData.url);
        alert("이 브라우저는 공유 기능을 지원하지 않아 링크가 복사되었습니다! 📋");
        handleShare("system");
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
      alert("링크가 복사되었습니다! 📋");
      handleShare("link");
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
        alert("링크가 복사되었습니다! 📋");
        handleShare("link");
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
