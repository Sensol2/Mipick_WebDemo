import styled from "styled-components";

export interface LikertGroupFieldProps {
  items: Array<{ id: string; label: string }>;
  scale: number;
  anchors?: [string, string];
  formData: Record<string, string>;
  onChange: (itemId: string, value: string) => void;
}

export default function LikertGroupField({
  items,
  scale,
  anchors = ["", ""],
  formData,
  onChange,
}: LikertGroupFieldProps) {
  return (
    <Container>
      {items.map((item) => (
        <ItemRow key={item.id}>
          <ItemLabel>{item.label}</ItemLabel>
          <LikertScale>
            <Anchors>
              <span>{anchors[0] || ""}</span>
              <span>{anchors[1] || ""}</span>
            </Anchors>
            <Scale $columns={scale}>
              {Array.from({ length: scale }, (_, i) => String(i + 1)).map((v) => {
                const isSelected = formData[item.id] === v;
                return (
                  <ScaleButton
                    key={v}
                    $selected={isSelected}
                    onClick={() => onChange(item.id, v)}
                    aria-label={`${item.label} ${v}/${scale}`}
                  >
                    {v}
                  </ScaleButton>
                );
              })}
            </Scale>
          </LikertScale>
        </ItemRow>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const LikertScale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Anchors = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  padding: 0 4px;
`;

const Scale = styled.div.attrs<{ $columns: number }>(() => ({}))<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$columns}, 1fr);
  gap: 8px;
`;

const ScaleButton = styled.button.attrs<{ $selected: boolean }>(() => ({}))<{ $selected: boolean }>`
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${(p) => (p.$selected ? "#FF6B35" : "#e0e0e0")};
  background: ${(p) => (p.$selected ? "#FFF4E6" : "#fff")};
  color: ${(p) => (p.$selected ? "#FF6B35" : "#666")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    border-color: #FF6B35;
  }
`;
