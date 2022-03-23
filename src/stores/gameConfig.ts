import type { CharacterId } from "@/data/characters.types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { AbilityId } from "@/data/abilities.types";

export type CharacterConfig = { id: CharacterId; amount: number };
export type PlayerConfig = {
  id: number;
  name: string;
  character: CharacterId;
  abilities: AbilityId[];
};

export const useGameConfigStore = defineStore({
  id: "gameConfig",

  state: () => ({
    characters: useStorage<CharacterConfig[]>("characters", []),
    players: useStorage<PlayerConfig[]>("players", []),
  }),

  getters: {},

  actions: {
    createNewGame(characters: CharacterConfig[]): void {
      this.characters = characters;

      this.players = createPlayers(characters);
    },
  },
});

function createPlayers(characters: CharacterConfig[]): PlayerConfig[] {
  const allCharacters: CharacterId[] = [];
  for (const character of characters) {
    for (let i = 0; i < character.amount; i++) {
      allCharacters.push(character.id);
    }
  }
  shuffle(allCharacters);

  let lastId = 1;
  const result: PlayerConfig[] = [];
  for (const characterId of allCharacters) {
    const playerId = lastId++;
    result.push({
      id: playerId,
      name: `Player ${playerId}`,
      character: characterId,
      abilities: ["extra-vote"],
    });
  }

  return result;
}

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
