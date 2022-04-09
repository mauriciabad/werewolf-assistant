import { getAbility } from './abilities'
import type {
  CharacterId,
  CustomCharacterId,
  Character,
  CustomCharacter,
} from './characters.types'
import type { IlustrationId } from './ilustrations'

export type AbilityId =
  | 'extra-life'
  | 'extra-vote'
  | 'cupid'
  | 'major'
  | 'nothing'

export interface Ability {
  id: AbilityId
  name: string
  description: string
  ilustration: IlustrationId
}

export type CustomAbilityId = `custom-ability-${number}`

export type CustomAbility = Omit<Ability, 'id'> & {
  id: CustomAbilityId
}

export function isCustomAbilityId(
  id: CharacterId | CustomCharacterId | AbilityId | CustomAbilityId | string
): id is CustomAbilityId {
  return id.startsWith('custom-ability-')
}

export function isCustomAbility(
  data: Character | CustomCharacter | Ability | CustomAbility
): data is CustomAbility {
  return isCustomAbilityId(data.id)
}

export function isAbilityId(
  id: CharacterId | CustomCharacterId | AbilityId | CustomAbilityId | string
): id is AbilityId {
  return getAbility(id) !== undefined
}

export function isAbility(
  data: Character | CustomCharacter | Ability | CustomAbility
): data is Ability {
  return isAbilityId(data.id)
}
