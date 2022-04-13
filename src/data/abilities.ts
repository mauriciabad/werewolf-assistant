import type { Ability, AbilityId } from './abilities.types'

const abilities: Ability[] = [
  {
    id: 'a:nothing',
    ilustration: 'prohibited',
  },
  {
    id: 'a:extra-life',
    ilustration: 'revive',
  },
  {
    id: 'a:extra-vote',
    ilustration: 'vote',
  },
  {
    id: 'a:cupid',
    ilustration: 'cupid',
  },
  {
    id: 'a:major',
    ilustration: 'sheriff',
  },
]

export function getAbility(id: AbilityId): Ability
export function getAbility(id: string): Ability | undefined
export function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id)
}

export default abilities
