import type { Action } from './actions.types'

export const firstNightActions: Action[] = [
  { id: 'major-revealed', requiredAbilities: ['a:major'] },
  { id: 'village-goes-to-sleep' },
  { id: 'cupid-shoots', requiredAbilities: ['a:cupid'] },
  { id: 'feral-kid-chooses-parents', requiredCharacters: ['c:feral-kid'] },
  { id: 'triplets-meet', requiredCharacters: ['c:triplet'] },
  { id: 'twins-meet', requiredCharacters: ['c:twin'] },
  { id: 'werewolves-meet', requiredCharacters: ['c:werewolf'] },
  { id: 'collejas-attacks', requiredAbilities: ['a:collejas'] },
  { id: 'village-wakes-up' },
  { id: 'nudist-revealed', requiredCharacters: ['c:nudist'] },
]

export const nightActions: Action[] = [
  { id: 'ghost-decides', requiredAbilities: ['a:ghost'] },
  { id: 'seer-guesses', requiredCharacters: ['c:seer'] },
  { id: 'werewolves-kill', requiredCharacters: ['c:werewolf'] },
  { id: 'witch-kills-or-saves', requiredCharacters: ['c:witch'] },
  { id: 'doctor-saves', requiredCharacters: ['c:doctor'] },
  { id: 'baker-gives-bread', requiredCharacters: ['c:baker'] },
  { id: 'collejas-attacks', requiredAbilities: ['a:collejas'] },
]
