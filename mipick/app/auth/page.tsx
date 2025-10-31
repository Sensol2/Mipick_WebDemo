"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { signInWithKakao } from "@/lib/auth/kakaoService";
import { signInWithGoogle } from "@/lib/auth/googleService";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleKakaoLogin = async () => {
    console.log("카카오 로그인");
    await signInWithKakao();
  };

  const handleGoogleLogin = async () => {
    // 구글 로그인 로직 구현
    console.log("구글 로그인");
    await signInWithGoogle();
  };

  if (!isMounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed)",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "48px",
            width: "100%",
            maxWidth: "400px",
          }}
        />
      </div>
    );
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>로그인</Title>
        <Subtitle>간편하게 로그인하고 서비스를 이용해보세요</Subtitle>

        <SocialButtonsContainer>
          <KakaoButton onClick={handleKakaoLogin}>
            <RiKakaoTalkFill size={24} />
            카카오로 로그인
          </KakaoButton>

          <GoogleButton onClick={handleGoogleLogin}>
            <FcGoogle size={24} />
            Google로 로그인
          </GoogleButton>
        </SocialButtonsContainer>
      </AuthCard>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  padding: 20px;
`;

const AuthCard = styled.div`
  background: white;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 40px 0;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SocialButtonBase = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: translateY(0);
  }
`;

const KakaoButton = styled(SocialButtonBase)`
  background-color: #fee500;
  color: #3a1d1d;

  &:hover {
    background-color: #fdd835;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

const GoogleButton = styled(SocialButtonBase)`
  background-color: #4285f4;

  &:hover {
    background-color: #3367d6;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;
