<script lang="ts" setup>
import type { Ability } from '@/data/abilities.types'
import type {
  Character,
  CustomCharacter,
  CustomCharacterId,
} from '@/data/characters.types'
import { isCharacter, isCustomCharacter } from '@/data/characters.types'
import type { AbilityConfig, CharacterConfig } from '@/stores/gameConfig'
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/outline'
import Popper from 'vue3-popper'
import InputNumber from '../components/InputNumber.vue'
import ilustrations from '../data/ilustrations'
defineProps<{
  data: Character | CustomCharacter | Ability
  initialValue?: CharacterConfig | AbilityConfig
}>()

const emit = defineEmits<{
  (e: 'updateCharacter', value: CharacterConfig): void
  (e: 'updateAbility', value: AbilityConfig): void
  (e: 'editCustomCharacter', value: CustomCharacter): void
  (e: 'removeCustomCharacter', value: CustomCharacterId): void
}>()
</script>

<template>
  <div class="item__wrapper">
    <Popper hover arrow>
      <template #content>
        <span class="toltip-content">{{ data.description }}</span>
      </template>
      <div class="item__name-wrapper">
        <img
          class="item__ilustration"
          :src="ilustrations[data.ilustration]"
          alt=""
        />
        <label :for="data.id" class="item__label">{{ data.name }}</label>
        <InformationCircleIcon class="item__icon" />
        <TrashIcon
          v-if="isCustomCharacter(data)"
          class="item__icon item__icon--delete"
          @click="
            isCustomCharacter(data) && emit('removeCustomCharacter', data.id)
          "
        />
        <PencilIcon
          v-if="isCustomCharacter(data)"
          class="item__icon item__icon--edit"
          @click="isCustomCharacter(data) && emit('editCustomCharacter', data)"
        />
      </div>
    </Popper>
    <InputNumber
      :id="data.id"
      :default="initialValue?.amount ?? 0"
      @input="
        isCharacter(data) || isCustomCharacter(data)
          ? emit('updateCharacter', { id: data.id, amount: $event })
          : emit('updateAbility', { id: data.id, amount: $event })
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.item {
  width: 100%;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  &__name-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__ilustration {
    $size: 2.5rem;

    display: inline-block;
    width: $size;
    height: $size;
    box-sizing: content-box;
    padding: 0.25rem;
    background-color: #fff;
    border-radius: 0.25rem;
    object-fit: contain;
  }

  &__label {
    flex: 1;
    font-size: 1.2rem;
  }

  &__icon {
    width: 24px;
    color: var(--color-text-soft);
    vertical-align: -20%;

    &--delete {
      color: var(--color-red-soft);
      cursor: pointer;
    }

    &--edit {
      color: var(--color-blue-soft);
      cursor: pointer;
    }
  }
}
</style>
