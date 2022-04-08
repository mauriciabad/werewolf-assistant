import type { PlayerConfig } from '@/stores/gameConfig'

export function playerViewUrl(
  player: PlayerConfig,
  creationDate: Date
): string {
  const url = new URL(`${location.origin}/player`)
  url.searchParams.append('player', player.name)
  url.searchParams.append('character', player.character)
  for (const ability of player.abilities) {
    url.searchParams.append('abilities', ability)
  }
  url.searchParams.append('creationDate', creationDate.toISOString())

  return url.toString()
}
