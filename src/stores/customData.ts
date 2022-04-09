import type { CustomCharacter } from '@/data/characters.types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useCustomDataStore = defineStore({
  id: 'customData',

  state: () => ({
    customCharacters: useStorage<CustomCharacter[]>('customCharacters', []),
  }),

  getters: {},

  actions: {
    saveCustomCharacter(customCharacter: CustomCharacter): void {
      const index = this.customCharacters.findIndex(
        (character) => character.id === customCharacter.id
      )

      if (index === -1) {
        this.customCharacters = [...this.customCharacters, customCharacter]
        return
      }

      this.customCharacters[index] = customCharacter
    },

    removeCustomCharacter(id: CustomCharacter['id']): void {
      this.customCharacters = this.customCharacters.filter(
        (customCharacter) => customCharacter.id !== id
      )
    },

    // TODO: Overloas this function
    // getCustomCharacter(id: CustomCharacter['id']): CustomCharacter
    // getCustomCharacter(id: string): CustomCharacter | undefined
    // getCustomCharacter(id: string): CustomCharacter | undefined {
    getCustomCharacter(id: CustomCharacter['id']): CustomCharacter {
      return this.customCharacters.find(
        (customCharacter) => customCharacter.id === id
      )!
    },
  },
})
