import type { Character, CharacterId } from './characters.types'

const characters: Character[] = [
  {
    id: 'c:werewolf',
    team: 'werewolves',
    ilustration: 'werewolf',
  },
  {
    id: 'c:lone-werewolf',
    team: 'werewolves',
    ilustration: 'werewolfDark',
  },
  {
    id: 'c:villager',
    team: 'villagers',
    ilustration: 'boy',
  },
  {
    id: 'c:nudist',
    team: 'villagers',
    ilustration: 'naked',
  },
  {
    id: 'c:seer',
    team: 'villagers',
    ilustration: 'fortuneTeller',
  },
  {
    id: 'c:suicide',
    team: 'alone',
    ilustration: 'crimeScene',
  },
  {
    id: 'c:feral-kid',
    team: 'other',
    ilustration: 'nativeAmerican',
  },
  {
    id: 'c:baker',
    team: 'villagers',
    ilustration: 'baker',
  },
  {
    id: 'c:triplet',
    team: 'villagers',
    ilustration: 'triplet',
  },
  {
    id: 'c:twin',
    team: 'villagers',
    ilustration: 'twins',
  },
  {
    id: 'c:witch',
    team: 'villagers',
    ilustration: 'witch',
  },
  {
    id: 'c:doctor',
    team: 'villagers',
    ilustration: 'doctor',
  },
  {
    id: 'c:scarecrow',
    team: 'villagers',
    ilustration: 'scarecrow',
  },
]

export function getCharacter(id: CharacterId): Character
export function getCharacter(id: string): Character | undefined
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id)
}

export default characters
