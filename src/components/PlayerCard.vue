<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import type { PlayerConfig } from '@/stores/gameConfig'
import TagList from '@/components/TagList.vue'

interface Props {
  player: PlayerConfig
}
defineProps<Props>()
</script>

<template>
  <div class="player">
    <div class="name">
      <div class="small-title">Name</div>
      <div class="name__text">{{ player.name }}</div>
    </div>

    <div class="character">
      <div class="small-title">Character</div>
      <div class="character__text">
        {{ getCharacter(player.character).name }}
      </div>
    </div>

    <div v-if="player.abilities.length" class="abilities">
      <div class="small-title">Abilities</div>
      <TagList
        :items="player.abilities.map((id) => getAbility(id).name)"
        high-contrast
      />
    </div>
  </div>
</template>

<style lang="scss">
.player {
  display: grid;
  width: 100%;
  max-width: 30rem;
  padding: 1.5rem 0;
  border: 1px solid var(--color-border);
  margin: 1rem auto 0;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  grid-template: auto / 1fr 1fr;
  grid-template-areas: 'name character' 'abilities abilities';
  text-align: center;
}

.name {
  grid-area: name;

  &__text {
    font-size: 1.5rem;
    line-height: 0.8;
  }
}

.character {
  grid-area: character;

  &__text {
    font-size: 1.5rem;
    line-height: 0.8;
  }
}

.abilities {
  padding-top: 2rem;
  grid-area: abilities;
}

.small-title {
  margin: 1.25rem 0 0.5rem;
  color: var(--color-text-soft);
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  line-height: 0.8;
  text-transform: uppercase;

  &:first-child {
    margin-top: 0;
  }
}
</style>
