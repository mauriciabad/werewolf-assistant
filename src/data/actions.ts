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
  {
    name: "Village wakes up",
    description: "Everyone opens their eyes",
  },
  {
    name: "Villager-Villager",
    description: "Villager-Villager is revealed",
    requiredCharacters: ["villager-villager"],
  },
];

export const nightActions: Action[] = [
  {
    name: "Werewolfs kill",
    description: "Werewolfs vote someone to kill",
    requiredCharacters: ["werewolf"],
  },
];
