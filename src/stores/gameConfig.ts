import type { CharacterId } from "@/data/characters.types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { AbilityId } from "@/data/abilities.types";
import type { Action } from "@/data/actions.types";
import { firstNightActions, nightActions } from "@/data/actions";

export type CharacterConfig = { id: CharacterId; amount: number };
export type AbilitiesConfig = { id: AbilityId; amount: number };
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
    abilities: useStorage<AbilitiesConfig[]>("abilities", []),
    players: useStorage<PlayerConfig[]>("players", []),
    firstNightActions: useStorage<Action[]>("firstNightActions", []),
    nightActions: useStorage<Action[]>("nightActions", []),
  }),

  getters: {},

  actions: {
    createNewGame(characters: CharacterConfig[], abilities: AbilitiesConfig[]) {
      this.characters = characters;
      this.abilities = abilities;

      this.firstNightActions = firstNightActions.filter(
        (action) =>
          gameHasAllActionAbilities(action, abilities) &&
          gameHasAllActionCharacters(action, characters)
      );

      this.nightActions = nightActions.filter(
        (action) =>
          gameHasAllActionAbilities(action, abilities) &&
          gameHasAllActionCharacters(action, characters)
      );

      this.players = createPlayers(characters, abilities);
    },
  },
});

function createPlayers(
  characters: CharacterConfig[],
  abilities: AbilitiesConfig[]
): PlayerConfig[] {
  const allCharacters: CharacterId[] = [];
  for (const character of characters) {
    for (let i = 0; i < character.amount; i++) {
      allCharacters.push(character.id);
    }
  }
  shuffle(allCharacters);

  const allAbilities: AbilityId[] = [];
  for (const ability of abilities) {
    for (let i = 0; i < ability.amount; i++) {
      allAbilities.push(ability.id);
    }
  }
  shuffle(allAbilities);
  const abilitiesPerPlayer = Math.floor(
    allAbilities.length / characters.length
  );

  let lastId = 1;
  let lastAbilityAssignedIndex = 0;
  const result: PlayerConfig[] = [];
  for (const characterId of allCharacters) {
    const playerId = lastId++;
    result.push({
      id: playerId,
      name: `Player ${playerId}`,
      character: characterId,
      abilities: allAbilities.slice(
        lastAbilityAssignedIndex,
        lastAbilityAssignedIndex + abilitiesPerPlayer
      ),
    });
    lastAbilityAssignedIndex += abilitiesPerPlayer;
  }

  return result;
}

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gameHasAllActionAbilities(
  action: Action,
  abilities: AbilitiesConfig[]
): boolean {
  if (!action.requiredAbilities) return true;

  return action.requiredAbilities.every((id) =>
    abilities.some((ability) => ability.id === id)
  );
}

function gameHasAllActionCharacters(
  action: Action,
  characters: CharacterConfig[]
): boolean {
  if (!action.requiredCharacters) return true;

  return action.requiredCharacters.every((id) =>
    characters.some((character) => character.id === id)
  );
}
