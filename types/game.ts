export type GameState = "playing" | "correct" | "incorrect" | "quiz";

export interface GameStatus {
  state: GameState;
  message?: string;
}
