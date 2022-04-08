<script setup lang="ts">
defineProps<{
  items: string[]
  highContrast?: boolean
}>()
</script>

<template>
  <div class="list">
    <span
      v-for="text in items"
      :key="text"
      class="list__item"
      :class="{ 'list__item--high-contrast': highContrast }"
      ><slot :text="text">{{ text }}</slot></span
    >
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;

  &__item {
    padding: 0.125rem 0.75rem;
    background-color: var(--color-background-soft);
    border-radius: 0.25rem;
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: bold;

    &--high-contrast {
      background-color: var(--color-background-mute);
    }
  }
}
</style>
