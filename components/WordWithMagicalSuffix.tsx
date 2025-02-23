import { GermanWord } from "@/types";
import styled from "styled-components";

const MagicalSuffix = styled.span`
  text-decoration: underline;
`;

export function WordWithMagicalSuffix({ word }: { word: GermanWord }) {
  if (word.magicalSuffix) {
    return (
      <>
        <span>{word.magicalSuffix[0]}</span>
        <MagicalSuffix>{word.magicalSuffix[1]}</MagicalSuffix>
      </>
    );
  }
  return <span>{word.word}</span>;
}
