import type { Ability, AbilityId } from './abilities.types'

const abilities: Ability[] = [
  { id: 'a:nothing', ilustration: 'prohibited' },
  { id: 'a:extra-life', ilustration: 'revive' },
  { id: 'a:extra-vote', ilustration: 'vote' },
  { id: 'a:cupid', ilustration: 'cupid' },
  { id: 'a:major', ilustration: 'sheriff' },
  { id: 'a:extra-life-key', ilustration: 'key' },
  { id: 'a:extra-life-lock', ilustration: 'heart' },
  { id: 'a:reveal-ability', ilustration: 'detective' },
  { id: 'a:save-someone-else', ilustration: 'give' },
  { id: 'a:steal-ability', ilustration: 'thief' },
  { id: 'a:poison', ilustration: 'poison' },
  { id: 'a:cancel-revive', ilustration: 'artAndDesign' },
  { id: 'a:handcuffs', ilustration: 'jail' },
  { id: 'a:protect', ilustration: 'shield' },
  { id: 'a:beatboxer', ilustration: 'rapper' },
  { id: 'a:collejas', ilustration: 'fist' },
  { id: 'a:ghost', ilustration: 'ghost' },
  { id: 'a:nose-club', ilustration: 'nose' },
  { id: 'a:president-call', ilustration: 'telephone' },
  { id: 'a:secret-keeper', ilustration: 'trustworthy' },
]

export function getAbility(id: AbilityId): Ability
export function getAbility(id: string): Ability | undefined
export function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id)
}

export default abilities
