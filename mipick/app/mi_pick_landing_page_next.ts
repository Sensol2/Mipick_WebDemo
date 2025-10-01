# Project Structure

```
mi-pick-landing/
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ .eslintrc.json
├─ .gitignore
├─ pages/
│  ├─ _app.tsx
│  ├─ _document.tsx
│  └─ index.tsx
├─ styles/
│  ├─ GlobalStyle.ts
│  └─ theme.ts
├─ components/
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ Features.tsx
│  ├─ HowItWorks.tsx
│  ├─ Fresh.tsx
│  ├─ PickupStations.tsx
│  ├─ SocialProof.tsx
│  ├─ FAQ.tsx
│  ├─ CTA.tsx
│  ├─ Footer.tsx
│  └─ ui/
│     ├─ Button.tsx
│     ├─ Card.tsx
│     ├─ Container.tsx
│     └─ Input.tsx
├─ public/
│  └─ logo.svg
```

---

## package.json
```json
{
  "name": "mi-pick-landing",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "styled-components": "6.1.8",
    "lucide-react": "0.452.0"
  },
  "devDependencies": {
    "@types/node": "20.12.7",
    "@types/react": "18.2.66",
    "@types/react-dom": "18.2.22",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "typescript": "5.4.5"
  }
}
```

---

## tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["dom", "dom.iterable", "es2021"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "types": ["styled-components-react-native"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  }
}
module.exports = nextConfig
```

---

## styles/theme.ts
```ts
export const theme = {
  colors: {
    primary: "#FF6B35",
    primaryHover: "#E85B2D",
    textMain: "#222222",
    textSecondary: "#555555",
    neutralGray: "#EEEEEE",
    cardBg: "#FFFFFF",
    inputBorder: "#CCCCCC"
  },
  layout: {
    maxWidth: "900px",
    sectionPadY: "48px"
  },
  radius: {
    button: "8px",
    card: "12px",
    input: "8px"
  },
  shadow: {
    card: "0 8px 24px rgba(0,0,0,0.06)"
  }
} as const

export type Theme = typeof theme
```

---

## styles/GlobalStyle.ts
```ts
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --orange-50: #ffedd5;
    --orange-25: #fff7ed;
  }
  html { scroll-behavior: smooth; }
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, Pretendard, Noto Sans KR, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    color: ${({ theme }) => theme.colors.textMain};
    background: linear-gradient(to bottom, var(--orange-50), #ffffff, var(--orange-25));
  }
  h1,h2,h3 { margin: 0 0 12px; line-height: 1.2; }
  p { margin: 0 0 12px; color: ${({ theme }) => theme.colors.textSecondary}; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; height: auto; display: block; }
`
```

---

## pages/_app.tsx
```tsx
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "@/styles/GlobalStyle"
import { theme } from "@/styles/theme"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

---

## pages/_document.tsx
```tsx
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

---

## pages/index.tsx
```tsx
import Head from "next/head"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Fresh from "@/components/Fresh"
import PickupStations from "@/components/PickupStations"
import SocialProof from "@/components/SocialProof"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Head>
        <title>MiPick – 미리 주문하면, 맛집이 학교 앞으로</title>
        <meta name="description" content="대학가/오피스 근처 테마 박스 사전 주문·픽업 서비스" />
      </Head>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Fresh />
        <PickupStations />
        <SocialProof />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

---

## components/ui/Container.tsx
```tsx
import styled from "styled-components"

const Shell = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
`

export default function Container({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Shell id={id}>{children}</Shell>
}
```

---

## components/ui/Button.tsx
```tsx
import styled from "styled-components"

type Variant = "primary" | "secondary"

export const Button = styled.button<{ variant?: Variant }>`
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 12px 16px;
  font-weight: 600;
  transition: background .2s ease, transform .05s ease;

  ${({ theme, variant = "primary" }) =>
    variant === "primary"
      ? `background: ${theme.colors.primary}; color: #fff;`
      : `background: ${theme.colors.neutralGray}; color: ${theme.colors.textMain};`}

  &:hover {
    ${({ theme, variant = "primary" }) =>
      variant === "primary"
        ? `background: ${theme.colors.primaryHover};`
        : `filter: brightness(0.98);`}
  }
  &:active { transform: translateY(1px); }
`
```

---

## components/ui/Card.tsx
```tsx
import styled from "styled-components"

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  border: 1px solid rgba(0,0,0,0.04);
  padding: 20px;
`
```

---

## components/ui/Input.tsx
```tsx
import styled from "styled-components"

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.input};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
  }
`
```

---

