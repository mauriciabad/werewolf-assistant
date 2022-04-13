<script setup lang="ts">
import CharacterOrAbilityShowModal from '@/components/CharacterOrAbilityShowModal/CharacterOrAbilityShowModal.vue'
import useCharacterOrAbilityShowModal from '@/components/CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import { RouterView } from 'vue-router'

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
@import '@/assets/base.css';
</style>
