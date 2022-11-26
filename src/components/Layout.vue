<script lang="ts" setup>
interface Props {
  localeSelector?: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="wrapper">
    <LocaleSelector v-if="localeSelector" />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  max-width: 40rem;
  min-height: var(--vh100);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  gap: 1rem;
  text-align: center;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
