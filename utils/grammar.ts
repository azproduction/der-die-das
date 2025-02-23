import { Case, Gender } from "@/types";

export function getCorrectArticle(
  baseArticle: Gender,
  grammarCase: Case,
): string {
  const articleMatrix = {
    nominative: { der: "der", die: "die", das: "das" },
    accusative: { der: "den", die: "die", das: "das" },
    dative: { der: "dem", die: "der", das: "dem" },
  };
  return articleMatrix[grammarCase][baseArticle];
}

export function getCorrectEnding(
  baseArticle: Gender,
  grammarCase: Case,
): string {
  const endingMatrix = {
    nominative: { der: "e", die: "e", das: "e" },
    accusative: { der: "en", die: "e", das: "e" },
    dative: { der: "en", die: "en", das: "en" },
  };
  return endingMatrix[grammarCase][baseArticle];
}
