// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import WordCard from "@/components/WordCard";
import AdjectiveQuiz from "@/components/AdjectiveQuiz";
import { loadWords } from "@/services/csvService";
import { WordSelector } from "@/services/wordService";
import { generateQuizState } from "@/utils/quizGenerator";
import type { Gender, GermanWord } from "@/types";
import type { GameState } from "@/types/game";
import type { AdjectiveQuizState } from "@/types/quiz";

const Wrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2rem;
`;

const ScoreDisplay = styled.div`
  font-family: var(--font-geist-sans);
  font-size: 1.125rem;
  color: #666;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 100%;
`;

export default function Home() {
  const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [quizState, setQuizState] = useState<AdjectiveQuizState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const wordSelector = useRef<WordSelector | null>(null);

  useEffect(() => {
    async function initializeWords() {
      try {
        const loadedWords = await loadWords();
        wordSelector.current = new WordSelector(loadedWords);
        setCurrentWord(wordSelector.current.getNextWord());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load words");
      } finally {
        setIsLoading(false);
      }
    }

    initializeWords();
  }, []);

  const updateScore = (isCorrect: boolean) => {
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleGuess = (guess: Gender, isCorrect: boolean) => {
    if (!currentWord || !wordSelector.current) return;

    updateScore(isCorrect);

    if (isCorrect) {
      // Short delay to show feedback before moving to next word
      setCurrentWord(wordSelector.current!.getNextWord());
      setGameState("playing");
      setQuizState(null);
    } else {
      // Generate quiz state and transition to quiz mode
      const newQuizState = generateQuizState(currentWord);
      setQuizState(newQuizState);
      setGameState("quiz");
    }
  };

  const handleQuizSubmit = (isCorrect: boolean) => {
    if (!wordSelector.current) return;

    updateScore(isCorrect);

    // Short delay to show feedback before moving to next word
    setCurrentWord(wordSelector.current!.getNextWord());
    setGameState("playing");
    setQuizState(null);
  };

  const getScorePercentage = () => {
    if (score.total === 0) return 0;
    return Math.round((score.correct / score.total) * 100);
  };

  if (isLoading) {
    return <Wrapper>Loading words...</Wrapper>;
  }

  if (error) {
    return <Wrapper>Error: {error}</Wrapper>;
  }

  return (
    <Wrapper>
      <ScoreDisplay>
        Score: {score.correct}/{score.total} ({getScorePercentage()}%)
      </ScoreDisplay>

      <Container>
        {gameState === "quiz" && quizState ? (
          <AdjectiveQuiz
            word={currentWord!}
            quizState={quizState}
            onSubmit={handleQuizSubmit}
          />
        ) : (
          <WordCard word={currentWord!} onGuess={handleGuess} />
        )}
      </Container>
    </Wrapper>
  );
}
