<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import { computed } from '@vue/reactivity'
import ilustrations, { type IlustrationId } from '@/data/ilustrations'

type IlustrationType = 'character' | 'ability'
const props = defineProps<{
  ilustrationType: IlustrationType
  visible: boolean
  ilustration: IlustrationId
  alt?: string
}>()

const placeholderIlustrations: Record<IlustrationType, IlustrationId> = {
  character: getCharacter('villager').ilustration,
  ability: getAbility('nothing').ilustration,
}

const placeholderIlustration = computed<IlustrationId>(
  () => placeholderIlustrations[props.ilustrationType]
)
</script>

<template>
  <img v-if="visible" :src="ilustrations[ilustration]" :alt="alt" />
  <img
    v-else
    :src="ilustrations[placeholderIlustration]"
    :alt="alt"
    class="blurry"
  />
</template>

<style scoped lang="scss">
.blurry {
  filter: blur(0.5em);
}
</style>
