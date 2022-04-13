import type { IlustrationId } from './ilustrations'

export type TeamId = 'werewolves' | 'villagers' | 'alone' | 'other'

export interface Team {
  id: TeamId
  name: string
  description: string
  objective: string
  ilustration: IlustrationId
}
