<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import { computed } from 'vue'
import type { IlustrationId } from '@/data/ilustrations'
import IlustrationImg from '@/components/IlustrationImg.vue'

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
  <IlustrationImg v-if="visible" :id="ilustration" />
  <IlustrationImg v-else :id="placeholderIlustration" class="blurry" />
</template>

<style scoped lang="scss">
.blurry {
  filter: blur(0.5em);
}
</style>
