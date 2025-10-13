# todayMenu Components UI

todayMenu 기능의 모든 페이지에서 공통으로 사용되는 styled-components입니다.

## 📦 포함된 컴포넌트

### Layout.tsx
모든 todayMenu 페이지에서 사용하는 공통 레이아웃 컴포넌트입니다.

**컴포넌트 목록:**
- `Page` - 전체 페이지 래퍼 (gradient 배경)
- `Sheet` - 메인 콘텐츠 시트 (80vh, 스크롤 가능)
- `Header` - 페이지 헤더 영역
- `HeaderTitle` - 헤더 제목
- `HeaderSubtitle` - 헤더 부제목
- `Body` - 메인 콘텐츠 영역 (스크롤)
- `Footer` - 하단 고정 영역
- `BackButton` - 뒤로가기 버튼 (왼쪽 상단)
- `CloseButton` - 닫기 버튼 (오른쪽 상단)

## 🎨 디자인 토큰

```typescript
// Colors
Background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed)
Border: #fed7aa
Primary: #f97316
Text: #111827
Subtitle: #6b7280

// Layout
Max Width: 420px
Height: 80vh
Border Radius: 20px
Padding: 16-20px
```

## 📖 사용 방법

```tsx
import { Page, Sheet, Header, HeaderTitle, Body, Footer, BackButton } from "../components/ui";

export default function MyPage() {
  const router = useRouter();
  
  return (
    <Page>
      <Sheet>
        <Header>
          <BackButton onClick={() => router.back()}>←</BackButton>
          <HeaderTitle>페이지 제목</HeaderTitle>
        </Header>
        
        <Body>
          {/* 메인 콘텐츠 */}
        </Body>
        
        <Footer>
          {/* 하단 고정 영역 (버튼 등) */}
        </Footer>
      </Sheet>
    </Page>
  );
}
```

## 🔄 Co-location 패턴

이 컴포넌트들은 **co-location 패턴**을 따릅니다:
- ✅ **위치**: `todayMenu/components/ui/` - todayMenu 기능 폴더 내부
- ✅ **범위**: todayMenu의 모든 하위 페이지에서만 사용
- ✅ **독립성**: 다른 기능(landing 등)과 독립적

## 📝 사용 페이지

- `todayMenu/page.tsx` - 오늘의 메뉴 메인
- `todayMenu/list/page.tsx` - 메뉴 리스트
- `todayMenu/detail/page.tsx` - 메뉴 상세
- `todayMenu/checkout/page.tsx` - 주문/결제

## ⚠️ 주의사항

1. **일관성 유지**: 모든 todayMenu 페이지는 이 컴포넌트를 사용해야 합니다
2. **수정 시 주의**: Layout.tsx 수정 시 모든 페이지에 영향을 줍니다
3. **재사용 금지**: 다른 기능(landing 등)에서는 사용하지 마세요
