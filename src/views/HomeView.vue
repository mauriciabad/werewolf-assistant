<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <h1 class="title">Who are you?</h1>
    <div class="links">
      <RouterLink class="link" :to="{ name: 'storyteller' }">Storyteller</RouterLink>
      <RouterLink class="link" :to="{ name: 'player' }">Player</RouterLink>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  margin-bottom: 1rem;
  font-size: 3rem;
}
.links {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}
.link {
  aspect-ratio: 1;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}
</style>
