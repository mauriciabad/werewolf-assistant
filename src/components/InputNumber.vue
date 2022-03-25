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
      class="input"
      :class="{ 'input--zero': isZero }"
      type="number"
      v-model="number"
      :id="id"
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
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  display: inline-flex;
  text-align: center;
  width: $size;
  height: $size;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    color: var(--color-text-soft);
  }

  &--left {
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: 0;
  }

  &--right {
    border-radius: 0 0.5rem 0.5rem 0;
    border-left: 0;
  }

  &__icon {
    height: 24px;
  }
}
.input {
  height: $size;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  width: 1.5 * $size;
  text-align: center;
  outline: none;
  color: inherit;
  font-size: 2rem;
  padding: 0;
  line-height: 1;

  &--zero {
    color: var(--color-text-soft);
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
