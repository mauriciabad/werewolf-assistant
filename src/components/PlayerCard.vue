<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import { getCharacter } from '@/data/characters'
import type { PlayerConfig } from '@/stores/gameConfig'
import type { Character } from '@/data/characters.types'
import { computed } from 'vue'
import type { Ability } from '@/data/abilities.types'

interface Props {
  player: PlayerConfig
}
const props = defineProps<Props>()

const character = computed<Character>(() =>
  getCharacter(props.player.character)
)
const abilities = computed<Ability[]>(() =>
  props.player.abilities.map((abilityId) => getAbility(abilityId))
)
</script>

<template>
  <div class="player">
    <div class="name">
      <div class="small-title">Name</div>
      <div class="name__text">
        {{ player.name }}
      </div>
    </div>

    <div class="character">
      <div class="small-title">Character</div>
      <img :src="character.image" alt="" class="character__image" />
      <div class="character__text">
        {{ character.name }}
      </div>
    </div>

    <div v-if="abilities.length" class="abilities">
      <div class="small-title">Abilities</div>
      <ul class="ability-list">
        <li v-for="ability in abilities" :key="ability.id" class="ability">
          <img :src="ability.image" alt="" class="ability__image" />
          <span class="ability__name">{{ ability.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.player {
  display: grid;
  width: 100%;
  max-width: 30rem;
  padding: 0.5rem 0;
  border: 1px solid var(--color-border);
  margin: 1rem auto 0;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  gap: 0.75rem;
  grid-template: auto / 1fr 1fr;
  grid-template-areas: 'name name' 'character abilities';
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

  &__image {
    display: block;
    width: 3rem;
    margin: 0 auto;
  }
}

.abilities {
  grid-area: abilities;
}

.ability-list {
  padding: 0;
  list-style: none;
  text-align: left;
}

.ability {
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &__image {
    width: 2rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
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
