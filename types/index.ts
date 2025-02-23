// types/index.ts
export type Gender = "der" | "die" | "das";
export type Case = "nominative" | "accusative" | "dative";

export interface GermanWord {
  word: string;
  article: Gender;
}

export interface QuizState {
  word: GermanWord;
  preposition: string;
  case: Case;
  correctArticle: string;
  correctEnding: string;
}

// components/WordCard/types.ts
export interface WordCardProps {
  word: GermanWord;
  onGuess: (guess: Gender) => void;
  isLoading?: boolean;
}

// components/AdjectiveQuiz/types.ts
export interface AdjectiveQuizProps {
  quizState: QuizState;
  onSubmit: (articleGuess: string, endingGuess: string) => void;
  onNext: () => void;
}

// components/App/types.ts
export interface AppState {
  words: GermanWord[];
  currentWord: GermanWord | null;
  currentQuiz: QuizState | null;
  gameState: "word" | "quiz" | "feedback";
  score: {
    correct: number;
    total: number;
  };
}

// State Management Flow:
/*
1. App Component (State Container)
   │
   ├── WordCard Component
   │   │── Word Display
   │   └── Gender Selection Buttons
   │
   └── AdjectiveQuiz Component
       │── Sentence Construction
       │── Article Dropdown
       └── Adjective Ending Dropdown

State Transitions:
1. Initial State:
   - Load words from CSV
   - Select random word
   - Show WordCard

2. After Gender Selection:
   If correct:
   - Update score
   - Select new random word
   - Stay on WordCard

   If incorrect:
   - Generate quiz state
   - Switch to AdjectiveQuiz
   - Show feedback

3. After Quiz:
   - Update score
   - Select new random word
   - Return to WordCard

Data Flow:
1. Word Selection:
   App -> WordCard

2. Gender Guess:
   WordCard -> App

3. Quiz State:
   App -> AdjectiveQuiz

4. Quiz Answer:
   AdjectiveQuiz -> App
*/

// Preposition Configuration
export const PREPOSITIONS = {
  accusative: ["durch", "für", "gegen", "ohne", "um"],
  dative: ["aus", "bei", "mit", "nach", "von", "zu"],
  twoWay: [
    "an",
    "auf",
    "hinter",
    "in",
    "neben",
    "über",
    "unter",
    "vor",
    "zwischen",
  ],
} as const;

// Adjective Endings Matrix
export const ADJECTIVE_ENDINGS = {
  nominative: {
    der: "e",
    die: "e",
    das: "e",
  },
  accusative: {
    der: "en",
    die: "e",
    das: "e",
  },
  dative: {
    der: "en",
    die: "en",
    das: "en",
  },
} as const;

// Example Quiz Generation Function
export function generateQuiz(word: GermanWord): QuizState {
  // Will be implemented to:
  // 1. Select random preposition
  // 2. Determine case based on preposition
  // 3. Generate correct article and ending
  // 4. Return quiz state
  return {
    word,
    preposition: "",
    case: "nominative",
    correctArticle: "",
    correctEnding: "",
  };
}
