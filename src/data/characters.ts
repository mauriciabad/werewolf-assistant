import type { Character, CharacterId } from './characters.types'

const characters: Character[] = [
  {
    id: 'werewolf',
    name: 'Werewolf',
    description:
      'During the night votes to kill someone with the other wolfs in secret.',
    team: 'werewolfs',
    image:
      'https://www.storynory.com/wp-content/uploads/2021/08/howling-werewolf.jpg',
  },
  {
    id: 'villager',
    name: 'Villager',
    description: 'During the day votes to kill someone with everyone. ',
    team: 'villagers',
    image:
      'https://static.turbosquid.com/Preview/2019/01/16__08_45_08/1.pngC5B98C2C-BEF9-4171-BF71-56B581223F17Large.jpg',
  },
  {
    id: 'villager-villager',
    name: 'Villager-Villager',
    description:
      "Everyone knows your role, you have to tell you're the Villager-Villager.",
    team: 'villagers',
    image:
      'https://thecamford.org/wp-content/uploads/2021/07/top-and-best-CBSE-school-in-Coimbatore_honesty-is-the-best-policy_The-Camford-International-School.jpeg',
  },
  {
    id: 'seer',
    name: 'Seer',
    description: 'You can see the role of a player during the night.',
    team: 'villagers',
  },
  {
    id: 'suicide',
    name: 'Suicide',
    description: 'Your objective is to be killed in the first voting.',
    team: 'alone',
  },
  {
    id: 'feral-kid',
    name: 'Feral kid',
    description:
      'The first night you choose your adoptive parent. You start as a villager but when your parent dies, you become a werewolf.',
    team: 'other',
  },
  {
    id: 'baker',
    name: 'Baker',
    description:
      'Every night you wake someone up and reveal your role in secret.',
    team: 'villagers',
  },
  {
    id: 'triplet',
    name: 'Triplet',
    description: 'You know who your siblings are.',
    team: 'villagers',
  },
  {
    id: 'twin',
    name: 'Twin',
    description: 'You know who your siblings are.',
    team: 'villagers',
  },
  {
    id: 'witch',
    name: 'Witch',
    description:
      'Can save 1 person during the night, also can kill 1 person.\n Only 1 of each per game.',
    team: 'villagers',
  },
  {
    id: 'doctor',
    name: 'Doctor',
    description: 'Can save 1 person during the night. \n Only 1 use per game.',
    team: 'villagers',
  },
]

export function getCharacter(id: CharacterId): Character
export function getCharacter(id: string): Character | undefined
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id)
}

export default characters
