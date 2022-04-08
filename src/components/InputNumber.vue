<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@heroicons/vue/solid'
import { ref, watch, computed } from 'vue'

interface Props {
  default?: number
  id?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'input', value: number): void }>()

const number = ref<number>(props.default ?? 0)
const isZero = computed<boolean>(() => number.value === 0)

function increase(): void {
  number.value++
}
function decrease(): void {
  if (number.value <= 0) {
    number.value = 0
    return
  }

  number.value--
}

watch(number, () => {
  emit('input', number.value)
})
</script>

<template>
  <div class="wrapper">
    <div
      class="button button--left"
      :class="{ 'button--disabled': isZero }"
      @click="decrease"
    >
      <MinusIcon class="button__icon" />
    </div>

    <input
      :id="id"
      v-model="number"
      class="input"
      :class="{ 'input--zero': isZero }"
      type="number"
    />

    <div class="button button--right" @click="increase">
      <PlusIcon class="button__icon" />
    </div>
  </div>
</template>

<style lang="scss">
$size: 3rem;

.wrapper {
  display: inline-flex;
  user-select: none;
}

.button {
  display: inline-flex;
  width: $size;
  height: $size;
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
  width: 1.5 * $size;
  height: $size;
  padding: 0;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: inherit;
  font-size: 2rem;
  line-height: 1;
  outline: none;
  text-align: center;

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
