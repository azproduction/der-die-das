import { useState } from "react";
import styled from "styled-components";
import type { GermanWord } from "@/types";
import type { AdjectiveQuizState } from "@/types/quiz";
import { getCorrectArticle, getCorrectEnding } from "@/utils/grammar";

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Sentence = styled.div`
  font-size: 1.25rem;
  line-height: 1.5;
  text-align: center;
  font-family: var(--font-geist-sans);
`;

const Hint = styled.div`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  font-style: italic;
  font-family: var(--font-geist-sans);
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-family: var(--font-geist-sans);

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-family: var(--font-geist-sans);

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
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
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    const correctArticle = getCorrectArticle(word.article, quizState.case);
    const correctEnding = getCorrectEnding(word.article, quizState.case);

    const isCorrect =
      selectedArticle === correctArticle && selectedEnding === correctEnding;

    onSubmit(isCorrect);
  };

  const showPrepositionHint = quizState.isDirectional !== undefined;

  return (
    <QuizContainer>
      <Sentence>
        {quizState.preposition} {selectedArticle || "___"} {quizState.adjective}
        {selectedEnding || "___"} {word.word}
      </Sentence>

      {showPrepositionHint && (
        <Hint>
          Hint: &#34;{quizState.preposition}&#34; indicates{" "}
          {quizState.isDirectional ? "movement/direction" : "position/location"}{" "}
          here
        </Hint>
      )}

      <DropdownContainer>
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
      </DropdownContainer>

      <SubmitButton
        onClick={handleSubmit}
        disabled={!selectedArticle || !selectedEnding}
      >
        Check Answer
      </SubmitButton>
    </QuizContainer>
  );
}
