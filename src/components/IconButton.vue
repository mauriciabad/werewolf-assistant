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
  font-size: 1rem;
  padding: 0.5rem 1.125rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  display: inline-block;
  justify-self: center;
  cursor: pointer;

  > svg {
    margin-right: 0.5rem;
    display: inline-block;
    height: 20px;
    vertical-align: middle;
  }
}
</style>
