<script setup lang="ts">
import type { PlayerConfig } from "@/stores/gameConfig";
import { getCharacter } from "@/data/characters";
import { getAbility } from "@/data/abilities";
import { computed } from "vue";
import QrcodeVue from "qrcode.vue";

interface Props {
  player: PlayerConfig;
}

const props = defineProps<Props>();

const url = computed<string>(() => {
  const url = new URL(`${location.origin}/player`);
  url.searchParams.append("player", props.player.name);
  url.searchParams.append("character", props.player.character);
  for (const ability of props.player.abilities) {
    url.searchParams.append("abilities", ability);
  }

  return url.toString();
});
</script>

<template>
  <div class="player">
    <div class="name">Name: {{ player.name }}</div>
    <div class="character">
      Character: {{ getCharacter(player.character).name }}
    </div>

    <div class="abilities">
      <div>Abilities:</div>
      <ul>
        <li v-for="abilityId in player.abilities" :key="abilityId">
          {{ getAbility(abilityId).name }}
        </li>
      </ul>
    </div>

    <a class="qr" :href="url">
      <QrcodeVue render-as="svg" :value="url" :margin="2" />
    </a>
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

  display: grid;
  grid-template: auto auto auto / 1fr auto;
  grid-template-areas: "name qr" "character qr" "abilities qr";
  gap: 0.5rem;
}

.name {
  grid-area: name;
}
.character {
  grid-area: character;
}
.abilities {
  grid-area: abilities;
}
.qr {
  grid-area: qr;
  width: 100px;
  height: 100px;
  align-self: center;
  display: block;
}
</style>