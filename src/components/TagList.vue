<script setup lang="ts">
defineProps<{
  items: string[]
  highContrast?: boolean
}>()
</script>

<template>
  <div class="list">
    <span
      class="list__item"
      :class="{ 'list__item--high-contrast': highContrast }"
      v-for="text in items"
      :key="text"
      >{{ text }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  max-width: 25rem;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    padding: 0.125rem 0.75rem;
    margin-right: 0.5rem;
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
