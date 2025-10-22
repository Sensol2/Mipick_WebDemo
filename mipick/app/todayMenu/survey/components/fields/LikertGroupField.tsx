import styled from "styled-components";

export interface LikertGroupFieldProps {
  scale: number;
  anchors?: [string, string];
  questions: Array<{ id: string; label: string }>;
  value: string; // JSON string: {"cafeteriaTaste": "3", "cafeteriaQuantity": "4", ...}
  onChange: (value: string) => void;
}

export default function LikertGroupField({
  scale,
  anchors,
  questions,
  value,
  onChange,
}: LikertGroupFieldProps) {
  // Parse JSON value
  const parsedValue = (() => {
    try {
      return JSON.parse(value || "{}");
    } catch {
      return {};
    }
  })();

  const handleChange = (questionId: string, rating: string) => {
    const updated = { ...parsedValue, [questionId]: rating };
    onChange(JSON.stringify(updated));
  };

  return (
    <Container>
      {/* Header: 척도 라벨 */}
      <Header>
        <QuestionLabelPlaceholder />
        {Array.from({ length: scale }, (_, i) => i + 1).map((num) => (
          <ScaleNumber key={num}>{num}</ScaleNumber>
        ))}
      </Header>

      {/* Anchors (첫 줄과 마지막 줄) */}
      {anchors && (
        <AnchorsRow>
          <AnchorLabel style={{ textAlign: "left" }}>{anchors[0]}</AnchorLabel>
          <AnchorLabel style={{ textAlign: "right" }}>{anchors[1]}</AnchorLabel>
        </AnchorsRow>
      )}

      {/* 각 질문별 Likert 행 */}
      {questions.map((q) => {
        const selectedValue = parsedValue[q.id] || "";
        return (
          <LikertRow key={q.id}>
            <QuestionLabel>{q.label}</QuestionLabel>
            <ScaleButtons>
              {Array.from({ length: scale }, (_, i) => i + 1).map((num) => {
                const numStr = String(num);
                const isSelected = selectedValue === numStr;
                return (
                  <ScaleButton
                    key={num}
                    selected={isSelected}
                    onClick={() => handleChange(q.id, numStr)}
                  >
                    {num}
                  </ScaleButton>
                );
              })}
            </ScaleButtons>
          </LikertRow>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  gap: 8px;
  align-items: center;
  padding: 0 8px;
`;

const QuestionLabelPlaceholder = styled.div`
  /* Empty space for question labels */
`;

const ScaleNumber = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #666;
`;

const AnchorsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  margin-bottom: 8px;
`;

const AnchorLabel = styled.div`
  font-size: 13px;
  color: #888;
  font-weight: 500;
`;

const LikertRow = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  gap: 8px;
  align-items: center;
  padding: 12px 8px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const QuestionLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ScaleButtons = styled.div`
  display: contents;
`;

const ScaleButton = styled.button<{ selected: boolean }>`
  width: 100%;
  height: 40px;
  border: 2px solid ${(props) => (props.selected ? "#FF6B35" : "#e0e0e0")};
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#FFF4E6" : "white")};
  color: ${(props) => (props.selected ? "#FF6B35" : "#666")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #FF6B35;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;
