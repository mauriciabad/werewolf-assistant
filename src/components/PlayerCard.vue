<script setup lang="ts">
import { useDataTranslations } from '@/compositions/useDataTranslations'
import { getAbility } from '@/data/abilities'
import {
  isCustomAbilityId,
  type Ability,
  type CustomAbility,
} from '@/data/abilities.types'
import { getCharacter } from '@/data/characters'
import {
  isCustomCharacterId,
  type Character,
  type CustomCharacter,
} from '@/data/characters.types'
import { useCustomDataStore } from '@/stores/customData'
import type { PlayerConfig } from '@/stores/gameConfig'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useCharacterOrAbilityShowModal from './CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import IlustrationImg from '@/components/IlustrationImg.vue'

const props = defineProps<{
  player: PlayerConfig
}>()

const { t } = useI18n()

const { getName } = useDataTranslations()

const { getCustomCharacter, getCustomAbility } = useCustomDataStore()

const { showDetailVew } = useCharacterOrAbilityShowModal()

const character = computed<Character | CustomCharacter>(() =>
  isCustomCharacterId(props.player.character)
    ? getCustomCharacter(props.player.character)
    : getCharacter(props.player.character)
)
const abilities = computed<(Ability | CustomAbility)[]>(() =>
  props.player.abilities.map((abilityId) =>
    isCustomAbilityId(abilityId)
      ? getCustomAbility(abilityId)
      : getAbility(abilityId)
  )
)
</script>

<template>
  <div
    class="player"
    :class="{ 'player--no-abilities': abilities.length === 0 }"
  >
    <div class="name">
      <div class="small-title">{{ t('ui.name') }}</div>
      <div class="name__text">
        {{ player.name }}
      </div>
    </div>

    <div class="character" @click="showDetailVew(character)">
      <div class="small-title">
        {{ t('ui.character') }}
      </div>
      <IlustrationImg
        :id="character.ilustration"
        class="character__ilustration"
      />
      <div class="character__text">
        {{ getName(character) }}
      </div>
    </div>

    <div v-if="abilities.length" class="abilities">
      <div class="small-title">{{ t('ui.ability', abilities.length) }}</div>
      <ul class="ability-list">
        <li
          v-for="ability in abilities"
          :key="ability.id"
          class="ability"
          @click="showDetailVew(ability)"
        >
          <IlustrationImg
            :id="ability.ilustration"
            class="ability__ilustration"
          />
          <span class="ability__name">{{ getName(ability) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.player {
  display: grid;
  width: 100%;
  max-width: var(--max-width, 30rem);
  padding: 0.5rem 0;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin: 1rem auto 0;
  background-color: var(--color-background-soft);
  gap: 0.75rem;
  grid-template: auto / 1fr 1fr;
  grid-template-areas: 'name name' 'character abilities';
  text-align: center;

  &:first-child {
    margin-top: 0;
  }

  &--no-abilities {
    align-items: center;
    grid-template-areas: 'name character' 'name character';
  }
}

.name {
  grid-area: name;

  &__text {
    font-size: 1.5rem;
    line-height: 0.8;
  }
}

.character {
  cursor: pointer;
  grid-area: character;

  &__text {
    font-size: 1.5rem;
    line-height: 0.8;
  }

  &__ilustration {
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
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &__ilustration {
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
