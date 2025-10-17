// 공용 설문 타입 정의
export type BaseQuestion = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
};

export type RadioQuestion = BaseQuestion & {
  type: "radio";
  options: string[];
};

export type CheckboxQuestion = BaseQuestion & {
  type: "checkbox";
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

export type Question =
  | RadioQuestion
  | CheckboxQuestion
  | TextQuestion
  | TextareaQuestion
  | LikertQuestion;

export type SurveyPage = {
  id: number;
  title: string;
  subtitle?: string;
  privacyNote?: string;
  questions: Question[];
};
