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
  id: CharacterId | CustomCharacterId
): id is CustomCharacterId {
  return id.startsWith('custom-character-')
}
