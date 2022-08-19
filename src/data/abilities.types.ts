import type { IlustrationId } from './ilustrations'

export type AbilityId =
  | 'a:extra-life'
  | 'a:extra-vote'
  | 'a:cupid'
  | 'a:major'
  | 'a:nothing'
  | 'a:extra-life-key'
  | 'a:extra-life-lock'
  | 'a:reveal-ability'
  | 'a:save-someone-else'
  | 'a:steal-ability'
  | 'a:poison'
  | 'a:cancel-revive'
  | 'a:protect'
  | 'a:collejas'
  | 'a:beatboxer'
  | 'a:ghost'
  | 'a:handcuffs'
  | 'a:secret-keeper'
  | 'a:nose-club'

export interface Ability {
  id: AbilityId
  ilustration: IlustrationId
}

export type CustomAbilityId = `ca:${number}`

export type CustomAbility = Omit<Ability, 'id'> & {
  id: CustomAbilityId
  name: string
  description: string
}

export function isCustomAbilityId(id: string): id is CustomAbilityId {
  return id.startsWith('ca:')
}

export function isCustomAbility(data: { id: string }): data is CustomAbility {
  return isCustomAbilityId(data.id)
}

export function isAbilityId(id: string): id is AbilityId {
  return id.startsWith('a:')
}

export function isAbility(data: { id: string }): data is Ability {
  return isAbilityId(data.id)
}
