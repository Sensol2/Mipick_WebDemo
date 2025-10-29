# Survey LocalStorage 기능 구현

로그인 전 설문 응답을 LocalStorage에 저장하고, 로그인 후 자동으로 DB에 제출하는 기능입니다.

## 📁 파일 구조

```
survey/
├── hooks/
│   ├── index.ts                    # 훅 export
│   ├── useSurveySubmit.ts          # 설문 제출 관리 훅
│   └── useSurveyAutoSubmit.ts      # 로그인 후 자동 제출 훅
├── utils/
│   └── surveyUtils.ts              # LocalStorage 유틸리티 함수들
└── page.tsx                        # 메인 설문 페이지
```

## 🔧 주요 기능

### 1. **LocalStorage 유틸리티 함수** (`surveyUtils.ts`)

```typescript
// 설문 데이터 저장
saveSurveyToLocalStorage(formData)

// 설문 데이터 불러오기
loadSurveyFromLocalStorage()

// 설문 데이터 삭제
clearSurveyFromLocalStorage()

// 제출 대기 중인지 확인
isPendingSurveySubmit()

// 저장된 데이터 존재 여부 확인
hasSavedSurveyData()
```

#### 특징:
- ✅ 24시간 자동 만료 (오래된 데이터 자동 삭제)
- ✅ 유효성 검사 (잘못된 데이터 자동 정리)
- ✅ 에러 핸들링 (LocalStorage 사용 불가 시 대응)

### 2. **설문 제출 훅** (`useSurveySubmit.ts`)

```typescript
const { submitSurvey, isSubmitting } = useSurveySubmit({
  formData,
  onLoginRequired: () => setLoginModalOpen(true),
  onSuccess: () => setCurrentStep('share'),
  onAlreadySubmitted: () => alert('이미 참여하셨습니다'),
  onValidationError: (msg) => alert(msg),
  onError: (error) => console.error(error),
});
```

#### 처리 순서:
1. **유효성 검증**: 필수 항목 입력 확인
2. **로그인 확인**: 
   - 비로그인 → LocalStorage 저장 + 로그인 모달 열기
   - 로그인 → 다음 단계 진행
3. **중복 제출 방지**: 이미 참여한 경우 차단
4. **DB 제출**: 설문 응답 저장
5. **정리**: LocalStorage 데이터 삭제

### 3. **자동 제출 훅** (`useSurveyAutoSubmit.ts`)

```typescript
useSurveyAutoSubmit({
  onSuccess: () => setCurrentStep('share'),
  onError: (error) => alert('제출 실패'),
});
```

#### 동작 방식:
1. 로그인 상태 감지
2. LocalStorage에 제출 대기 데이터가 있는지 확인
3. 데이터가 있으면 자동으로 DB에 제출
4. 성공 시 콜백 실행 + LocalStorage 정리

#### 특징:
- ✅ 중복 실행 방지 (`useRef` 활용)
- ✅ 500ms 딜레이 (UX 개선)
- ✅ 자동 정리 (제출 후 데이터 삭제)

## 🔄 전체 플로우

### 비로그인 사용자가 설문 제출 시:

```
1. 사용자가 설문 작성 완료
2. "제출" 버튼 클릭
3. [useSurveySubmit] 유효성 검증 ✅
4. [useSurveySubmit] 로그인 안 됨 감지
5. [useSurveySubmit] LocalStorage에 formData 저장 💾
6. 로그인 모달 표시
7. 사용자가 카카오/구글 로그인
8. OAuth 리다이렉트 → 설문 페이지 복귀
9. [useSurveyAutoSubmit] 로그인 상태 감지 ✅
10. [useSurveyAutoSubmit] LocalStorage에서 데이터 불러오기
11. [useSurveyAutoSubmit] DB에 자동 제출 📤
12. [useSurveyAutoSubmit] LocalStorage 정리 🧹
13. 완료 페이지로 이동 🎉
```

