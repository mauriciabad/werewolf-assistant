<script lang="ts" setup>
import type {
  Ability,
  CustomAbility,
  CustomAbilityId,
} from '@/data/abilities.types'
import { isCustomAbility } from '@/data/abilities.types'
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
import { computed } from '@vue/reactivity'
import Popper from 'vue3-popper'
import InputNumber from '../components/InputNumber.vue'
import Ilustration from './Ilustration.vue'

const props = defineProps<{
  data: Character | CustomCharacter | Ability | CustomAbility
  initialValue?: CharacterConfig | AbilityConfig
  value?: number
}>()

const emit = defineEmits<{
  (e: 'updateCharacter', value: CharacterConfig): void
  (e: 'updateAbility', value: AbilityConfig): void

  (e: 'editCustomCharacter', value: CustomCharacter): void
  (e: 'editCustomAbility', value: CustomAbility): void

  (e: 'removeCustomCharacter', value: CustomCharacterId): void
  (e: 'removeCustomAbility', value: CustomAbilityId): void
}>()

const inputId = computed<`input-${typeof props.data.id}`>(
  () => `input-${props.data.id}`
)
</script>

<template>
  <div class="item__wrapper">
    <Popper hover arrow>
      <template #content>
        <span class="toltip-content">{{ data.description }}</span>
      </template>
      <div class="item__name-wrapper">
        <Ilustration :id="data.ilustration" class="item__ilustration" />
        <label :for="inputId" class="item__label">{{ data.name }}</label>
        <InformationCircleIcon class="item__icon" />
        <TrashIcon
          v-if="isCustomCharacter(data) || isCustomAbility(data)"
          class="item__icon item__icon--delete"
          @click="
            isCustomCharacter(data)
              ? emit('removeCustomCharacter', data.id)
              : isCustomAbility(data)
              ? emit('removeCustomAbility', data.id)
              : null
          "
        />
        <PencilIcon
          v-if="isCustomCharacter(data) || isCustomAbility(data)"
          class="item__icon item__icon--edit"
          @click="
            isCustomCharacter(data)
              ? emit('editCustomCharacter', data)
              : isCustomAbility(data)
              ? emit('editCustomAbility', data)
              : null
          "
        />
      </div>
    </Popper>

    <InputNumber
      v-if="value !== undefined"
      :id="inputId"
      :default="value"
      disabled
    />
    <InputNumber
      v-else
      :id="inputId"
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
