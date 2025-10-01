"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"
import { Button } from "@/app/components/ui/Button"
import { Input } from "@/app/components/ui/Input"

const Wrap = styled.section`
  padding: 64px 0;
`

const Grid = styled.div`
  display: grid; gap: 20px;
`

const Title = styled.h1`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 900; color: ${({ theme }) => theme.colors.textMain};
`

const Sub = styled.p`
  font-size: 18px; color: ${({ theme }) => theme.colors.textSecondary};
`

const EmailRow = styled.form`
  margin-top: 16px; display: flex; gap: 10px;
  @media (max-width: 480px) { flex-direction: column; }
`

export default function Hero(){
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    alert(`알림 신청 완료: ${fd.get('email')}`)
    e.currentTarget.reset()
  }

  return (
    <Wrap>
      <Container>
        <Grid>
          <div>
            <Title>미리 주문하면, 맛집이 학교 앞으로</Title>
            <Sub>매일 달라지는 메뉴를 미리 고르고, 원하는 시간에 가까운 스테이션에서 간편하게 찾아가세요.</Sub>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Button as="a" href="#features">오늘 메뉴 확인</Button>
              <Button as="a" href="#cta" variant="secondary">파트너 입점 문의</Button>
            </div>
            <EmailRow onSubmit={onSubmit}>
              <Input name="email" type="email" placeholder="이메일을 입력하세요" required />
              <Button type="submit">알림 신청</Button>
            </EmailRow>
          </div>
        </Grid>
      </Container>
    </Wrap>
  )
}