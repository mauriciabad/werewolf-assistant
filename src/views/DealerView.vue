<script setup lang="ts">
import { useGameConfigStore } from "@/stores/gameConfig";
import { RefreshIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import PlayerCard from "../components/PlayerCard.vue";

const gameConfigStore = useGameConfigStore();

const { players } = storeToRefs(gameConfigStore);

const router = useRouter();
if (players.value.length === 0) {
  router.replace({ name: "newGame" });
}
</script>

<template>
  <main class="dealer">
    <router-link class="link" :to="{ name: 'newGame' }">
      <RefreshIcon class="link__icon" />New game
    </router-link>
    <div class="content">
      <h1>Player list</h1>

      <div class="player-list">
        <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.dealer {
  text-align: center;
  min-height: 100vh;
  display: grid;
  grid-template: auto 1fr / auto;
  padding: 1rem;
  gap: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.link {
  font-size: 1rem;
  padding: 0.5rem 1.125rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  display: inline-block;
  justify-self: center;

  &__icon {
    margin-right: 0.5rem;
    display: inline-block;
    height: 20px;
    vertical-align: middle;
  }
}

.player-list {
  width: 100%;
}
</style>
