<script setup lang="ts">
import { RouterLink } from "vue-router";
import { RefreshIcon } from "@heroicons/vue/solid";
import { useGameConfigStore } from "@/stores/gameConfig";
import type { Character, CharacterId } from "@/data/characters.types";
import characters from "@/data/characters";
import { storeToRefs } from "pinia";
import type { Ability, AbilityId } from "@/data/abilities.types";
import abilities from "@/data/abilities";

const gameConfigStore = useGameConfigStore();

const { players } = storeToRefs(gameConfigStore);

function getCharacter(id: CharacterId): Character;
function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id);
}

function getAbility(id: AbilityId): Ability;
function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id);
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
        <div v-for="player in players" :key="player.id" class="player">
          <div>Name: {{ player.name }}</div>
          <div>Character: {{ getCharacter(player.character).name }}</div>

          <div>Abilities:</div>
          <ul>
            <li v-for="abilityId in player.abilities" :key="abilityId">
              {{ getAbility(abilityId).name }}
            </li>
          </ul>
        </div>
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

.player {
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);

  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 30rem;
  width: 100%;
  margin: 1rem auto 0;
  text-align: left;
}
</style>
