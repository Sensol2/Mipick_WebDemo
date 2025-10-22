import styled from "styled-components";

export interface LikertFieldProps {
  scale: number;
  anchors?: [string, string];
  value: string;
  onChange: (value: string) => void;
}

export default function LikertField({ scale, anchors = ["", ""], value, onChange }: LikertFieldProps) {
  return (
    <Container>
      <Anchors>
        <span>{anchors[0] || ""}</span>
        <span>{anchors[1] || ""}</span>
      </Anchors>
      <Scale columns={scale}>
        {Array.from({ length: scale }, (_, i) => String(i + 1)).map((v) => (
          <Item
            key={v}
            selected={value === v}
            onClick={() => onChange(v)}
            aria-label={`${v}/${scale}`}
          >
            {v}
          </Item>
        ))}
      </Scale>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Anchors = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  padding: 0 4px;
`;

const Scale = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  gap: 8px;
`;

const Item = styled.button<{ selected: boolean }>`
  height: 40px;
  border-radius: 999px;
  border: 2px solid ${(p) => (p.selected ? "#FF6B35" : "#e0e0e0")};
  background: ${(p) => (p.selected ? "#FFF4E6" : "#fff")};
  color: ${(p) => (p.selected ? "#FF6B35" : "#666")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.1s;
`;
