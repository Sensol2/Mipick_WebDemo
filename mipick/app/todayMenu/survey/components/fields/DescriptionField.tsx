import styled from "styled-components";

interface DescriptionFieldProps {
  content?: string;
  label?: string;
}

export default function DescriptionField({ content, label }: DescriptionFieldProps) {
  return (
    <Container>
      {content && <Text>{content}</Text>}
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
  border-left: 4px solid #FF6B35;
`;

const Text = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: pre-line;
  margin: 0;
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
