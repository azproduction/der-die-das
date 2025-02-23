import type { GermanWord } from "@/types";

export class WordSelector {
  private words: GermanWord[];
  private usedWords: Set<string>;
  private currentWord: GermanWord | null;

  constructor(words: GermanWord[]) {
    this.words = [...words]; // Make a copy to preserve original
    this.usedWords = new Set();
    this.currentWord = null;
  }

  getNextWord(): GermanWord {
    // If we've used all words, reset the history
    if (this.usedWords.size >= this.words.length - 1) {
      this.usedWords.clear();
      // Keep current word in used words to prevent immediate repetition
      if (this.currentWord) {
        this.usedWords.add(this.currentWord.word);
      }
    }

    // Filter out used words
    const availableWords = this.words.filter(
      (word) => !this.usedWords.has(word.word),
    );

    // Select random word from available words
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];

    // Update state
    this.currentWord = selectedWord;
    this.usedWords.add(selectedWord.word);

    return selectedWord;
  }

  // Get list of remaining unused words
  getRemainingCount(): number {
    return this.words.length - this.usedWords.size;
  }

  // Reset the selector
  reset(): void {
    this.usedWords.clear();
    this.currentWord = null;
  }
}
