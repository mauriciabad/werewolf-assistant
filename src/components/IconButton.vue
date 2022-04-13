<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <div
    :role="disabled ? undefined : 'button'"
    class="link"
    :class="{ 'link--disabled': disabled }"
    :tabindex="disabled ? undefined : 0"
    @click="disabled ? null : emit('click')"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.link {
  display: inline-block;
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0 var(--color-primary);
  cursor: pointer;
  font-size: 1rem;
  justify-self: center;
  outline: none;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  > svg {
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
}
</style>
