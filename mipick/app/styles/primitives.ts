import styled from "styled-components";

// App-wide layout primitives to keep page structures consistent

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Sheet = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #fed7aa;
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ea580c;
  font-weight: bold;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #ea580c;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
