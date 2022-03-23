import type { Character, CharacterId } from "./characters.types";

const characters: Character[] = [
  {
    id: "werewolf",
    name: "Werewolf",
    description:
      "During the night votes to kill someone with the other wolfs in secret. \nYour objective is to reduce the number of villagers to the same as werewolfs.",
    team: "werewolfs",
  },
  {
    id: "villager",
    name: "Villager",
    description:
      "During the day votes to kill someone with everyone. \nYour objective is to kill all werewolfs.",
    team: "villagers",
  },
];

export function getCharacter(id: CharacterId): Character;
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id);
}

export default characters;
