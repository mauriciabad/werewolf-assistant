<script setup lang="ts">
import { IconMinus, IconPlus } from '@tabler/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  disabled?: boolean
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const MIN = 0
const MAX = 99

function fixNumber(n: unknown): number {
  return typeof n !== 'number' || isNaN(n)
    ? 0
    : n <= MIN
    ? MIN
    : n >= MAX
    ? MAX
    : Math.round(n) !== n
    ? Math.round(n)
    : n
}
const number = computed<number>({
  get: () => props.modelValue,
  set: (value) => {
    if (props.disabled) return

    const fixedValue = fixNumber(value)

    emit('update:modelValue', fixedValue)
  },
})

function increase(): void {
  number.value = number.value + 1
}
function decrease(): void {
  number.value = number.value - 1
}
</script>

<template>
  <div class="wrapper">
    <div
      class="button button--left"
      :class="{ 'button--disabled': number <= MIN || disabled }"
      data-testid="decrease-button"
      @click="decrease"
    >
      <IconMinus />
    </div>

    <input
      v-model.number="number"
      class="input"
      :class="{ 'input--zero': number === 0 }"
      type="number"
      :disabled="disabled"
      :min="MIN"
      :max="MAX"
      step="1"
      data-testid="input"
    />

    <div
      class="button button--right"
      :class="{ 'button--disabled': number >= MAX || disabled }"
      data-testid="increase-button"
      @click="increase"
    >
      <IconPlus />
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
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: 0;
  }

  &--right {
    border-radius: 0 0.5rem 0.5rem 0;
    border-left: 0;
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
