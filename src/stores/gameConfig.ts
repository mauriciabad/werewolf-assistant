import type { CharacterId } from "@/data/characters.types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

type CharacterConfig = { id: CharacterId; amount: number };
export type GameConfig = {
  characters: CharacterConfig[];
};

export const useGameConfigStore = defineStore({
  id: "gameConfig",

  state: () => ({
    characters: useStorage<CharacterConfig[]>("characters", []),
  }),

  getters: {
    totalCharacters: (state) =>
      state.characters.reduce((total, { amount }) => total + amount, 0),
  },
  actions: {
    setCharacterAmount(characterId: CharacterId, amount: number): void {
      const character = this.characters.find(
        (character) => character.id === characterId
      );

      if (character) {
        character.amount = amount;
      } else {
        this.characters.push({ id: characterId, amount });
      }
    },
  },
});
