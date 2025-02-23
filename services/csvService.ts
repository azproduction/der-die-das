// services/csvService.ts
import Papa from "papaparse";
import type { Gender, GermanWord } from "@/types";

export interface CSVRow {
  Word: string;
  Article: string;
}

export async function loadWords(): Promise<GermanWord[]> {
  try {
    const response = await fetch("/data/nouns.csv");
    if (!response.ok) {
      throw new Error("Failed to fetch CSV file");
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const words = (results.data as CSVRow[]).map((row) => ({
            word: row.Word,
            article: row.Article.toLowerCase() as Gender,
          }));
          resolve(words);
        },
        error: (error) => {
          reject(new Error(`CSV parsing failed: ${error.message}`));
        },
      });
    });
  } catch (error) {
    throw new Error(
      `Failed to load words: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export function getRandomWord(words: GermanWord[]): GermanWord {
  if (words.length === 0) {
    throw new Error("No words available");
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
