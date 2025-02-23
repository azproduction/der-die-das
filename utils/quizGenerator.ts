import { GermanWord } from "@/types";
import { AdjectiveQuizState } from "@/types/quiz";

export const ADJECTIVES = [
  "groß",
  "klein",
  "neu",
  "alt",
  "gut",
  "schön",
] as const;

export const TWO_WAY_PREPOSITIONS = {
  in: { accusative: "into", dative: "inside" },
  an: { accusative: "onto", dative: "at" },
  auf: { accusative: "onto", dative: "on top of" },
  hinter: { accusative: "to behind", dative: "behind" },
  neben: { accusative: "to beside", dative: "beside" },
  über: { accusative: "to above", dative: "above" },
  unter: { accusative: "to under", dative: "under" },
  vor: { accusative: "to in front of", dative: "in front of" },
  zwischen: { accusative: "to between", dative: "between" },
} as const;

export function generateQuizState(word: GermanWord): AdjectiveQuizState {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const isTwoWayPrep = Math.random() > 0.5;

  if (isTwoWayPrep) {
    const prepKeys = Object.keys(TWO_WAY_PREPOSITIONS);
    const preposition = prepKeys[Math.floor(Math.random() * prepKeys.length)];
    const isDirectional = Math.random() > 0.5;
    return {
      preposition,
      case: isDirectional ? "accusative" : "dative",
      adjective,
      isDirectional,
    };
  } else {
    const dativePreps = ["aus", "bei", "mit", "nach", "von", "zu"];
    const accusativePreps = ["durch", "für", "gegen", "ohne", "um"];
    const useAccusative = Math.random() > 0.5;
    const prepositions = useAccusative ? accusativePreps : dativePreps;
    return {
      preposition:
        prepositions[Math.floor(Math.random() * prepositions.length)],
      case: useAccusative ? "accusative" : "dative",
      adjective,
    };
  }
}
