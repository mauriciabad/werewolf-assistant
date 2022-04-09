<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'

interface Props {
  modelValue?: number
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const number = computed<number>({
  get: () => props.modelValue || 0,
  set: (value) => {
    emit('update:modelValue', value || 0)
  },
})
const isZero = computed<boolean>(() => number.value === 0)

function increase(): void {
  if (props.disabled) return

  number.value = number.value + 1
}
function decrease(): void {
  if (props.disabled) return

  if (number.value <= 0) {
    number.value = 0
    return
  }

  number.value = number.value - 1
}
</script>

<template>
  <div class="wrapper">
    <div
      class="button button--left"
      :class="{ 'button--disabled': isZero || disabled }"
      @click="decrease"
    >
      <MinusIcon class="button__icon" />
    </div>

    <input
      v-model.number="number"
      class="input"
      :class="{ 'input--zero': isZero }"
      type="number"
      :disabled="disabled"
      min="0"
      max="99"
      step="1"
    />

    <div
      class="button button--right"
      :class="{ 'button--disabled': disabled }"
      @click="increase"
    >
      <PlusIcon class="button__icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 2.5rem;
$heigth: 3rem;

.wrapper {
  display: inline-flex;
  height: $heigth;
  user-select: none;
}

.button {
  display: inline-flex;
  width: $width;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  cursor: pointer;
  text-align: center;

  &--disabled {
    color: var(--color-text-soft);
    cursor: not-allowed;
  }

  &--left {
    border-right: 0;
    border-radius: 0.5rem 0 0 0.5rem;
  }

  &--right {
    border-left: 0;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  &__icon {
    height: 24px;
  }
}

.input {
  width: $width;
  padding: 0;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: inherit;
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 1;
  outline: none;
  text-align: center;

  &:disabled {
    color: var(--color-text-soft);
    cursor: not-allowed;
  }

  &--zero {
    color: var(--color-text-soft);
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

input[type='number'] {
  appearance: textfield;
}
</style>
