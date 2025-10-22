import styled from "styled-components";

interface ImageWithDescriptionFieldProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function ImageWithDescriptionField({
  imageUrl,
  title,
  subtitle,
}: ImageWithDescriptionFieldProps) {
  return (
    <Container>
      <ImageWrapper>
        <DescriptionImage src={imageUrl} alt={title} />
      </ImageWrapper>
      
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DescriptionImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: #666;
  line-height: 1.7;
  margin: 0;
  white-space: pre-line;
`;
