"use client";

import styled from "styled-components";
import Container from "./ui/Container";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`;

const Box = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 24px;
  display: grid;
  gap: 12px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(22px, 3vw, 28px);
`;

const Row = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin-top: 4px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SurveyButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

export default function CTA() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    alert(`알림 신청 완료: ${fd.get("email")}`);
    e.currentTarget.reset();
  };

  return (
    <Wrap id="cta">
      <Container>
        <Box>
          <Title>한 끼의 즐거움, 미픽에서 시작하기</Title>
          <p>새로운 메뉴가 매일 업데이트됩니다. 알림을 받아보세요.</p>
          <Row onSubmit={onSubmit}>
            <Input name="email" type="email" placeholder="010-xxxx-xxxx" required />
            <Button type="submit">알림 신청</Button>
          </Row>
          <SurveyButton as="a" href="/todayMenu/survey" variant="secondary">
            🎟️ 설문 참여하고 무료 점심 받기
          </SurveyButton>
        </Box>
      </Container>
    </Wrap>
  );
}
