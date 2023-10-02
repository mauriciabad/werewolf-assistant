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
import { IconInfoCircle, IconPencil, IconTrash } from '@tabler/icons-vue'
import { computed } from 'vue'
import Popper from 'vue3-popper'
import useCharacterOrAbilityShowModal from './CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import IlustrationImg from '@/components/IlustrationImg.vue'
import InputNumber from '@/components/InputNumber.vue'

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
    <div class="item__row-wrapper">
      <Popper hover arrow>
        <template #content>
          <span class="toltip-content">{{ description }}</span>
        </template>
        <IlustrationImg :id="data.ilustration" class="item__ilustration" />
      </Popper>

      <div class="item__name-icons-wrapper">
        <Popper hover arrow>
          <template #content>
            <span class="toltip-content">{{ description }}</span>
          </template>
          <label class="item__label">{{ name }}</label>
        </Popper>

        <IconInfoCircle
          class="item__icon item__icon--info"
          @click="showDetailVew(data)"
        />

        <IconTrash
          v-if="isCustom"
          class="item__icon item__icon--delete"
          @click="emit('remove')"
        />

        <IconPencil
          v-if="isCustom"
          class="item__icon item__icon--edit"
          @click="emit('edit')"
        />
      </div>
    </div>

    <InputNumber
      :model-value="modelValue ?? 0"
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

  &__row-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__name-icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.125rem;
  }

  &__ilustration {
    $size: 2.5rem;

    display: inline-block;
    width: $size;
    height: $size;
    box-sizing: content-box;
    padding: 0.25rem;
    border-radius: 0.25rem;
    background-color: #fff;
    object-fit: contain;
  }

  &__label {
    flex: 1;
    font-size: 1.2rem;
  }

  &__icon {
    color: var(--color-text-soft);
    cursor: pointer;

    &--info {
      color: var(--color-text-soft);
    }

    &--delete {
      color: var(--color-red-soft);
    }

    &--edit {
      color: var(--color-blue-soft);
    }
  }
}
</style>
