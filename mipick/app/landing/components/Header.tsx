"use client"

import styled from "styled-components"
import Container from "@/app/landing/components/ui/Container"
import { Button } from "@/app/landing/components/ui/Button"

const Bar = styled.header`
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.8);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
`

const Row = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
`

const Nav = styled.nav`
  display: none; gap: 16px; align-items: center;
  a { font-weight: 600; color: ${({ theme }) => theme.colors.textSecondary}; }
  @media (min-width: 768px) { display: flex; }
`

const Logo = styled.div`
  display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 18px;
  svg { width: 22px; height: 22px; }
`

export default function Header(){
  return (
    <Bar>
      <Container>
        <Row>
          <Logo>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="3" stroke="#FF6B35" strokeWidth="2"/>
              <path d="M3 10h18" stroke="#FF6B35" strokeWidth="2"/>
            </svg>
            MiPick
          </Logo>
          <Nav>
            <a href="#howitworks">이용방법</a>
            <a href="#features">특징</a>
            <a href="#stations">픽업 스테이션</a>
            <a href="#faq">FAQ</a>
          </Nav>
          <Button as="a" href="#cta">앱 알림받기</Button>
        </Row>
      </Container>
    </Bar>
  )
}