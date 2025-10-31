import styled from "styled-components";
import { useKakaoSDK } from "../hooks/useKakaoSDK";
import { shareToKakao } from "../utils/kakaoShare";
import { useRouter } from "next/navigation";
import { RiKakaoTalkFill } from "react-icons/ri";
import { IoShareSocial, IoLink } from "react-icons/io5";
import { FaInstagram, FaHome } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function ShareSection() {
  const { isInitialized } = useKakaoSDK();
  const router = useRouter();
  const handleKakaoShare = () => {
    if (!isInitialized) {
      alert("카카오톡 공유 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    shareToKakao({
      title: "Mipick 설문조사 참여하기",
      description:
        "미리 주문하면, 맛집이 학교 앞으로! Mipick 서비스 개발을 위한 설문조사에 참여해주세요.",
      imageUrl: `${window.location.origin}/character.png`,
      linkUrl: `${window.location.origin}/todayMenu/survey`,
      buttonText: "설문 참여하기",
    });
  };

  const handleSystemShare = async () => {
    const shareData = {
      title: "Mipick 설문조사 참여하기",
      text: "미리 주문하면, 맛집이 학교 앞으로! Mipick 서비스 개발을 위한 설문조사에 참여해주세요.",
      url: `${window.location.origin}/todayMenu/survey`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("이 브라우저는 공유 기능을 지원하지 않아 링크가 복사되었습니다!");
      }
    } catch (error) {
      console.log("Share cancelled:", error);
    }
  };

  const handleLinkCopy = async () => {
    const url = `${window.location.origin}/todayMenu/survey`;

    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        alert("링크가 복사되었습니다!");
      } catch {
        alert("링크 복사에 실패했습니다.");
      }

      document.body.removeChild(textArea);
    }
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/mipik_ssu", "_blank");
  };

  const handleHomePageVisit = () => {
    router.push("/");
  };

  return (
    <Container>
      <ContentWrapper>
        <HeaderSection>
          <CompleteBadge>
            <IoCheckmarkCircle /> 설문조사 완료
          </CompleteBadge>

          <MainTitle>
            설문에 참여해주셔서
            <br />
            감사합니다!
          </MainTitle>
        </HeaderSection>

        <VisualSection>
          <CharacterWrapper>
            <CharacterImage src={"/character2.png"} alt="감사 캐릭터" />
          </CharacterWrapper>
        </VisualSection>

        <MessageSection>
          <ThankYouMessage>
            여러분의 소중한 응답은
            <br />
            미픽이 더 나은 서비스를 개발하는 데에
            <br />큰 도움이 됩니다
          </ThankYouMessage>
        </MessageSection>

        <ShareActionSection>
          <ShareTitle>친구에게도 이벤트 공유하기!</ShareTitle>

          <ShareButtons>
            <ShareButton $primary onClick={handleKakaoShare}>
              <ShareIcon>
                <RiKakaoTalkFill />
              </ShareIcon>
              <ButtonText>카카오톡 공유</ButtonText>
            </ShareButton>
            <ShareButtonRow>
              <ShareButton onClick={handleSystemShare}>
                <ShareIcon>
                  <IoShareSocial />
                </ShareIcon>
                <ButtonText>기타 공유</ButtonText>
              </ShareButton>
              <ShareButton onClick={handleLinkCopy}>
                <ShareIcon>
                  <IoLink />
                </ShareIcon>
                <ButtonText>링크 복사</ButtonText>
              </ShareButton>
            </ShareButtonRow>
          </ShareButtons>
        </ShareActionSection>

        <SocialSection>
          <SocialIconButton onClick={handleInstagram} aria-label="미픽 인스타그램">
            <FaInstagram />
          </SocialIconButton>
          <SocialIconButton onClick={handleHomePageVisit} aria-label="미픽 홈페이지">
            <FaHome />
          </SocialIconButton>
        </SocialSection>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: linear-gradient(180deg, #fff5eb 0%, #ffffff 50%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
`;

const HeaderSection = styled.div`
  padding: 36px 24px 24px;
  text-align: center;
`;

const CompleteBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  letter-spacing: -0.3px;
  margin-bottom: 20px;

  svg {
    font-size: 16px;
  }
`;

const MainTitle = styled.h1`
  font-size: 30px;
  font-weight: 900;
  line-height: 1.35;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.8px;
  word-break: keep-all;
`;

const VisualSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  min-height: 200px;
`;

const CharacterWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 240px;

  &::before {
    content: "";
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

const MessageSection = styled.div`
  padding: 0 24px 24px;
  text-align: center;
`;

const ThankYouMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  color: #6b7280;
  margin: 0;
  letter-spacing: -0.3px;
  word-break: keep-all;
`;

const ShareActionSection = styled.div`
  padding: 0 20px 24px;
`;

const ShareTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const ShareButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ShareButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  background: ${(props) =>
    props.$primary ? "linear-gradient(135deg, #FEE500 0%, #FFD000 100%)" : "#FFFFFF"};
  border: 2px solid ${(props) => (props.$primary ? "#FEE500" : "#F3F4F6")};
  border-radius: 14px;
  box-shadow: ${(props) =>
    props.$primary ? "0 4px 16px rgba(254, 229, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.04)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$primary ? "0 8px 24px rgba(254, 229, 0, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.08)"};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ShareButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const ShareIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
  }
`;

const ButtonText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.3px;
`;

const SocialSection = styled.div`
  padding: 24px 20px 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

const SocialIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 2px solid #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  svg {
    font-size: 24px;
    color: #6b7280;
  }

  &:hover {
    background: #f9fafb;
    border-color: #e5e7eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    svg {
      color: #374151;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;