## components/Header.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

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
            <a href="#features">특징</a>
            <a href="#themes">테마 박스</a>
            <a href="#stations">픽업 스테이션</a>
            <a href="#faq">FAQ</a>
          </Nav>
          <Button as="a" href="#cta">앱 알림받기</Button>
        </Row>
      </Container>
    </Bar>
  )
}
```

---

## components/Hero.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const Wrap = styled.section`
  padding: 64px 0;
`

const Grid = styled.div`
  display: grid; gap: 20px;
  @media (min-width: 900px) { grid-template-columns: 1.2fr 0.8fr; align-items: center; }
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

const Poster = styled.div`
  height: 320px; border-radius: 16px; border: 1px dashed rgba(0,0,0,0.1);
  background: radial-gradient(circle at 30% 20%, rgba(255,107,53,0.15), transparent 60%),
              linear-gradient(135deg, #fff, #fff7ed);
  display: grid; place-items: center; color: ${({ theme }) => theme.colors.textSecondary};
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
          <Poster>히어로 이미지 / 앱 목업 영역</Poster>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/Features.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"
import { Clock, MapPin, ShieldCheck, Package } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
`

const Item = styled(Card)`
  display: grid; gap: 8px; align-content: start;
  svg { width: 24px; height: 24px; color: ${({ theme }) => theme.colors.primary}; }
  h3 { font-size: 18px; }
`

