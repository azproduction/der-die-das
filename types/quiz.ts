import { Case } from "@/types/index";

export interface AdjectiveQuizState {
  preposition: string;
  case: Case;
  adjective: string;
  isDirectional?: boolean;
}
