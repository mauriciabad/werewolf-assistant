/* eslint-disable @intlify/vue-i18n/no-dynamic-keys */

import type { Ability, CustomAbility } from '@/data/abilities.types'
import { isAbility } from '@/data/abilities.types'
import type { Character, CustomCharacter } from '@/data/characters.types'
import { isCharacter } from '@/data/characters.types'
import { useI18n } from 'vue-i18n'

export function useDataTranslations() {
  const { t } = useI18n()

  function getName(
    data: Character | CustomCharacter | Ability | CustomAbility
  ): string {
    if (isCharacter(data)) return t(`character_${data.id}_name`)
    if (isAbility(data)) return t(`ability_${data.id}_name`)
    return data.name
  }

  function getDescription(
    data: Character | CustomCharacter | Ability | CustomAbility
  ): string {
    if (isCharacter(data)) return t(`character_${data.id}_description`)
    if (isAbility(data)) return t(`ability_${data.id}_description`)
    return data.description
  }

  return { getName, getDescription }
}