### 로그인 사용자가 설문 제출 시:

```
1. 사용자가 설문 작성 완료
2. "제출" 버튼 클릭
3. [useSurveySubmit] 유효성 검증 ✅
4. [useSurveySubmit] 로그인 확인 ✅
5. [useSurveySubmit] 중복 제출 확인 ✅
6. [useSurveySubmit] DB에 즉시 제출 📤
7. 완료 페이지로 이동 🎉
```

## 💡 사용 예시

### 메인 페이지 (`page.tsx`)

```typescript
export default function SurveyPage() {
  const [formData, setFormData] = useState(initializeFormData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 설문 제출 관리
  const { submitSurvey } = useSurveySubmit({
    formData,
    onLoginRequired: () => setIsLoginModalOpen(true),
    onSuccess: () => setCurrentStep("share"),
  });

  // 로그인 후 자동 제출
  useSurveyAutoSubmit({
    onSuccess: () => setCurrentStep("share"),
    onError: (error) => alert("제출 실패"),
  });

  return (
    <>
      <SurveySection onSubmit={submitSurvey} />
      <LoginModal isOpen={isLoginModalOpen} />
    </>
  );
}
```

## 🐛 디버깅

### 콘솔 로그 메시지:

- `💾 Saving survey data to localStorage before login...` - LocalStorage 저장 중
- `✅ Survey data saved to localStorage` - 저장 성공
- `🔄 Auto-submitting saved survey data...` - 자동 제출 시작
- `✅ Survey auto-submitted successfully` - 자동 제출 성공
- `📤 Submitting survey to database...` - DB 제출 중
- `❌ Failed to auto-submit survey:` - 자동 제출 실패

### LocalStorage 확인:

브라우저 개발자 도구 → Application → Local Storage에서 확인:
- `mipick_pending_survey_data` - 설문 응답 데이터
- `mipick_survey_pending_submit` - 제출 대기 플래그
- `mipick_survey_submit_timestamp` - 저장 시각

## ⚠️ 주의사항

1. **24시간 자동 만료**: 24시간 이상 지난 데이터는 자동으로 삭제됩니다.
2. **LocalStorage 용량**: 약 5-10MB 제한이 있으므로 대용량 데이터는 주의해야 합니다.
3. **프라이빗 브라우징**: 시크릿 모드에서는 LocalStorage가 제한될 수 있습니다.
4. **중복 실행 방지**: `useRef`로 중복 실행을 막고 있습니다.

## 🔒 보안

- ✅ 민감한 개인정보는 암호화하지 않고 저장 (클라이언트 측 저장이므로)
- ✅ 24시간 자동 만료로 오래된 데이터 자동 삭제
- ✅ 로그인 후 즉시 DB로 이동하고 LocalStorage 정리

## 📝 테스트 시나리오

1. **정상 플로우 테스트**
   - [ ] 비로그인 상태에서 설문 작성
   - [ ] 제출 버튼 클릭 → 로그인 모달 표시
   - [ ] 카카오 로그인
   - [ ] 자동으로 설문 제출됨
   - [ ] 완료 페이지로 이동

2. **에러 케이스 테스트**
   - [ ] 필수 항목 미입력 시 에러 메시지
   - [ ] 이미 참여한 사용자 재제출 시도
   - [ ] LocalStorage 사용 불가 환경

3. **엣지 케이스 테스트**
   - [ ] 로그인 중 브라우저 닫기 → 재접속 시 데이터 유지
   - [ ] 24시간 경과 후 자동 삭제 확인
   - [ ] 중복 제출 시도 차단

## 🎯 개선 가능 사항

- [ ] 설문 진행률 저장 (페이지별로 저장)
- [ ] 암호화 추가 (민감 정보 보호)
- [ ] IndexedDB 사용 (대용량 데이터 지원)
- [ ] 오프라인 지원 (Service Worker)
- [ ] 재시도 로직 (네트워크 에러 시)
