"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

export default function InAppBrowserDetector() {
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    // 카카오톡 인앱 브라우저 - 자동 우회
    if (userAgent.match(/kakaotalk/i)) {
      location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
      return;
    }

    // 라인 인앱 브라우저 - 자동 우회
    if (userAgent.match(/line/i)) {
      if (targetUrl.indexOf("?") !== -1) {
        location.href = `${targetUrl}&openExternalBrowser=1`;
      } else {
        location.href = `${targetUrl}?openExternalBrowser=1`;
      }
      return;
    }

    // 기타 인앱 브라우저 감지
    if (
      userAgent.match(
        /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsapp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|daumapps|daumdevice\/mobile|fb_iab|fb4a|fban|fbios|fbss|trill|samsungbrowser\/[^1]/i
      )
    ) {
      // iOS - Safari 강제 실행 불가, 안내 화면 표시
      if (userAgent.match(/iphone|ipad|ipod/i)) {
        setShowIOSGuide(true);
      } 
      // Android - Chrome으로 자동 리다이렉트
      else {
        location.href = `intent://${targetUrl.replace(/https?:\/\//i, "")}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    }
  }, []);

  const handleOpenExternalBrowser = () => {
    const targetUrl = window.location.href;

    // URL을 클립보드에 복사
    const textarea = document.createElement("textarea");
    textarea.value = targetUrl;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert(
        "URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤,\n'붙여넣기 및 이동'을 누르면 정상적으로 이용하실 수 있습니다."
      );

      // Safari 강제 실행
      location.href = "x-web-search://?";
    } catch {
      alert("클립보드 복사에 실패했습니다. 수동으로 링크를 복사해주세요.");
      document.body.removeChild(textarea);
    }
  };

  // iOS 인앱 브라우저가 아닌 경우 아무것도 표시하지 않음
  if (!showIOSGuide) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Title>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</Title>
        <Description>
          아래 버튼을 눌러 Safari를 실행해주세요<br />
          Safari가 열리면, 주소창을 길게 터치한 뒤,<br />
          '붙여놓기 및 이동'을 누르면<br />
          정상적으로 이용할 수 있습니다.
        </Description>
        <OpenButton onClick={handleOpenExternalBrowser}>
          Safari로 열기
        </OpenButton>
        <GuideImage 
          src="https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg" 
          alt="Safari로 열기 가이드"
        />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 9999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Content = styled.div`
  padding: 50px 20px 20px;
  text-align: center;
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.5;
  margin: 0 0 30px 0;
  word-break: keep-all;
`;

const Description = styled.article`
  font-size: 17px;
  color: #999;
  line-height: 1.7;
  margin: 0 0 30px 0;
  word-break: keep-all;
`;

const OpenButton = styled.button`
  min-width: 180px;
  height: 54px;
  background-color: #FF6B35;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 50px;

  &:active {
    transform: scale(0.98);
    background-color: #FF5722;
  }
`;

const GuideImage = styled.img`
  width: 70%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
`;
