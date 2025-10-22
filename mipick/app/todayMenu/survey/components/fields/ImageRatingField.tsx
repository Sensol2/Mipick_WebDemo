import styled from "styled-components";
import { useState } from "react";

interface RatingOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface ImageRatingFieldProps {
  imageUrl: string;
  questionText: string;
  title: string;
  subtitle: string;
  address: string;
  options: RatingOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function ImageRatingField({
  imageUrl,
  questionText,
  title,
  subtitle,
  address,
  options,
  value,
  onChange,
}: ImageRatingFieldProps) {
  // value를 JSON 파싱 (예: {"preference": "3", "amount": "4", "value": "5"})
  const parseValue = (val: string): Record<string, string> => {
    try {
      return val ? JSON.parse(val) : {};
    } catch {
      return {};
    }
  };

  const [ratings, setRatings] = useState<Record<string, string>>(parseValue(value));

  const handleRatingChange = (optionId: string, rating: number) => {
    const newRatings = {
      ...ratings,
      [optionId]: String(rating),
    };
    setRatings(newRatings);
    onChange(JSON.stringify(newRatings));
  };

  return (
    <Container>
      <ImageWrapper>
        <MenuImage src={imageUrl} alt="메뉴 이미지" />
      </ImageWrapper>
      
      <MenuInfo>
        <MenuTitle>{title}</MenuTitle>
        <RestaurantName>{subtitle}</RestaurantName>
        <Address>{address}</Address>
      </MenuInfo>
      
      <QuestionText>{questionText}</QuestionText>
      
      <RatingGroups>
        {options.map((option) => (
          <RatingGroup key={option.id}>
            <RatingLabel>{option.label}</RatingLabel>
            <ScaleButtons>
              {Array.from({ length: option.max - option.min + 1 }, (_, i) => {
                const score = option.min + i;
                const isSelected = ratings[option.id] === String(score);
                
                return (
                  <ScaleButton
                    key={score}
                    $isSelected={isSelected}
                    onClick={() => handleRatingChange(option.id, score)}
                  >
                    {score}
                  </ScaleButton>
                );
              })}
            </ScaleButtons>
          </RatingGroup>
        ))}
      </RatingGroups>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MenuImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
`;

const MenuTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
`;

const RestaurantName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #666;
`;

const Address = styled.div`
  font-size: 13px;
  color: #999;
  line-height: 1.5;
`;

const QuestionText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.6;
  text-align: center;
`;

const RatingGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RatingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RatingLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const ScaleButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const ScaleButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${props => props.$isSelected ? "#FF6B35" : "#e0e0e0"};
  background: ${props => props.$isSelected ? "#FF6B35" : "white"};
  color: ${props => props.$isSelected ? "white" : "#666"};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(0);
  }
`;
