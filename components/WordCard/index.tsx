// components/WordCard/index.tsx
import { useState, useEffect } from "react";
import type { Gender, GermanWord } from "@/types";
import { Feedback } from "../Feedback";
import type { GameState } from "@/types/game";
import { Card, Word, ButtonGroup, Button } from "../styles";

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

  useEffect(() => {
    setSelectedGender(null);
    setGameState("playing");
  }, [word]);

  const handleGuess = (guess: Gender) => {
    if (disabled || gameState !== "playing") return;

    const isCorrect = guess === word.article;
    setSelectedGender(guess);
    setGameState(isCorrect ? "correct" : "incorrect");
    onGuess(guess, isCorrect);
  };

  return (
    <Card>
      <Word>{word.word}</Word>
      <ButtonGroup>
        <Button
          onClick={() => handleGuess("der")}
          $variant={selectedGender === "der" ? "primary" : "secondary"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          der
        </Button>
        <Button
          onClick={() => handleGuess("die")}
          $variant={selectedGender === "die" ? "primary" : "secondary"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          die
        </Button>
        <Button
          onClick={() => handleGuess("das")}
          $variant={selectedGender === "das" ? "primary" : "secondary"}
          disabled={disabled || gameState !== "playing"}
          type="button"
        >
          das
        </Button>
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
