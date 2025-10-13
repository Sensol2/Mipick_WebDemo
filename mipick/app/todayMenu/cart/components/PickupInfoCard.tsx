import React from "react";
import styled from "styled-components";

interface PickupInfoCardProps {
  type: "location" | "time";
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  onChangeClick: () => void;
}

export default function PickupInfoCard({ 
  type, 
  title, 
  subtitle, 
  icon, 
  onChangeClick 
}: PickupInfoCardProps) {
  return (
    <InfoCard>
      {type === "location" ? (
        <CardMedia>
          <MediaPlaceholder>📸</MediaPlaceholder>
        </CardMedia>
      ) : (
        <IconCircle>{icon || "⏰"}</IconCircle>
      )}
      
      <InfoContent>
        <InfoTitle>{title}</InfoTitle>
        <InfoSub>{subtitle}</InfoSub>
      </InfoContent>
      
      <LinkBtn onClick={onChangeClick}>변경</LinkBtn>
    </InfoCard>
  );
}

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
`;

const CardMedia = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediaPlaceholder = styled.div`
  opacity: 0.6;
  font-size: 28px;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #1f2937;
`;

const InfoSub = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const LinkBtn = styled.button`
  border: none;
  background: #fff7ed;
  color: #ea580c;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;
