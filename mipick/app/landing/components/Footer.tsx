"use client";

import styled from "styled-components";
import Container from "@/app/landing/components/ui/Container";
import { MdFastfood } from "react-icons/md";

const Bar = styled.footer`
  margin-top: 40px;
  padding: 24px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const Row = styled.div`
  display: grid;
  gap: 10px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const Links = styled.nav`
  display: flex;
  gap: 16px;
  a {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 16px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function Footer() {
  return (
    <Bar>
      <Container>
        <Row>
          <Logo>
            <MdFastfood size={18} color="#FF6B35" />
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
  );
}
