"use client";

import React from "react";
import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Clock, MapPin } from "lucide-react";

export default function PickupDescription() {
  return (
    <PickupDescriptionWrapper>
      <Box>
        <TimeSection>
          <Clock size={20} />
          <Text>다음날 11:30~ 13:00 픽업가능</Text>
        </TimeSection>

        <LocationSection>
          <MapPin size={20} />
          <Text>한경직 기념관</Text>
        </LocationSection>
      </Box>
    </PickupDescriptionWrapper>
  );
}

const PickupDescriptionWrapper = styled.section<{ theme: Theme }>`
  width: 100%;
`;

const Box = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.sheetBackground};
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TimeSection = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const LocationSection = styled(TimeSection)`
  // 동일한 정렬과 간격 유지
`;

const Text = styled.p<{ theme: Theme }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;
