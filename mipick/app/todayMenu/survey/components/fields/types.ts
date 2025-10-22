// 공용 설문 타입 정의

// 하위 질문 타입 (재귀적 구조 지원)
export type ChildQuestion = {
  parentOption: string; // 부모의 어떤 옵션이 선택됐을 때 표시할지
  id?: string;
  label?: string; // 하위 질문 레이블
  type: "single" | "multiple" | "likert" | "text" | "tel" | "textarea" | "description";
  options?: string[]; // single/multiple용
  scale?: number; // likert용
  anchors?: [string, string]; // likert용
  placeholder?: string; // text/tel/textarea용
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

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple";
  options: string[];
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
  | MultipleChoiceQuestion
  | TextQuestion
  | TextareaQuestion
  | LikertQuestion
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
