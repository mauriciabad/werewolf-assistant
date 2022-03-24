import type { Action } from "./actions.types";

export const firstNightActions: Action[] = [
  {
    name: "Cupid",
    description: "Cupid chooses the lovers and they look at each other",
    requiredAbilities: ["cupid"],
  },
  {
    name: "Werewolfs see each other",
    description: "Werewolfs just see each other, no killing",
    requiredCharacters: ["werewolf"],
  },
];

export const nightActions: Action[] = [
  {
    name: "Werewolfs kill",
    description: "Werewolfs vote someone to kill",
    requiredCharacters: ["werewolf"],
  },
];
