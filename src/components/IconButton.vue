<script setup lang="ts">
defineProps<{
  disabled?: boolean
  main?: boolean
}>()
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <div
    :role="disabled ? undefined : 'button'"
    class="link"
    :class="{ 'link--main': main, 'link--disabled': disabled }"
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
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &--main {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    width: calc(100% + 2 * var(--main-padding, 1rem));
    max-width: calc(var(--max-width, 30rem) + 2rem);
    padding: 1rem 0.5rem;
    border: 0;
    margin: calc(-1 * var(--main-padding, 1rem));
    margin-top: 3rem;
    background-color: var(--color-primary);
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 0 16px 0 rgb(0 0 0 / 20%);
    color: #fff;

    @media (max-width: 32rem) {
      border-radius: 0;
    }
  }

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
    vertical-align: -0.25em;
  }
}
</style>
