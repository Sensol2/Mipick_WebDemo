"use client"

import styled from "styled-components"

const Shell = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
`

export default function Container({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Shell id={id}>{children}</Shell>
}