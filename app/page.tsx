// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import WordCard from "@/components/WordCard";
import { loadWords } from "@/services/csvService";
import { WordSelector } from "@/services/wordService";
import type { Gender, GermanWord } from "@/types";

const Wrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  color: #666;
  font-family: var(--font-geist-sans);
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  padding: 1rem;
  border: 1px solid #ff0000;
  border-radius: 4px;
  margin: 1rem;
  font-family: var(--font-geist-sans);
`;

const Progress = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-family: var(--font-geist-mono);
  font-size: 0.875rem;
  color: #666;
`;

export default function Home() {
  const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingWords, setRemainingWords] = useState<number>(0);
  const wordSelector = useRef<WordSelector | null>(null);

  useEffect(() => {
    async function initializeWords() {
      try {
        const loadedWords = await loadWords();
        wordSelector.current = new WordSelector(loadedWords);
        const firstWord = wordSelector.current.getNextWord();
        setCurrentWord(firstWord);
        setRemainingWords(wordSelector.current.getRemainingCount());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load words");
      } finally {
        setIsLoading(false);
      }
    }

    initializeWords();
  }, []);

  const handleGuess = (guess: Gender) => {
    if (!currentWord || !wordSelector.current) return;

    const isCorrect = guess === currentWord.article;

    // If correct, show a new word
    if (isCorrect) {
      // Short delay before showing next word
      setTimeout(() => {
        const nextWord = wordSelector.current!.getNextWord();
        setCurrentWord(nextWord);
        setRemainingWords(wordSelector.current!.getRemainingCount());
      }, 500);
    }
    // If incorrect, we'll handle the quiz logic in the next step
  };

  const handleReset = () => {
    if (wordSelector.current) {
      wordSelector.current.reset();
      const nextWord = wordSelector.current.getNextWord();
      setCurrentWord(nextWord);
      setRemainingWords(wordSelector.current.getRemainingCount());
    }
  };

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingMessage>Loading words...</LoadingMessage>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </Wrapper>
    );
  }

  if (!currentWord) {
    return (
      <Wrapper>
        <ErrorMessage>No words available</ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Progress>Words remaining: {remainingWords}</Progress>
      <WordCard word={currentWord} onGuess={handleGuess} />
    </Wrapper>
  );
}
