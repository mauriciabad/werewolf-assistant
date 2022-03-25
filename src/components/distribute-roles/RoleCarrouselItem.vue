<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'
import { getCharacter } from '@/data/characters'
import { getAbility } from '@/data/abilities'
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { playerViewUrl } from '@/services/player'

interface Props {
  player: PlayerConfig
}

const props = defineProps<Props>()

const url = computed<string>(() => playerViewUrl(props.player))
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
  display: grid;
  width: 100%;
  max-width: 30rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  margin: 1rem auto 0;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  gap: 0.5rem;
  grid-template: auto auto auto / 1fr auto;
  grid-template-areas: 'name qr' 'character qr' 'abilities qr';
  text-align: left;
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
  display: block;
  width: 100px;
  height: 100px;
  align-self: center;
  grid-area: qr;
}
</style>
