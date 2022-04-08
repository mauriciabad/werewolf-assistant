<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import { computed } from '@vue/reactivity'

type ImageType = 'character' | 'ability'
const props = defineProps<{
  type: ImageType
  visible: boolean
  src: string
  alt?: string
}>()

const placeholderImages: Record<ImageType, string> = {
  character: getCharacter('villager').image,
  ability: getAbility('nothing').image,
}

const placeholderImage = computed<string>(() => placeholderImages[props.type])
</script>

<template>
  <img v-if="visible" :src="src" :alt="alt" />
  <img v-else :src="placeholderImage" :alt="alt" class="blurry" />
</template>

<style scoped lang="scss">
.blurry {
  filter: blur(0.5em);
}
</style>
