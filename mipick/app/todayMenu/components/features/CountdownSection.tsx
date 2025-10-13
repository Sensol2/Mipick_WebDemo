import styled from "styled-components";
import { Clock } from "lucide-react";

interface CountdownSectionProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection({ hours, minutes, seconds }: CountdownSectionProps) {
  return (
    <Container>
      <Header>
        <Clock size={18} />
        <Title>주문 마감까지 남은 시간</Title>
      </Header>
      
      <Timer>
        <TimeBox>
          <TimeValue>{String(hours).padStart(2, '0')}</TimeValue>
          <TimeLabel>시간</TimeLabel>
        </TimeBox>
        
        <TimeSeparator>:</TimeSeparator>
        
        <TimeBox>
          <TimeValue>{String(minutes).padStart(2, '0')}</TimeValue>
          <TimeLabel>분</TimeLabel>
        </TimeBox>
        
        <TimeSeparator>:</TimeSeparator>
        
        <TimeBox>
          <TimeValue>{String(seconds).padStart(2, '0')}</TimeValue>
          <TimeLabel>초</TimeLabel>
        </TimeBox>
      </Timer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #fef3f2;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;

  svg {
    color: #dc2626;
  }
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #991b1b;
  margin: 0;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  min-width: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TimeValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
`;

const TimeLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
`;

const TimeSeparator = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #dc2626;
  margin: 0 2px;
  padding-bottom: 16px;
`;
