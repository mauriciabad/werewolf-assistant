import { getCharacter } from './characters'
import type { Team } from './teams.types'

const teams: Team[] = [
  {
    id: 'werewolfs',
    name: 'Werewolfs',
    description:
      'The werewolfs are the bad guys. They are the ones who kill the villagers.',
    objective: 'Reduce the number of villagers to the same as werewolfs.',
    ilustration: getCharacter('werewolf').ilustration,
  },
  {
    id: 'villagers',
    name: 'Villagers',
    description:
      'The villagers are the good guys. They are the ones who survive the night.',
    objective: 'Kill all werewolfs',
    ilustration: getCharacter('villager').ilustration,
  },
]

export default teams
