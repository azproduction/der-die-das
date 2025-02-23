import { type Config } from "prettier";

const config: Config = {
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  bracketSameLine: false,
  jsxSingleQuote: true,
  parser: "typescript",
  printWidth: 120,
  proseWrap: "preserve",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
};

export default config;
