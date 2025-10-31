import styled from "styled-components";
import { MapPin, Coffee } from "lucide-react";
import { Store } from "@/lib/api/supabase";

interface StoreInfoProps {
  store: Store;
}

export default function StoreInfo({ store }: StoreInfoProps) {
  return (
    <Section>
      <TitleRow>
        <StoreTitle>{store.name}</StoreTitle>
      </TitleRow>

      <StoreDescription>{store.description || "#맛집 #가성비 #든든한끼"}</StoreDescription>

      <InfoItem>
        <MapPin size={14} />
        <span>{store.address || "위치 정보 없음"}</span>
      </InfoItem>

      <InfoItem>
        <Coffee size={14} />
        <InfoBold>(픽업장소) 한경직 기념관</InfoBold>
      </InfoItem>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const StoreTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const StoreDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
  margin: 0 0 14px 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  margin: 0 0 8px 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  svg {
    color: #f97316;
    flex-shrink: 0;
  }
`;

const InfoBold = styled.span`
  font-weight: 600;
`;
