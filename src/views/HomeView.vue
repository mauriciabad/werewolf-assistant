<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <h1 class="title">Who are you?</h1>
    <div class="links">
      <RouterLink class="link" :to="{ name: 'storyteller' }"
        >Storyteller</RouterLink
      >
      <RouterLink class="link" :to="{ name: 'player' }">Player</RouterLink>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid var(--color-border);
  aspect-ratio: 1;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  font-size: 1.5rem;
}
</style>
