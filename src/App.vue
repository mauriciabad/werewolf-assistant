<script setup lang="ts">
import useCharacterOrAbilityShowModal from '@/components/CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import { RouterView } from 'vue-router'
import CharacterOrAbilityShowModal from '@/components/CharacterOrAbilityShowModal/CharacterOrAbilityShowModal.vue'

const {
  data: characterOrAbilityShowModalData,
  isShown: isCharacterOrAbilityShowModalShown,
} = useCharacterOrAbilityShowModal()
</script>

<template>
  <RouterView />
  <CharacterOrAbilityShowModal
    v-model="isCharacterOrAbilityShowModalShown"
    :data="characterOrAbilityShowModalData"
  />
</template>

<style lang="scss">
@import url('@/assets/base.css');
</style>
