// components/AdjectiveQuiz/index.tsx
import { useEffect, useMemo, useState } from "react";
import type { GermanWord } from "@/types";
import type { AdjectiveQuizState } from "@/types/quiz";
import { getCorrectArticle, getCorrectEnding } from "@/utils/grammar";
import { Button, Card, Word } from "../styles";
import styled from "styled-components";
import { WordWithMagicalSuffix } from "@/components/WordWithMagicalSuffix";

const QuizContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SelectGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1;
`;

const Label = styled.label<{
  $valid?: boolean;
  $selected?: boolean;
  $disabled?: boolean;
}>`
  flex-direction: row;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme, $valid, $selected, $disabled }) => {
    if ($valid) {
      return theme.colors.success;
    }
    if ($selected) {
      return theme.colors.primary;
    }

    if ($disabled) {
      return theme.colors.secondary;
    }

    return theme.colors.primary;
  }};

  background-color: ${({ theme, $valid, $selected }) => {
    if ($valid) {
      return theme.colors.success;
    }
    if ($selected) {
      return theme.colors.primary;
    }
    return "transparent";
  }};
  color: ${({ theme, $valid, $selected, $disabled }) => {
    if ($valid || $selected) {
      return theme.colors.background;
    }

    if ($disabled) {
      return theme.colors.secondary;
    }

    return theme.colors.primary;
  }};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.sizes.large};
  border-radius: 4px;

  & input {
    display: none;
  }
`;

const Items = styled.div`
  flex-direction: column;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
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
  const [corrent, setCorrent] = useState<boolean | null>(null);

  const [correctArticle, correctEnding] = useMemo(() => {
    const correctArticle = getCorrectArticle(word.article, quizState.case);
    const correctEnding = getCorrectEnding(word.article, quizState.case);

    return [correctArticle, correctEnding];
  }, [quizState.case, word.article]);

  useEffect(() => {
    if (!selectedArticle) {
      return;
    }

    if (!selectedEnding) {
      return;
    }

    const isCorrect =
      selectedArticle === correctArticle && selectedEnding === correctEnding;

    setCorrent(isCorrect);

    if (isCorrect) {
      const timer = setTimeout(() => {
        onSubmit(isCorrect);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    correctArticle,
    correctEnding,
    onSubmit,
    selectedArticle,
    selectedEnding,
  ]);

  return (
    <QuizContainer>
      <Word $isFailure={corrent === false} $isSuccess={corrent === true}>
        <ruby>
          {quizState.preposition} <rp>(</rp>
          <rt style={{ opacity: 0.5, fontWeight: 500 }}>
            {}
            {(() => {
              if (typeof quizState.isDirectional !== "boolean") {
                return <>&nbsp;</>;
              }

              return quizState.isDirectional ? "⮕" : "⬇";
            })()}
          </rt>
          <rp>)</rp>
        </ruby>
        {"…"} {quizState.adjective}
        {"…"} <WordWithMagicalSuffix word={word} />
      </Word>

      <SelectGroup>
        <Items>
          {["der", "die", "das", "den", "dem"].map((name) => {
            return (
              <Label
                key={name}
                $valid={corrent === false && correctArticle === name}
                $selected={selectedArticle === name}
                $disabled={Boolean(selectedEnding) && Boolean(selectedArticle)}
              >
                <input
                  type="radio"
                  id={name}
                  name={name}
                  value={name}
                  disabled={Boolean(selectedEnding) && Boolean(selectedArticle)}
                  onChange={() => setSelectedArticle(name)}
                  checked={selectedArticle === name}
                />
                {name}
              </Label>
            );
          })}
        </Items>

        <Items>
          {["er", "e", "es", "en"].map((name) => {
            return (
              <Label
                key={name}
                $valid={corrent === false && correctEnding === name}
                $selected={selectedEnding === name}
                $disabled={Boolean(selectedEnding) && Boolean(selectedArticle)}
              >
                <input
                  type="radio"
                  id={name}
                  name={name}
                  value={name}
                  disabled={Boolean(selectedEnding) && Boolean(selectedArticle)}
                  onChange={() => setSelectedEnding(name)}
                  checked={selectedEnding === name}
                />
                {name}
              </Label>
            );
          })}
        </Items>
      </SelectGroup>
      {corrent === false && (
        <>
          <Word>{word.note}</Word>
          <center>{word.example}</center>
          <Button onClick={() => onSubmit(false)}>OK</Button>
        </>
      )}
    </QuizContainer>
  );
}
