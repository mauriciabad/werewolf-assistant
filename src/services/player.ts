import {
  isCustomCharacterId,
  type CustomCharacter,
} from '@/data/characters.types'
import type { PlayerConfig } from '@/stores/gameConfig'

export function playerViewUrl(
  player: PlayerConfig,
  creationDate: Date,
  customCharacters: CustomCharacter[]
): string {
  const url = new URL(`${location.origin}/player`)
  url.searchParams.append('player', player.name)
  if (isCustomCharacterId(player.character)) {
    const tempCustomCharacter = customCharacters.find(
      (customCharacter) => customCharacter.id === player.character
    )
    if (tempCustomCharacter) {
      const customCharacter: CustomCharacter = tempCustomCharacter
      url.searchParams.append(
        'custom-character',
        JSON.stringify(customCharacter)
      )
    }
  } else {
    url.searchParams.append('character', player.character)
  }
  for (const ability of player.abilities) {
    url.searchParams.append('abilities', ability)
  }
  url.searchParams.append('creationDate', creationDate.toISOString())

  return url.toString()
}
