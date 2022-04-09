import type {
  Ability,
  AbilityId,
  CustomAbility,
  CustomAbilityId,
} from './abilities.types'
import { getCharacter } from './characters'
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

export interface Character {
  id: CharacterId
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
  id: CharacterId | CustomCharacterId | AbilityId | CustomAbilityId | string
): id is CustomCharacterId {
  return id.startsWith('custom-character-')
}

export function isCustomCharacter(
  data: Character | CustomCharacter | Ability | CustomAbility
): data is CustomCharacter {
  return isCustomCharacterId(data.id)
}

export function isCharacterId(
  id: CharacterId | CustomCharacterId | AbilityId | CustomAbilityId | string
): id is CharacterId {
  return getCharacter(id) !== undefined
}

export function isCharacter(
  data: Character | CustomCharacter | Ability | CustomAbility
): data is Character {
  return isCharacterId(data.id)
}
