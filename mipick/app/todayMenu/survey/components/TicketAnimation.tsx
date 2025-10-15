import styled, { keyframes } from "styled-components";

interface TicketAnimationProps {
  show: boolean;
}

export default function TicketAnimation({ show }: TicketAnimationProps) {
  if (!show) return null;

  return (
    <Overlay>
      <AnimatedTicket>🎟️</AnimatedTicket>
      <AnimationText>추첨권 1장 획득!</AnimationText>
    </Overlay>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ticketPop = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const AnimatedTicket = styled.div`
  font-size: 120px;
  animation: ${ticketPop} 0.8s ease-out;
  margin-bottom: 24px;
`;

const AnimationText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  animation: ${fadeIn} 0.5s ease-out 0.3s both;
`;
