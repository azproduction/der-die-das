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
`;

export default function Home() {
  const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [quizState, setQuizState] = useState<AdjectiveQuizState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleGuess = (guess: Gender, isCorrect: boolean) => {
    if (!currentWord || !wordSelector.current) return;

    if (isCorrect) {
      setCurrentWord(wordSelector.current!.getNextWord());
      setGameState("playing");
      setQuizState(null);
    } else {
      const newQuizState = generateQuizState(currentWord);
      setQuizState(newQuizState);
      setGameState("quiz");
    }
  };

  const handleQuizSubmit = (isCorrect: boolean) => {
    if (!wordSelector.current) return;

    setCurrentWord(wordSelector.current!.getNextWord());
    setGameState("playing");
    setQuizState(null);
  };

  if (isLoading) {
    return <Wrapper>Loading words...</Wrapper>;
  }

  if (error) {
    return <Wrapper>Error: {error}</Wrapper>;
  }

  return (
    <Wrapper>
      <WordCard
        word={currentWord!}
        onGuess={handleGuess}
        disabled={gameState === "quiz"}
      />

      {gameState === "quiz" && quizState && (
        <AdjectiveQuiz
          word={currentWord!}
          quizState={quizState}
          onSubmit={handleQuizSubmit}
        />
      )}
    </Wrapper>
  );
}
