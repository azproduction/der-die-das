import { useState, useEffect } from "react";
import styled from "styled-components";
import type { Gender, GermanWord } from "@/types";

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

const GenderButton = styled.button<{ $selected?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: 2px solid black;
  background: ${(props) => (props.$selected ? "black" : "white")};
  color: ${(props) => (props.$selected ? "white" : "black")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-geist-sans);
  min-width: 100px;

  &:hover {
    background: ${(props) => (props.$selected ? "black" : "#f0f0f0")};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid blue;
    outline-offset: 2px;
  }
`;

interface WordCardProps {
  word: GermanWord;
  onGuess: (guess: Gender) => void;
  disabled?: boolean;
}

export default function WordCard({
  word,
  onGuess,
  disabled = false,
}: WordCardProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  // Reset selection when word changes
  useEffect(() => {
    setSelectedGender(null);
  }, [word]);

  const handleGuess = (gender: Gender) => {
    if (disabled) return;
    setSelectedGender(gender);
    onGuess(gender);
  };

  return (
    <Card>
      <Word>{word.word}</Word>
      <ButtonGroup>
        <GenderButton
          onClick={() => handleGuess("der")}
          $selected={selectedGender === "der"}
          disabled={disabled}
          type="button"
        >
          der
        </GenderButton>
        <GenderButton
          onClick={() => handleGuess("die")}
          $selected={selectedGender === "die"}
          disabled={disabled}
          type="button"
        >
          die
        </GenderButton>
        <GenderButton
          onClick={() => handleGuess("das")}
          $selected={selectedGender === "das"}
          disabled={disabled}
          type="button"
        >
          das
        </GenderButton>
      </ButtonGroup>
    </Card>
  );
}
