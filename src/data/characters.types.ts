import type { IlustrationId } from './ilustrations'
import type { TeamId } from './teams.types'

export type CharacterId =
  | 'c:werewolf'
  | 'c:lone-werewolf'
  | 'c:villager'
  | 'c:nudist'
  | 'c:seer'
  | 'c:suicide'
  | 'c:witch'
  | 'c:doctor'
  | 'c:triplet'
  | 'c:baker'
  | 'c:feral-kid'
  | 'c:twin'
  | 'c:scarecrow'

export interface Character {
  id: CharacterId
  ilustration: IlustrationId
  team: TeamId
}
export type CustomCharacterId = `cc:${number}`

export type CustomCharacter = Omit<Character, 'id'> & {
  id: CustomCharacterId
  name: string
  description: string
}

export function isCustomCharacterId(id: string): id is CustomCharacterId {
  return id.startsWith('cc:')
}

export function isCustomCharacter(data: {
  id: string
}): data is CustomCharacter {
  return isCustomCharacterId(data.id)
}

export function isCharacterId(id: string): id is CharacterId {
  return id.startsWith('c:')
}

export function isCharacter(data: { id: string }): data is Character {
  return isCharacterId(data.id)
}
