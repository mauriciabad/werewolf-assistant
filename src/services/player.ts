import type { PlayerConfig } from '@/stores/gameConfig'

export function playerViewUrl(player: PlayerConfig): string {
  const url = new URL(`${location.origin}/player`)
  url.searchParams.append('player', player.name)
  url.searchParams.append('character', player.character)
  for (const ability of player.abilities) {
    url.searchParams.append('abilities', ability)
  }

  return url.toString()
}
