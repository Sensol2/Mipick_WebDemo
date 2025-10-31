"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import Container from "@/app/landing/components/ui/Container";
import { useAuth, signOut } from "@/app/hooks/auth";
import { MdFastfood } from "react-icons/md";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Nav = styled.nav`
  display: none;
  gap: 16px;
  align-items: center;
  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 18px;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const AuthButton = styled.button`
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutralGray};
    border-color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await signOut();
      router.refresh();
    } else {
      router.push("/auth");
    }
  };

  return (
    <Bar>
      <Container>
        <Row>
          <Logo>
            <MdFastfood size={22} color="#FF6B35" />
            MiPick
          </Logo>
          <Nav>
            <a href="#howitworks">이용방법</a>
            <a href="#features">특징</a>
            <a href="#stations">픽업 스테이션</a>
            <a href="#faq">FAQ</a>
          </Nav>
          <AuthButton onClick={handleAuth} disabled={loading}>
            {loading ? "..." : isAuthenticated ? "로그아웃" : "로그인"}
          </AuthButton>
        </Row>
      </Container>
    </Bar>
  );
}
