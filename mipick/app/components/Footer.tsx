"use client"

import styled from "styled-components"
import Container from "@/app/components/ui/Container"

const Bar = styled.footer`
  margin-top: 40px; padding: 24px 0; border-top: 1px solid rgba(0,0,0,0.06);
`

const Row = styled.div`
  display: grid; gap: 10px;
  @media (min-width: 700px) { grid-template-columns: 1fr auto; align-items: center; }
`

const Links = styled.nav`
  display: flex; gap: 16px; a { color: rgba(0,0,0,0.7); font-weight: 600; }
`

const Logo = styled.div`
  display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 16px;
  svg { width: 18px; height: 18px; }
`

export default function Footer(){
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
          <Links>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#cta">파트너 문의</a>
          </Links>
        </Row>
        <p style={{ marginTop: 8 }}>© {new Date().getFullYear()} MiPick. All rights reserved.</p>
      </Container>
    </Bar>
  )
}