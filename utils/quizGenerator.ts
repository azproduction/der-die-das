import { AdjectiveQuizState } from "@/types/quiz";

export const adjectives = `
gut
groß
klein
neu
alt
schön
schlecht
wichtig
einfach
schwierig
schnell
langsam
teuer
billig
interessant
langweilig
glücklich
traurig
müde
gesund
krank
freundlich
unfreundlich
nett
stark
schwach
kalt
warm
heiß
sauber
schmutzig
fern
weit
ruhig
laut
frei
lustig
ernst
gefährlich
pünktlich
spät
`
  .trim()
  .split("\n")
  .map((word: string) => word.trim());

export const twoWayPreps = `
an
auf
hinter
in
neben
über
unter
vor
`
  .trim()
  .split("\n")
  .map((word: string) => word.trim());

const dativePreps = `
aus
außer
bei
mit
nach
seit
von
zu
gegenüber
`
  .trim()
  .split("\n")
  .map((word: string) => word.trim());

const accusativePreps = `
durch
für
gegen
ohne
um
entlang
wider
`
  .trim()
  .split("\n")
  .map((word: string) => word.trim());

export function generateQuizState(): AdjectiveQuizState {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const isTwoWayPrep = Math.random() > 0.5;

  if (isTwoWayPrep) {
    const preposition =
      twoWayPreps[Math.floor(Math.random() * twoWayPreps.length)];
    const isDirectional = Math.random() > 0.5;
    return {
      preposition,
      case: isDirectional ? "accusative" : "dative",
      adjective,
      isDirectional,
    };
  } else {
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
