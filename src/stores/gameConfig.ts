import type { AbilityId, CustomAbilityId } from '@/data/abilities.types'
import { firstNightActions, nightActions } from '@/data/actions'
import type { Action } from '@/data/actions.types'
import type { CharacterId, CustomCharacterId } from '@/data/characters.types'
import i18n from '@/i18n'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

// TODO: Fix the yype and remove @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { t } = i18n.global

export type CharacterConfig = {
  id: CharacterId | CustomCharacterId
  amount: number
}
export type AbilityConfig = {
  id: AbilityId | CustomAbilityId
  amount: number
}
export type PlayerConfig = {
  id: number
  name: string
  character: CharacterId | CustomCharacterId
  abilities: (AbilityId | CustomAbilityId)[]
}

export const useGameConfigStore = defineStore({
  id: 'gameConfig',

  state: () => ({
    characters: useStorage<CharacterConfig[]>('characters', []),
    abilities: useStorage<AbilityConfig[]>('abilities', []),
    players: useStorage<PlayerConfig[]>('players', []),
    firstNightActions: useStorage<Action[]>('firstNightActions', []),
    nightActions: useStorage<Action[]>('nightActions', []),
    creationDate: useStorage<Date>('creationDate', new Date()),
  }),

  getters: {},

  actions: {
    createNewGame(
      characters: CharacterConfig[],
      abilities: AbilityConfig[],
      playerNames: string[],
      creationDate: Date
    ): void {
      this.characters = characters
      this.abilities = abilities

      this.firstNightActions = firstNightActions.filter(
        (action) =>
          gameHasAllActionAbilities(action, abilities) &&
          gameHasAllActionCharacters(action, characters)
      )

      this.nightActions = nightActions.filter(
        (action) =>
          gameHasAllActionAbilities(action, abilities) &&
          gameHasAllActionCharacters(action, characters)
      )

      this.players = createPlayers(characters, abilities, playerNames)

      this.creationDate = creationDate
    },

    resetGame(): void {
      this.characters = []
      this.abilities = []
      this.players = []
      this.firstNightActions = []
      this.nightActions = []
      this.creationDate = new Date()
    },
  },
})

function createPlayers(
  characters: CharacterConfig[],
  abilities: AbilityConfig[],
  playerNames: string[]
): PlayerConfig[] {
  const allCharacters: CharacterConfig['id'][] = []
  for (const character of characters) {
    for (let i = 0; i < character.amount; i++) {
      allCharacters.push(character.id)
    }
  }
  shuffle(allCharacters)

  const allAbilities: AbilityConfig['id'][] = []
  for (const ability of abilities) {
    for (let i = 0; i < ability.amount; i++) {
      allAbilities.push(ability.id)
    }
  }
  shuffle(allAbilities)

  const abilitiesPerPlayer =
    allCharacters.length === 0
      ? 0
      : Math.floor(allAbilities.length / allCharacters.length)

  let lastId = 1
  let lastPlayerNameIndex = 0
  let lastAbilityAssignedIndex = 0
  const result: PlayerConfig[] = []
  for (const characterId of allCharacters) {
    const playerId = lastId++
    const playerName: string | undefined = playerNames[lastPlayerNameIndex]
    const nextAbilityAssignedIndex =
      lastAbilityAssignedIndex + abilitiesPerPlayer
    result.push({
      id: playerId,
      name: playerName ?? t('ui.playerNameGenerator', { id: playerId }),
      character: characterId,
      abilities: allAbilities.slice(
        lastAbilityAssignedIndex,
        nextAbilityAssignedIndex
      ),
    })
    lastAbilityAssignedIndex = nextAbilityAssignedIndex
    lastPlayerNameIndex += 1
  }

  return result
}

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function gameHasAllActionAbilities(
  action: Action,
  abilities: AbilityConfig[]
): boolean {
  if (!action.requiredAbilities) return true

  return action.requiredAbilities.every((id) =>
    abilities.some((ability) => ability.id === id)
  )
}

function gameHasAllActionCharacters(
  action: Action,
  characters: CharacterConfig[]
): boolean {
  if (!action.requiredCharacters) return true

  return action.requiredCharacters.every((id) =>
    characters.some((character) => character.id === id)
  )
}
