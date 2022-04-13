import type { Ability, AbilityId } from './abilities.types'

const abilities: Ability[] = [
  {
    id: 'nothing',
    ilustration: 'prohibited',
  },
  {
    id: 'extra-life',
    ilustration: 'revive',
  },
  {
    id: 'extra-vote',
    ilustration: 'vote',
  },
  {
    id: 'cupid',
    ilustration: 'cupid',
  },
  {
    id: 'major',
    ilustration: 'sheriff',
  },
]

export function getAbility(id: AbilityId): Ability
export function getAbility(id: string): Ability | undefined
export function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id)
}

export default abilities
