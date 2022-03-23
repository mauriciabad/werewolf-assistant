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
  const { character, abilities } = props.player;
  const url = new URL(`${location.host}/player`);
  url.searchParams.append("character", character);
  url.searchParams.append("abilities", abilities.join(","));

  return url.toString();
});
</script>

<template>
  <div class="player">
    <div class="name">Name: {{ player.name }}</div>
    <div class="character">Character: {{ getCharacter(player.character).name }}</div>

    <div class="abilities">
      <div>Abilities:</div>
      <ul>
        <li v-for="abilityId in player.abilities" :key="abilityId">{{ getAbility(abilityId).name }}</li>
      </ul>
    </div>

    <qrcode-vue class="qr" render-as="svg" :value="url" :margin="2" />
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
  align-self: center;
}
</style>
