import type { Ability, AbilityId } from './abilities.types'
import characters, { getCharacter } from './characters'
import type { IlustrationId } from './ilustrations'
import type { TeamId } from './teams.types'

export type CharacterId =
  | 'werewolf'
  | 'villager'
  | 'nudist'
  | 'seer'
  | 'suicide'
  | 'witch'
  | 'doctor'
  | 'triplet'
  | 'baker'
  | 'feral-kid'
  | 'twin'

export interface Character<Id extends CharacterId = CharacterId> {
  id: Id
  name: string
  description: string
  ilustration: IlustrationId
  team: TeamId
}
export type CustomCharacterId = `custom-character-${number}`

export type CustomCharacter = Omit<Character, 'id'> & {
  id: CustomCharacterId
}

export function isCustomCharacterId(
  id: CharacterId | CustomCharacterId | AbilityId
): id is CustomCharacterId {
  return id.startsWith('custom-character-')
}

export function isCharacterId(
  id: CharacterId | CustomCharacterId | AbilityId
): id is CharacterId {
  return id in characters && getCharacter(id) !== undefined
}

export function isCharacter(
  data: Character | CustomCharacter | Ability
): data is Character {
  return isCharacterId(data.id)
}

export function isCustomCharacter(
  data: Character | CustomCharacter | Ability
): data is CustomCharacter {
  return data.id.startsWith('custom-character-')
}
