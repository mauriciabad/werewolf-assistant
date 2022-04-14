import type { AbilityId } from './abilities.types'
import type { CharacterId } from './characters.types'

export type ActionId =
  | 'major-revealed'
  | 'village-goes-to-sleep'
  | 'cupid-shoots'
  | 'feral-kid-chooses-parents'
  | 'triplets-meet'
  | 'twins-meet'
  | 'werewolves-meet'
  | 'village-wakes-up'
  | 'nudist-revealed'
  | 'seer-guesses'
  | 'werewolves-kill'
  | 'witch-kills-or-saves'
  | 'doctor-saves'
  | 'baker-gives-bread'
  | 'ghost-decides'
  | 'collejas-attacks'

export type Action = {
  id: ActionId
  requiredCharacters?: CharacterId[]
  requiredAbilities?: AbilityId[]
}
