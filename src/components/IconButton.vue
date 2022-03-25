<script setup lang="ts">
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <div role="button" class="link" @click="emit('click')">
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
  cursor: pointer;
  font-size: 1rem;
  justify-self: center;

  > svg {
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
}
</style>
