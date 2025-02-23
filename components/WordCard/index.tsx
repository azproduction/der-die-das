import { useState, useEffect } from "react";
import styled from "styled-components";
import type { Gender, GermanWord } from "@/types";
import { Feedback } from "../Feedback";
import type { GameState } from "@/types/game";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Word = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-align: center;
  font-family: var(--font-geist-sans);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

// Updated styled components for WordCard
const GenderButton = styled.button<{
  $selected?: boolean;
  $correct?: boolean;
  $incorrect?: boolean;
}>`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: 2px solid black;
  background: ${(props) => {
    if (props.$correct) return "#e6ffe6";
    if (props.$incorrect) return "#ffe6e6";
    return props.$selected ? "black" : "white";
  }};
  color: ${(props) => {
    if (props.$correct) return "#006600";
    if (props.$incorrect) return "#660000";
    return props.$selected ? "white" : "black";
  }};
  border-color: ${(props) => {
    if (props.$correct) return "#00cc00";
    if (props.$incorrect) return "#cc0000";
    return "black";
  }};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: all 0.2s ease;
  font-family: var(--font-geist-sans);
  min-width: 100px;

  &:hover {
    background: ${(props) => {
      if (props.disabled) return props.$selected ? "black" : "white";
      return props.$selected ? "black" : "#f0f0f0";
    }};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(1px)")};
  }
`;

interface WordCardProps {
  word: GermanWord;
  onGuess: (guess: Gender, isCorrect: boolean) => void;
  disabled?: boolean;
}

export default function WordCard({
  word,
  onGuess,
  disabled = false,
}: WordCardProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [gameState, setGameState] = useState<GameState>("playing");

  // Reset state when word changes
  useEffect(() => {
    setSelectedGender(null);
    setGameState("playing");
  }, [word]);

  const handleGuess = (guess: Gender) => {
    if (disabled || gameState !== "playing") return;

    const isCorrect = guess === word.article;
    setSelectedGender(guess);
    setGameState(isCorrect ? "correct" : "incorrect");

    // Delay the callback to allow feedback to be shown
    onGuess(guess, isCorrect);
  };

  return (
    <Card>
      <Word>{word.word}</Word>
      <ButtonGroup>
        <GenderButton
          onClick={() => handleGuess("der")}
          $selected={selectedGender === "der"}
          $correct={gameState !== "playing" && word.article === "der"}
          $incorrect={gameState === "incorrect" && selectedGender === "der"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          der
        </GenderButton>
        <GenderButton
          onClick={() => handleGuess("die")}
          $selected={selectedGender === "die"}
          $correct={gameState !== "playing" && word.article === "die"}
          $incorrect={gameState === "incorrect" && selectedGender === "die"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          die
        </GenderButton>
        <GenderButton
          onClick={() => handleGuess("das")}
          $selected={selectedGender === "das"}
          $correct={gameState !== "playing" && word.article === "das"}
          $incorrect={gameState === "incorrect" && selectedGender === "das"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          das
        </GenderButton>
      </ButtonGroup>

      {gameState !== "playing" && (
        <Feedback
          isCorrect={gameState === "correct"}
          correctArticle={word.article}
          word={word.word}
        />
      )}
    </Card>
  );
}
