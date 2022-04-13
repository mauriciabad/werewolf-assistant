import { getAbility } from '@/data/abilities'
import type { Ability, CustomAbility } from '@/data/abilities.types'
import type { Character, CustomCharacter } from '@/data/characters.types'
import { readonly, ref } from 'vue'

const data = ref<Character | CustomCharacter | Ability | CustomAbility>(
  getAbility('a:nothing')
)
const isShown = ref<boolean>(false)

export default function CharacterOrAbilityShowModal() {
  function showDetailVew(
    newData: Character | CustomCharacter | Ability | CustomAbility
  ) {
    data.value = newData
    isShown.value = true
  }

  return {
    showDetailVew,
    data: readonly(data),
    isShown,
  }
}
