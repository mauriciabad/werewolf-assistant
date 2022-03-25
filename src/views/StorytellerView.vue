<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { RefreshIcon, IdentificationIcon } from '@heroicons/vue/solid'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
import PlayerCard from '../components/PlayerCard.vue'

const gameConfigStore = useGameConfigStore()

const { players, firstNightActions, nightActions } =
  storeToRefs(gameConfigStore)

const router = useRouter()
if (players.value.length === 0) {
  router.replace({ name: 'newGame' })
}
</script>

<template>
  <main class="storyteller">
    <RouterLink class="link" :to="{ name: 'newGame' }">
      <RefreshIcon class="link__icon" />New game
    </RouterLink>
    <div class="content">
      <h1>Player list</h1>
      <RouterLink class="link" :to="{ name: 'distributeRoles' }">
        <IdentificationIcon class="link__icon" />Distribute roles
      </RouterLink>

      <div class="player-list">
        <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
        />
      </div>

      <h1>First night actions</h1>
      <ol class="action-list">
        <li
          v-for="action in firstNightActions"
          :key="action.name"
          class="action-list__item"
        >
          <strong>{{ action.name }}:</strong>
          {{ action.description }}
        </li>
      </ol>

      <h1>Night actions</h1>
      <ol class="action-list">
        <li
          v-for="action in nightActions"
          :key="action.name"
          class="action-list__item"
        >
          <strong>{{ action.name }}:</strong>
          {{ action.description }}
        </li>
      </ol>
    </div>
  </main>
</template>

<style scoped lang="scss">
h1 {
  margin-top: 2rem;
}

.storyteller {
  display: grid;
  padding: 1rem;
  grid-template: auto 1fr / auto;
  text-align: center;
}

.content {
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.link {
  display: inline-block;
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  font-size: 1rem;
  justify-self: center;

  &__icon {
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
}

.player-list {
  width: 100%;
}

.action-list {
  width: 100%;
  text-align: left;

  &__item {
    margin-bottom: 0.5rem;

    strong {
      font-weight: bold;
    }
  }
}
</style>
