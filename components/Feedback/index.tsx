import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FeedbackContainer = styled.div<{ $isCorrect: boolean }>`
  padding: 1rem 2rem;
  background-color: ${(props) => (props.$isCorrect ? "#e6ffe6" : "#ffe6e6")};
  border: 2px solid ${(props) => (props.$isCorrect ? "#00cc00" : "#cc0000")};
  border-radius: 4px;
  color: ${(props) => (props.$isCorrect ? "#006600" : "#660000")};
  font-family: var(--font-geist-sans);
  animation: ${fadeIn} 0.3s ease-out;
  text-align: center;
  margin: 1rem 0;
`;

interface FeedbackProps {
  isCorrect: boolean;
  correctArticle?: string;
  word?: string;
}

export function Feedback({ isCorrect, correctArticle, word }: FeedbackProps) {
  if (isCorrect) {
    return <FeedbackContainer $isCorrect={true}>Correct! ✓</FeedbackContainer>;
  }

  return (
    <FeedbackContainer $isCorrect={false}>
      Not quite. The correct article is <strong>{correctArticle}</strong> {word}
    </FeedbackContainer>
  );
}
