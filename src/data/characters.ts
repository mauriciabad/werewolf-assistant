import type { Character, CharacterId } from './characters.types'

const characters: Character[] = [
  {
    id: 'werewolf',
    name: 'Werewolf',
    description:
      'During the night votes to kill someone with the other wolfs in secret.',
    team: 'werewolfs',
    ilustration: 'werewolf',
  },
  {
    id: 'villager',
    name: 'Villager',
    description: 'During the day votes to kill someone with everyone. ',
    team: 'villagers',
    ilustration: 'boy',
  },
  {
    id: 'nudist',
    name: 'Nudist',
    description:
      "Everyone knows your role, you have to tell you're the Nudist.",
    team: 'villagers',
    ilustration: 'naked',
  },
  {
    id: 'seer',
    name: 'Seer',
    description: 'You can see the role of a player during the night.',
    team: 'villagers',
    ilustration: 'fortuneTeller',
  },
  {
    id: 'suicide',
    name: 'Suicide',
    description: 'Your objective is to be killed in the first voting.',
    team: 'alone',
    ilustration: 'crimeScene',
  },
  {
    id: 'feral-kid',
    name: 'Feral kid',
    description:
      'The first night you choose your adoptive parent. You start as a villager but when your parent dies, you become a werewolf.',
    team: 'other',
    ilustration: 'nativeAmerican',
  },
  {
    id: 'baker',
    name: 'Baker',
    description:
      'Every night you wake someone up and reveal your role in secret.',
    team: 'villagers',
    ilustration: 'baker',
  },
  {
    id: 'triplet',
    name: 'Triplet',
    description: 'You know who your siblings are.',
    team: 'villagers',
    ilustration: 'triplet',
  },
  {
    id: 'twin',
    name: 'Twin',
    description: 'You know who your siblings are.',
    team: 'villagers',
    ilustration: 'twins',
  },
  {
    id: 'witch',
    name: 'Witch',
    description:
      'Can save 1 person during the night, also can kill 1 person.\n Only 1 of each per game.',
    team: 'villagers',
    ilustration: 'witch',
  },
  {
    id: 'doctor',
    name: 'Doctor',
    description: 'Can save 1 person during the night. \n Only 1 use per game.',
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
