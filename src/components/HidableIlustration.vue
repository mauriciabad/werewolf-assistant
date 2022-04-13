<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import { computed } from '@vue/reactivity'
import type { IlustrationId } from '@/data/ilustrations'
import Ilustration from './Ilustration.vue'

type IlustrationType = 'character' | 'ability'
const props = defineProps<{
  ilustrationType: IlustrationType
  visible: boolean
  ilustration: IlustrationId
}>()

const placeholderIlustrations: Record<IlustrationType, IlustrationId> = {
  character: getCharacter('c:villager').ilustration,
  ability: getAbility('a:nothing').ilustration,
}

const placeholderIlustration = computed<IlustrationId>(
  () => placeholderIlustrations[props.ilustrationType]
)
</script>

<template>
  <Ilustration v-if="visible" :id="ilustration" />
  <Ilustration v-else :id="placeholderIlustration" class="blurry" />
</template>

<style scoped lang="scss">
.blurry {
  filter: blur(0.5em);
}
</style>
