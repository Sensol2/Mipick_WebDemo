"use client"

import styled from "styled-components"

/**
 * Landing Page 전용 Container 컴포넌트
 * todayMenu 등 다른 기능 페이지에서는 해당 페이지의 styled-components 사용
 */

const Shell = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
`

export default function Container({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Shell id={id}>{children}</Shell>
}