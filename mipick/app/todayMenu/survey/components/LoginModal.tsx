"use client";

import styled from "styled-components";
import { signInWithKakao } from "../../../../lib/auth/kakaoService";
import { signInWithGoogle } from "../../../../lib/auth/googleService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  const handleKakaoLogin = async () => {
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/todayMenu/survey?postLogin=1`
        : undefined;
    await signInWithKakao(redirectTo);
  };

  const handleGoogleLogin = async () => {
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/todayMenu/survey?postLogin=1`
        : undefined;
    await signInWithGoogle(redirectTo);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <Icon>🎫</Icon>
        <Title>설문 제출을 위해 로그인해주세요!</Title>
        <Description>
          간편 로그인을 통해 설문을 제출하고
          <br />
          보상을 받아보세요
        </Description>

        <ButtonGroup>
          <KakaoButton onClick={handleKakaoLogin}>
            <KakaoIcon />
            카카오로 로그인
          </KakaoButton>

          <GoogleButton onClick={handleGoogleLogin}>
            <GoogleIcon />
            Google로 로그인
          </GoogleButton>

          <SkipButton onClick={onClose}>취소</SkipButton>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
}

// ========== Styled Components ==========
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  color: #9ca3af;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  line-height: 1;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

const Icon = styled.div`
  font-size: 56px;
  text-align: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin: 0 0 28px 0;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButtonBase = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const KakaoButton = styled(SocialButtonBase)`
  background: #fee500;
  color: #3a1d1d;

  &:hover {
    background: #ffd600;
  }
`;

const GoogleButton = styled(SocialButtonBase)`
  background: #4285f4;
  color: white;

  &:hover {
    background: #3367d6;
  }
`;

const SkipButton = styled.button`
  width: 100%;
  height: 44px;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    color: #374151;
  }
`;

const IconWrapper = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// 카카오 아이콘
const KakaoIcon = () => (
  <IconWrapper>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.03 3 3 6.58 3 11.09C3 14.28 5.07 17.1 8.11 18.5L7.13 21.58C7.05 21.83 7.33 22.03 7.54 21.87L11.31 19.32C11.54 19.34 11.77 19.35 12 19.35C16.97 19.35 21 15.77 21 11.26C21 6.75 16.97 3 12 3Z"
      />
    </svg>
  </IconWrapper>
);

// 구글 아이콘
const GoogleIcon = () => (
  <IconWrapper>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" />
      <path d="M12 23C15.24 23 17.95 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.58 12 18.58C8.88 18.58 6.22 16.64 5.35 13.85H1.64V16.69C2.96 19.31 7.24 23 12 23Z" />
      <path d="M5.35 13.85C5.13 13.2 5 12.51 5 11.8C5 11.09 5.13 10.4 5.34 9.75V6.91H1.64C0.928 8.33 0.5 9.93 0.5 11.6C0.5 13.27 0.928 14.87 1.64 16.29L5.35 13.85Z" />
      <path d="M12 5.02C13.62 5.02 15.06 5.58 16.18 6.64L19.38 3.44C17.94 2.09 16.04 1.27 12 1.27C7.24 1.27 2.96 4.96 1.64 7.58L5.35 10.42C6.22 7.63 8.88 5.69 12 5.69V5.02Z" />
    </svg>
  </IconWrapper>
);
