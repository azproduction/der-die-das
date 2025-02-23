// components/Feedback/index.tsx
import { Feedback as StyledFeedback } from "../styles";

interface FeedbackProps {
  isCorrect: boolean;
  correctArticle?: string;
  word?: string;
}

export function Feedback({ isCorrect, correctArticle, word }: FeedbackProps) {
  if (isCorrect) {
    return <StyledFeedback $isSuccess>Correct! ✓</StyledFeedback>;
  }

  return (
    <StyledFeedback>
      Not quite. The correct article is <strong>{correctArticle}</strong> {word}
    </StyledFeedback>
  );
}
