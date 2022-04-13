<script lang="ts" setup>
import { useDataTranslations } from '@/compositions/useDataTranslations'
import {
  isCustomAbility,
  type Ability,
  type CustomAbility,
} from '@/data/abilities.types'
import {
  isCustomCharacter,
  type Character,
  type CustomCharacter,
} from '@/data/characters.types'
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/outline'
import { computed } from 'vue'
import Popper from 'vue3-popper'
import InputNumber from '../components/InputNumber.vue'
import useCharacterOrAbilityShowModal from './CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import Ilustration from './Ilustration.vue'

const props = defineProps<{
  data: Character | CustomCharacter | Ability | CustomAbility
  modelValue?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'edit'): void
  (e: 'remove'): void
}>()

const { getName, getDescription } = useDataTranslations()

const { showDetailVew } = useCharacterOrAbilityShowModal()

const name = computed<string>(() => getName(props.data))
const description = computed<string>(() => getDescription(props.data))

const isCustom = computed<boolean>(
  () => isCustomCharacter(props.data) || isCustomAbility(props.data)
)
</script>

<template>
  <div class="item__wrapper">
    <Popper hover arrow>
      <template #content>
        <span class="toltip-content">{{ description }}</span>
      </template>
      <div class="item__name-wrapper">
        <Ilustration :id="data.ilustration" class="item__ilustration" />

        <label class="item__label">{{ name }}</label>

        <InformationCircleIcon
          class="item__icon item__icon--info"
          @click="showDetailVew(data)"
        />

        <TrashIcon
          v-if="isCustom"
          class="item__icon item__icon--delete"
          @click="emit('remove')"
        />

        <PencilIcon
          v-if="isCustom"
          class="item__icon item__icon--edit"
          @click="emit('edit')"
        />
      </div>
    </Popper>

    <InputNumber
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="emit('update:modelValue', $event)"
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

    &--info {
      color: var(--color-text-soft);
      cursor: pointer;
    }

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
