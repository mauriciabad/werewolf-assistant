import imageBaker from '@/assets/images/060-baker.svg'
import imageFeralKid from '@/assets/images/061-native-american.svg'
import imageWitch from '@/assets/images/062-witch.svg'
import imageSeer from '@/assets/images/063-fortune-teller.svg'
import imageVillager from '@/assets/images/064-boy.svg'
import imageTwin from '@/assets/images/084-twins.svg'
import imageWerewolf from '@/assets/images/096-icon-1137154.svg'
import imageSuicide from '@/assets/images/crime-scene.png'
import imageDoctor from '@/assets/images/doctor.png'
import imageNudist from '@/assets/images/naked.png'
import imageTriplet from '@/assets/images/triplet.png'
import type { Character, CharacterId } from './characters.types'

const characters: Character[] = [
  {
    id: 'werewolf',
    name: 'Werewolf',
    description:
      'During the night votes to kill someone with the other wolfs in secret.',
    team: 'werewolfs',
    image: imageWerewolf,
  },
  {
    id: 'villager',
    name: 'Villager',
    description: 'During the day votes to kill someone with everyone. ',
    team: 'villagers',
    image: imageVillager,
  },
  {
    id: 'nudist',
    name: 'Nudist',
    description:
      "Everyone knows your role, you have to tell you're the Nudist.",
    team: 'villagers',
    image: imageNudist,
  },
  {
    id: 'seer',
    name: 'Seer',
    description: 'You can see the role of a player during the night.',
    team: 'villagers',
    image: imageSeer,
  },
  {
    id: 'suicide',
    name: 'Suicide',
    description: 'Your objective is to be killed in the first voting.',
    team: 'alone',
    image: imageSuicide,
  },
  {
    id: 'feral-kid',
    name: 'Feral kid',
    description:
      'The first night you choose your adoptive parent. You start as a villager but when your parent dies, you become a werewolf.',
    team: 'other',
    image: imageFeralKid,
  },
  {
    id: 'baker',
    name: 'Baker',
    description:
      'Every night you wake someone up and reveal your role in secret.',
    team: 'villagers',
    image: imageBaker,
  },
  {
    id: 'triplet',
    name: 'Triplet',
    description: 'You know who your siblings are.',
    team: 'villagers',
    image: imageTriplet,
  },
  {
    id: 'twin',
    name: 'Twin',
    description: 'You know who your siblings are.',
    team: 'villagers',
    image: imageTwin,
  },
  {
    id: 'witch',
    name: 'Witch',
    description:
      'Can save 1 person during the night, also can kill 1 person.\n Only 1 of each per game.',
    team: 'villagers',
    image: imageWitch,
  },
  {
    id: 'doctor',
    name: 'Doctor',
    description: 'Can save 1 person during the night. \n Only 1 use per game.',
    team: 'villagers',
    image: imageDoctor,
  },
]

export function getCharacter(id: CharacterId): Character
export function getCharacter(id: string): Character | undefined
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id)
}

export default characters
