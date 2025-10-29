// 공용 설문 타입 정의

// 하위 질문 타입 (재귀적 구조 지원)
export type ChildQuestion = {
  parentOption: string; // 부모의 어떤 옵션이 선택됐을 때 표시할지
  id?: string;
  label?: string; // 하위 질문 레이블
  type: "single" | "multiple" | "dropdown" | "likert" | "likertGroup" | "text" | "tel" | "textarea" | "description";
  options?: string[]; // single/multiple/dropdown용
  scale?: number; // likert용
  anchors?: [string, string]; // likert용
  items?: Array<{ id: string; label: string }>; // likertGroup용 - 평가할 항목들
  placeholder?: string; // text/tel/textarea용
  content?: string; // description용
  required?: boolean;
  children?: ChildQuestion[]; // 재귀적으로 중첩 가능
};

// 기본 질문 타입
export type BaseQuestion = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  parentOption?: string; // 이 질문이 조건부로 표시되는 경우, 부모의 어떤 옵션에 종속되는지
  children?: ChildQuestion[]; // 모든 질문이 children을 가질 수 있음
};

export type SingleChoiceQuestion = BaseQuestion & {
  type: "single";
  options: string[];
};

export type DropdownQuestion = BaseQuestion & {
  type: "dropdown";
  options: string[];
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple";
  options: string[];
  minimum?: number; // 최소 선택 개수 제한
  maximum?: number; // 최대 선택 개수 제한
};

export type TextQuestion = BaseQuestion & {
  type: "text" | "tel";
  placeholder?: string;
};

export type TextareaQuestion = BaseQuestion & {
  type: "textarea";
  placeholder?: string;
};

export type LikertQuestion = BaseQuestion & {
  type: "likert";
  scale: number;
  anchors?: [string, string];
};

export type LikertGroupQuestion = BaseQuestion & {
  type: "likertGroup";
  scale: number;
  anchors?: [string, string];
  items: Array<{ id: string; label: string }>; // 평가할 항목들 (맛, 양, 가격 대비 만족도 등)
};

export type ImageRatingQuestion = BaseQuestion & {
  type: "imageRating";
  imageUrl: string;
  questionText: string;
  title: string;
  subtitle: string;
  address: string;
  options: Array<{
    id: string;
    label: string;
    min: number;
    max: number;
  }>;
};

export type ImageWithDescriptionQuestion = BaseQuestion & {
  type: "imageWithDescription";
  imageUrl: string;
  title: string;
  subtitle: string;
};

export type DescriptionQuestion = BaseQuestion & {
  type: "description";
  content?: string;
};

export type Question =
  | SingleChoiceQuestion
  | DropdownQuestion
  | MultipleChoiceQuestion
  | TextQuestion
  | TextareaQuestion
  | LikertQuestion
  | LikertGroupQuestion
  | ImageRatingQuestion
  | ImageWithDescriptionQuestion
  | DescriptionQuestion;

export type SurveyPage = {
  id: number;
  title: string;
  subtitle?: string;
  privacyNote?: string;
  questions: Question[];
};
