// components/AdjectiveQuiz/index.tsx
import { useState } from "react";
import type { GermanWord } from "@/types";
import type { AdjectiveQuizState } from "@/types/quiz";
import { getCorrectArticle, getCorrectEnding } from "@/utils/grammar";
import { Card, Button, Select, ButtonGroup } from "../styles";
import styled from "styled-components";

const QuizContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Sentence = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  line-height: 1.5;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamilySans};
`;

const Hint = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  font-style: italic;
`;

const SelectGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

interface AdjectiveQuizProps {
  word: GermanWord;
  quizState: AdjectiveQuizState;
  onSubmit: (isCorrect: boolean) => void;
}

export default function AdjectiveQuiz({
  word,
  quizState,
  onSubmit,
}: AdjectiveQuizProps) {
  const [selectedArticle, setSelectedArticle] = useState("");
  const [selectedEnding, setSelectedEnding] = useState("");

  const handleSubmit = () => {
    const correctArticle = getCorrectArticle(word.article, quizState.case);
    const correctEnding = getCorrectEnding(word.article, quizState.case);
    const isCorrect =
      selectedArticle === correctArticle && selectedEnding === correctEnding;
    onSubmit(isCorrect);
  };

  return (
    <QuizContainer>
      <Sentence>
        {quizState.preposition} {selectedArticle || "___"} {quizState.adjective}
        {selectedEnding || "___"} {word.word}
      </Sentence>

      {quizState.isDirectional !== undefined && (
        <Hint>
          Hint: "{quizState.preposition}" indicates{" "}
          {quizState.isDirectional ? "movement/direction" : "position/location"}{" "}
          here
        </Hint>
      )}

      <SelectGroup>
        <Select
          value={selectedArticle}
          onChange={(e) => setSelectedArticle(e.target.value)}
        >
          <option value="">Select article</option>
          <option value="dem">dem</option>
          <option value="der">der</option>
          <option value="den">den</option>
          <option value="das">das</option>
          <option value="die">die</option>
        </Select>

        <Select
          value={selectedEnding}
          onChange={(e) => setSelectedEnding(e.target.value)}
        >
          <option value="">Select ending</option>
          <option value="e">-e</option>
          <option value="en">-en</option>
          <option value="es">-es</option>
          <option value="er">-er</option>
        </Select>
      </SelectGroup>

      <ButtonGroup>
        <Button
          onClick={handleSubmit}
          disabled={!selectedArticle || !selectedEnding}
        >
          Check Answer
        </Button>
      </ButtonGroup>
    </QuizContainer>
  );
}
