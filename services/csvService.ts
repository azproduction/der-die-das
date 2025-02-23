// services/csvService.ts
import Papa from "papaparse";
import type { Gender, GermanWord } from "@/types";

export interface CSVRow {
  Word: string;
  Example: string;
}

const suffixes: Record<Gender, string[]> = {
  der: [
    "ig",
    "ling",
    "ismus",
    "ist",
    "or",
    "us",
    "ant",
    "ent",
    "er",
    "ich",
    "eur",
  ],
  die: [
    "heit",
    "keit",
    "ung",
    "schaft",
    "tät",
    "ion",
    "ik",
    "ie",
    "enz",
    "anz",
    "ur",
    "e",
    "ei",
    "in",
    "age",
    "ode",
    "ade",
    "ive",
    "tte",
    "itis",
    "isse",
    "sis",
  ],
  das: [
    "chen",
    "lein",
    "ment",
    "tum",
    "um",
    "ma",
    "ett",
    "ment",
    "ett",
    "sal",
    "il",
    "at",
    "ing",
    "nis",
    "o",
  ],
};

const suffixRegexes = Object.fromEntries(
  Object.entries(suffixes).map(([key, value]) => {
    return [key as Gender, new RegExp(`(${value.join("|")})$`)];
  }),
);

export async function loadWords(): Promise<GermanWord[]> {
  try {
    const response = await fetch("/data/b1-word-list.csv");
    if (!response.ok) {
      throw new Error("Failed to fetch CSV file");
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const words = (results.data as CSVRow[])
            .filter((row) => {
              return (
                row.Word.startsWith("der ") ||
                row.Word.startsWith("die ") ||
                row.Word.startsWith("das ")
              );
            })
            .map((row) => {
              const word = row.Word.split(",")[0].split(" ")[1].split("/")[0];
              const article = row.Word.split(" ")[0].toLowerCase() as Gender;
              const regexp = suffixRegexes[article];
              let magicalSuffix: undefined | [string, string] = undefined;
              const suffix = (word.match(regexp) ?? [])[1];

              if (suffix) {
                magicalSuffix = [word.replace(regexp, ""), suffix];
              }

              return {
                word,
                article,
                note: row.Word,
                example: row.Example,
                magicalSuffix,
              };
            });
          resolve(words);
        },
        error: (cause: Error) => {
          reject(
            new Error(`CSV parsing failed`, {
              cause,
            }),
          );
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
