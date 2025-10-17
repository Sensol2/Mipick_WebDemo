import { useEffect, useState } from "react";

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: KakaoShareSettings) => void;
    sendCustom: (settings: KakaoCustomShareSettings) => void;
  };
}

interface KakaoShareSettings {
  objectType: string;
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

interface KakaoCustomShareSettings {
  templateId: number;
  templateArgs: Record<string, string>;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

export function useKakaoSDK() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 카카오 SDK 스크립트가 이미 로드되었는지 확인
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        // TODO: 환경 변수에서 JavaScript 키 가져오기
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";
        
        if (kakaoAppKey) {
          window.Kakao.init(kakaoAppKey);
          console.log("Kakao SDK initialized");
        } else {
          console.warn("Kakao App Key is missing");
        }
      }
      setIsInitialized(true);
      return;
    }

    // 카카오 SDK 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.integrity = "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      if (window.Kakao) {
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";
        
        if (kakaoAppKey) {
          window.Kakao.init(kakaoAppKey);
          console.log("Kakao SDK loaded and initialized");
        } else {
          console.warn("Kakao App Key is missing");
        }
        setIsInitialized(true);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Kakao SDK");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: 스크립트 제거 (선택사항)
      const existingScript = document.querySelector('script[src*="kakao"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return { isInitialized, Kakao: window.Kakao };
}
