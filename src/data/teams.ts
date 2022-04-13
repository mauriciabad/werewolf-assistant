import type { Team } from './teams.types'

const teams: Team[] = [
  {
    id: 'werewolves',
    name: 'Werewolves',
    description:
      'The werewolves are the bad guys. They are the ones who kill the villagers.',
    objective: 'Reduce the number of villagers to the same as werewolves.',
    ilustration: 'werewolf',
  },
  {
    id: 'villagers',
    name: 'Villagers',
    description:
      'The villagers are the good guys. They are the ones who survive the night.',
    objective: 'Kill all werewolves',
    ilustration: 'man',
  },
]

export default teams