export default function Features(){
  return (
    <Wrap id="features">
      <Container>
        <Grid>
          <Item>
            <Clock />
            <h3>전날 주문</h3>
            <p>바쁜 점심 피크를 피해 전날 미리 예약.</p>
          </Item>
          <Item>
            <MapPin />
            <h3>픽업 스테이션</h3>
            <p>가까운 스테이션에서 줄 없이 바로 수령.</p>
          </Item>
          <Item>
            <Package />
            <h3>신선 포장</h3>
            <p>온도 체크·맞춤 용기로 품질 유지.</p>
          </Item>
          <Item>
            <ShieldCheck />
            <h3>안전 결제</h3>
            <p>암호화 결제와 이중 확인으로 안심.</p>
          </Item>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/HowItWorks.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"
import { ShoppingBasket, CreditCard, Store } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px; counter-reset: step;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
`

const Step = styled(Card)`
  position: relative; padding-top: 28px;
  &::before {
    counter-increment: step; content: counter(step);
    position: absolute; top: 12px; left: 12px; font-weight: 800; color: ${({ theme }) => theme.colors.primary};
  }
  display: grid; gap: 8px;
  svg { width: 24px; height: 24px; color: ${({ theme }) => theme.colors.primary}; }
`

export default function HowItWorks(){
  return (
    <Wrap>
      <Container>
        <h2 style={{ marginBottom: 12 }}>이용 방법</h2>
        <Grid>
          <Step>
            <ShoppingBasket />
            <h3>메뉴 고르기</h3>
            <p>매일 바뀌는 테마 박스 중 취향대로 선택.</p>
          </Step>
          <Step>
            <CreditCard />
            <h3>결제하기</h3>
            <p>간편 결제로 다음날 픽업 예약 완료.</p>
          </Step>
          <Step>
            <Store />
            <h3>스테이션 픽업</h3>
            <p>예약 시간에 줄 없이 바로 픽업.</p>
          </Step>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/Fresh.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: 1fr 1fr; align-items: center; }
`

const Poster = styled.div`
  height: 260px; border-radius: 12px; border: 1px dashed rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #fff, #fff7ed);
  display: grid; place-items: center; color: rgba(0,0,0,0.5);
`

export default function Fresh(){
  return (
    <Wrap>
      <Container>
        <Grid>
          <Poster>온도 체크 & 포장 이미지 영역</Poster>
          <Card>
            <h3>일관된 품질, 꼼꼼한 체크</h3>
            <p>장거리 이동에도 맛과 식감을 유지하도록 온도 로깅과 보냉/보온 용기를 사용합니다. 픽업까지 신선함을 책임집니다.</p>
          </Card>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/PickupStations.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"
import { MapPin } from "lucide-react"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: 1fr 1fr; }
`

const MapMock = styled.div`
  height: 320px; border-radius: 12px; border: 1px dashed rgba(0,0,0,0.1);
  background: repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f4f4f4 10px, #f4f4f4 20px);
  display: grid; place-items: center; color: rgba(0,0,0,0.5);
`

const List = styled.div`
  display: grid; gap: 10px;
`

const Row = styled(Card)`
  display: grid; grid-template-columns: 24px 1fr; gap: 10px; align-items: center;
  h4 { margin: 0; font-size: 16px; }
  small { color: ${({ theme }) => theme.colors.textSecondary}; }
`

const stations = [
  { name: "숭실대 7호관 앞 스테이션", addr: "서울 동작구 상도로 369", eta: "도보 2분" },
  { name: "강남 테헤란로 위워크", addr: "서울 강남구 테헤란로 142", eta: "도보 4분" },
  { name: "서강대 후문 카페", addr: "서울 마포구 백범로 35", eta: "도보 3분" },
]

export default function PickupStations(){
  return (
    <Wrap id="stations">
      <Container>
        <h2 style={{ marginBottom: 12 }}>픽업 스테이션</h2>
        <Grid>
          <MapMock>지도/캡처 이미지 영역</MapMock>
          <List>
            {stations.map((s) => (
              <Row key={s.name}>
                <MapPin style={{ width: 20, height: 20, color: "#FF6B35" }} />
                <div>
                  <h4>{s.name}</h4>
                  <small>{s.addr} · {s.eta}</small>
                </div>
              </Row>
            ))}
          </List>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/SocialProof.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Grid = styled.div`
  display: grid; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
`

const Stat = styled(Card)`
  text-align: center;
  h3 { font-size: 28px; margin-bottom: 6px; }
`

export default function SocialProof(){
  return (
    <Wrap>
      <Container>
        <Grid>
          <Stat>
            <h3>92%</h3>
            <p>초기 테스터 만족도</p>
          </Stat>
          <Stat>
            <h3>₩3,000</h3>
            <p>픽업 지연 보상 정책</p>
          </Stat>
          <Stat>
            <h3>10+</h3>
            <p>학교·기업 파일럿 진행</p>
          </Stat>
        </Grid>
      </Container>
    </Wrap>
  )
}
```

---

## components/FAQ.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Item = styled.details`
  background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06);
  padding: 16px 18px;
  summary { cursor: pointer; font-weight: 700; }
  p { margin-top: 8px; }
`

export default function FAQ(){
  return (
    <Wrap id="faq">
      <Container>
        <h2 style={{ marginBottom: 12 }}>FAQ</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <Item>
            <summary>픽업 가능 시간은 언제인가요?</summary>
            <p>대부분의 스테이션은 11:30–13:30 사이 픽업이 가능합니다. 스테이션별로 상이할 수 있어 앱에서 안내합니다.</p>
          </Item>
          <Item>
            <summary>당일 주문도 가능한가요?</summary>
            <p>기본은 전날 주문이며, 재고가 있는 경우 한정 수량 당일 주문을 제공할 수 있습니다.</p>
          </Item>
          <Item>
            <summary>환불은 어떻게 진행되나요?</summary>
            <p>픽업 전 취소는 전액 환불됩니다. 품질 이슈는 사진 첨부 후 고객센터 검토를 거쳐 보상합니다.</p>
          </Item>
        </div>
      </Container>
    </Wrap>
  )
}
```

---

## components/CTA.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const Wrap = styled.section`
  padding: ${({ theme }) => theme.layout.sectionPadY} 0;
`

const Box = styled.div`
  background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06);
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 24px; display: grid; gap: 12px; text-align: center;
`

const Title = styled.h2`
  font-size: clamp(22px, 3vw, 28px);
`

const Row = styled.form`
  display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-top: 4px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`

export default function CTA(){
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    alert(`알림 신청 완료: ${fd.get('email')}`)
    e.currentTarget.reset()
  }

  return (
    <Wrap id="cta">
      <Container>
        <Box>
          <Title>내일의 점심은 미픽에서 시작</Title>
          <p>새로운 테마 박스가 매일 업데이트됩니다. 알림을 받아보세요.</p>
          <Row onSubmit={onSubmit}>
            <Input name="email" type="email" placeholder="이메일을 입력하세요" required />
            <Button type="submit">알림 신청</Button>
          </Row>
        </Box>
      </Container>
    </Wrap>
  )
}
```

---

## components/Footer.tsx
```tsx
import styled from "styled-components"
import Container from "@/components/ui/Container"

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
```

---

## public/logo.svg
```xml
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="6" width="18" height="12" rx="3" stroke="#FF6B35" stroke-width="2"/>
  <path d="M3 10h18" stroke="#FF6B35" stroke-width="2"/>
</svg>
```

---

# Notes
- 색상/타이포/레이아웃은 명세서와 1:1로 반영했습니다.
- 반응형: 모바일 1열, 태블릿/데스크탑에서 그리드 확장.
- 상단 내비게이션, 버튼 hover, 스무스 스크롤, FAQ 아코디언(`details/summary`), 폼 제출 토스트(간단 alert) 구현.
- 아이콘은 `lucide-react` 사용(가벼움). 원치 않으면 해당 SVG를 로컬로 교체 가능.
- 설치:
  ```bash
  pnpm add next react react-dom styled-components lucide-react
  pnpm add -D typescript @types/react @types/react-dom eslint eslint-config-next
  ```
- 개발:
  ```bash
  pnpm dev
  ```
- Tailwind 미사용, 전부 styled-components로 구성.
