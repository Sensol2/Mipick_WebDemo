import styled from "styled-components";

export default function HeaderSection() {
  return (
    <>
      <HeaderWrapper>
        <TopRow>
          <Date>2025-10-30</Date>
          <Subscribe>구독하기</Subscribe>
        </TopRow>

        <Divider />

        <Subtitle>점심 읽어주는 남자</Subtitle>

        <Divider />
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.md};
`;

const Subscribe = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #868581;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: #3d3a37;
  margin: 0;
`;
