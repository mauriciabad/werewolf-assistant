<script setup lang="ts">
import type { PlayerConfig } from "@/stores/gameConfig";
import { getCharacter } from "@/data/characters";
import { getAbility } from "@/data/abilities";

interface Props {
  player: PlayerConfig;
}

defineProps<Props>();
</script>

<template>
  <div class="player">
    <div>Name: {{ player.name }}</div>
    <div>Character: {{ getCharacter(player.character).name }}</div>

    <div>Abilities:</div>
    <ul>
      <li v-for="abilityId in player.abilities" :key="abilityId">
        {{ getAbility(abilityId).name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
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
