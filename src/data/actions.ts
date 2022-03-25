import type { Action } from './actions.types'

export const firstNightActions: Action[] = [
  {
    name: 'Cupid',
    description: 'Cupid chooses the lovers and they look at each other',
    requiredAbilities: ['cupid'],
  },
  {
    name: 'Feral kid',
    description: 'Feral kid picks an adoptive parent',
    requiredCharacters: ['feral-kid'],
  },
  {
    name: 'Triplets',
    description: 'Triplets see each other',
    requiredCharacters: ['triplet'],
  },
  {
    name: 'Twins',
    description: 'Twins see each other',
    requiredCharacters: ['twin'],
  },
  {
    name: 'Werewolfs see each other',
    description: 'Werewolfs just see each other, no killing',
    requiredCharacters: ['werewolf'],
  },
  {
    name: 'Village wakes up',
    description: 'Everyone opens their eyes',
  },
  {
    name: 'Villager-Villager',
    description: 'Villager-Villager is revealed',
    requiredCharacters: ['villager-villager'],
  },
]

export const nightActions: Action[] = [
  {
    name: 'Seer',
    description: 'Seer picks a player to look at and sees their role',
    requiredCharacters: ['seer'],
  },
  {
    name: 'Werewolfs kill',
    description: 'Werewolfs vote someone to kill',
    requiredCharacters: ['werewolf'],
  },
  {
    name: 'Witch',
    description: 'Witch chooses to save or kills a player',
    requiredCharacters: ['witch'],
  },
  {
    name: 'Doctor',
    description: 'Witch chooses to save player',
    requiredCharacters: ['doctor'],
  },
  {
    name: 'Baker',
    description: 'Baker gives bread to a player and reveals his role',
    requiredCharacters: ['baker'],
  },
]
