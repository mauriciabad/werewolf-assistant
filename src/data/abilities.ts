import imageCupid from '@/assets/images/136-cupid.svg'
import imageExtraLife from '@/assets/images/181-revive.svg'
import imageVote from '@/assets/images/204-vote.svg'
import imageNothing from '@/assets/images/241-prohibited.svg'
import imageMajor from '@/assets/images/254-sheriff.svg'
import type { Ability, AbilityId } from './abilities.types'

const abilities: Ability[] = [
  {
    id: 'nothing',
    name: 'Nothing',
    description: 'No ability.',
    image: imageNothing,
  },
  {
    id: 'extra-life',
    name: 'Extra life',
    description: 'When you die, you can get an extra life. \n1 usage.',
    image: imageExtraLife,
  },
  {
    id: 'extra-vote',
    name: 'Extra vote',
    description: 'In one voting session, you can emit another vote. \n1 usage.',
    image: imageVote,
  },
  {
    id: 'cupid',
    name: 'Cupid',
    description:
      'The first night, you have to choose two players to be lovers.',
    image: imageCupid,
  },
  {
    id: 'major',
    name: 'Major',
    description:
      "In case of a tie during the day, you're vote is counted as a majority vote.",
    image: imageMajor,
  },
]

export function getAbility(id: AbilityId): Ability
export function getAbility(id: string): Ability | undefined
export function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id)
}

export default abilities
