import styled from "styled-components";

/**
 * todayMenu 기능 전용 공통 styled-components
 * 모든 todayMenu 페이지(main, list, detail, checkout)에서 사용
 */

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Sheet = styled.div`
  background: #fff;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Header = styled.div`
  position: relative;
  padding: 18px 48px;
  text-align: center;
  border-bottom: 1px solid #ffe4cc;
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

export const HeaderSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Footer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #ffe4cc;
  background: #fffbf5;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #fff7ed;
  color: #f97316;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: #fed7aa;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #fff7ed;
  color: #f97316;
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: #fed7aa;
  }
`;
