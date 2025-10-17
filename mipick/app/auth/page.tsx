"use client"

import styled from 'styled-components'
import { useEffect } from 'react'
import { signInWithKakao } from '@/lib/auth/kakaoService'
import { signInWithGoogle } from '@/lib/auth/googleService'

export default function AuthPage() {

  const handleKakaoLogin = async () => {
    console.log('카카오 로그인')
    await signInWithKakao();
  }

  const handleNaverLogin = () => {
    // 네이버 로그인 로직 구현
    console.log('네이버 로그인')
  }

  const handleGoogleLogin = async () => {
    // 구글 로그인 로직 구현
    console.log('구글 로그인')
    await signInWithGoogle();
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>로그인</Title>
        <Subtitle>간편하게 로그인하고 서비스를 이용해보세요</Subtitle>
        
        <SocialButtonsContainer>
          <KakaoButton onClick={handleKakaoLogin}>
            <KakaoIcon />
            카카오로 로그인
          </KakaoButton>
          
          <NaverButton onClick={handleNaverLogin}>
            <NaverIcon />
            네이버로 로그인
          </NaverButton>
          
          <GoogleButton onClick={handleGoogleLogin}>
            <GoogleIcon />
            Google로 로그인
          </GoogleButton>
        </SocialButtonsContainer>
      </AuthCard>
    </AuthContainer>
  )
}


const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  padding: 20px;
`

const AuthCard = styled.div`
  background: white;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 40px 0;
`

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

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
`

const KakaoButton = styled(SocialButtonBase)`
  background-color: #FEE500;
  color: #3A1D1D;

  &:hover {
    background-color: #FDD835;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`

const NaverButton = styled(SocialButtonBase)`
  background-color: #03C75A;

  &:hover {
    background-color: #02B351;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`

const GoogleButton = styled(SocialButtonBase)`
  background-color: #4285F4;

  &:hover {
    background-color: #3367D6;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`


// 소셜 로그인 아이콘 SVG 컴포넌트들
const KakaoIcon = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.03 3 3 6.58 3 11.09C3 14.28 5.07 17.1 8.11 18.5L7.13 21.58C7.05 21.83 7.33 22.03 7.54 21.87L11.31 19.32C11.54 19.34 11.77 19.35 12 19.35C16.97 19.35 21 15.77 21 11.26C21 6.75 16.97 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
)

const NaverIcon = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.273 12.845L7.376 0H0V24H7.727V11.155L16.624 24H24V0H16.273V12.845Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
)

const GoogleIcon = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
        fill="currentColor"
      />
      <path
        d="M12 23C15.24 23 17.95 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.58 12 18.58C8.88 18.58 6.22 16.64 5.35 13.85H1.64V16.69C2.96 19.31 7.24 23 12 23Z"
        fill="currentColor"
      />
      <path
        d="M5.35 13.85C5.13 13.2 5 12.51 5 11.8C5 11.09 5.13 10.4 5.34 9.75V6.91H1.64C0.928 8.33 0.5 9.93 0.5 11.6C0.5 13.27 0.928 14.87 1.64 16.29L5.35 13.85Z"
        fill="currentColor"
      />
      <path
        d="M12 5.02C13.62 5.02 15.06 5.58 16.18 6.64L19.38 3.44C17.94 2.09 16.04 1.27 12 1.27C7.24 1.27 2.96 4.96 1.64 7.58L5.35 10.42C6.22 7.63 8.88 5.69 12 5.69V5.02Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
)