import type { Character, CharacterId } from './characters.types'

const characters: Character[] = [
  {
    id: 'werewolf',
    team: 'werewolfs',
    ilustration: 'werewolf',
  },
  {
    id: 'villager',
    team: 'villagers',
    ilustration: 'boy',
  },
  {
    id: 'nudist',
    team: 'villagers',
    ilustration: 'naked',
  },
  {
    id: 'seer',
    team: 'villagers',
    ilustration: 'fortuneTeller',
  },
  {
    id: 'suicide',
    team: 'alone',
    ilustration: 'crimeScene',
  },
  {
    id: 'feral-kid',
    team: 'other',
    ilustration: 'nativeAmerican',
  },
  {
    id: 'baker',
    team: 'villagers',
    ilustration: 'baker',
  },
  {
    id: 'triplet',
    team: 'villagers',
    ilustration: 'triplet',
  },
  {
    id: 'twin',
    team: 'villagers',
    ilustration: 'twins',
  },
  {
    id: 'witch',
    team: 'villagers',
    ilustration: 'witch',
  },
  {
    id: 'doctor',
    team: 'villagers',
    ilustration: 'doctor',
  },
]

export function getCharacter(id: CharacterId): Character
export function getCharacter(id: string): Character | undefined
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id)
}

export default characters
