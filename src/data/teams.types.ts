import type { IlustrationId } from './ilustrations'

export type TeamId = 'werewolfs' | 'villagers' | 'alone' | 'other'

export interface Team {
  id: TeamId
  name: string
  description: string
  objective: string
  ilustration: IlustrationId
}
