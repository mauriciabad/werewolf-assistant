import type { CustomAbility } from '@/data/abilities.types'
import type { CustomCharacter } from '@/data/characters.types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useCustomDataStore = defineStore({
  id: 'customData',

  state: () => ({
    customCharacters: useStorage<CustomCharacter[]>('customCharacters', []),
    customAbilities: useStorage<CustomAbility[]>('customAbilities', []),
  }),

  getters: {},

  actions: {
    saveCustomCharacter(customCharacter: CustomCharacter): void {
      const index = this.customCharacters.findIndex(
        ({ id }) => id === customCharacter.id
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
      const customCharacter = this.customCharacters.find(
        (customCharacter) => customCharacter.id === id
      )

      if (!customCharacter) throw new Error('Invalid id')

      return customCharacter
    },

    saveCustomAbility(customAbility: CustomAbility): void {
      const index = this.customAbilities.findIndex(
        ({ id }) => id === customAbility.id
      )

      if (index === -1) {
        this.customAbilities = [...this.customAbilities, customAbility]
        return
      }

      this.customAbilities[index] = customAbility
    },

    removeCustomAbility(id: CustomAbility['id']): void {
      this.customAbilities = this.customAbilities.filter(
        (customAbility) => customAbility.id !== id
      )
    },

    // TODO: Overloas this function
    // getCustomAbility(id: CustomAbility['id']): CustomAbility
    // getCustomAbility(id: string): CustomAbility | undefined
    // getCustomAbility(id: string): CustomAbility | undefined {
    getCustomAbility(id: CustomAbility['id']): CustomAbility {
      const customAbility = this.customAbilities.find(
        (customAbility) => customAbility.id === id
      )

      if (!customAbility) throw new Error('Invalid id')

      return customAbility
    },
  },
})
