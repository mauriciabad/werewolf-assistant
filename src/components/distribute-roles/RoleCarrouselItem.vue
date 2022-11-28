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
import { playerViewUrl } from '@/services/player'
import { useCustomDataStore } from '@/stores/customData'
import type { PlayerConfig } from '@/stores/gameConfig'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useCharacterOrAbilityShowModal from '../CharacterOrAbilityShowModal/useCharacterOrAbilityShowModal'
import HidableIlustration from '@/components/HidableIlustration.vue'
import HidableText from '@/components/HidableText.vue'
import QrcodeVue from 'qrcode.vue'

const props = defineProps<{
  player: PlayerConfig
  showSecretInfo: boolean
  creationDate: Date
}>()

const { t } = useI18n()

const { getName } = useDataTranslations()

const { showDetailVew } = useCharacterOrAbilityShowModal()

const customDataStore = useCustomDataStore()
const { customCharacters, customAbilities } = storeToRefs(customDataStore)
const { getCustomCharacter, getCustomAbility } = customDataStore

const character = computed<Character | CustomCharacter>(() =>
  isCustomCharacterId(props.player.character)
    ? getCustomCharacter(props.player.character)
    : getCharacter(props.player.character)
)

const abilities = computed<(Ability | CustomAbility)[]>(() =>
  props.player.abilities.map((id) =>
    isCustomAbilityId(id) ? getCustomAbility(id) : getAbility(id)
  )
)

const url = computed<string>(() =>
  playerViewUrl(
    props.player,
    props.creationDate,
    customCharacters.value,
    customAbilities.value
  )
)
</script>

<template>
  <div class="card" :class="{ 'card--no-abilities': abilities.length === 0 }">
    <div class="card__name">{{ player.name }}</div>

    <a class="card__qr" :href="url">
      <QrcodeVue render-as="svg" :value="url" :margin="2" />
    </a>

    <div class="card__character" @click="showDetailVew(character)">
      <div class="small-title">{{ t('ui.character') }}</div>
      <HidableIlustration
        ilustration-type="character"
        :visible="showSecretInfo"
        :ilustration="character.ilustration"
        class="card__character-ilustration"
        alt=""
      />
      <HidableText
        :text="getName(character)"
        :visible="showSecretInfo"
        :length="8"
      />
    </div>

    <div v-if="player.abilities.length" class="card__abilities">
      <div class="small-title">
        {{ t('ui.ability', player.abilities.length) }}
      </div>
      <ul class="ability-list">
        <li
          v-for="ability in abilities"
          :key="ability.id"
          class="ability"
          @click="showDetailVew(ability)"
        >
          <HidableIlustration
            ilustration-type="ability"
            :visible="showSecretInfo"
            :ilustration="ability.ilustration"
            class="ability__ilustration"
            alt=""
          />
          <span class="ability__name">
            <HidableText
              :text="getName(ability)"
              :visible="showSecretInfo"
              :length="7"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
$card-width: calc(100% - 3rem);
$card-max-width: var(--max-width, 30rem);

.card {
  display: grid;
  min-width: 10rem;
  max-width: $card-max-width;
  box-sizing: border-box;
  flex: 0 0 $card-width;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  grid-template: auto auto auto / 1fr 1fr;
  grid-template-areas: 'name name' 'qr qr' 'character abilities';
  text-align: center;

  &--no-abilities {
    grid-template-areas: 'name name' 'qr qr' 'character character';
  }

  &__name {
    font-size: 1.5rem;
    grid-area: name;
    line-height: 0.8;
  }

  &__qr {
    display: block;
    width: 100%;
    align-self: center;
    border-radius: 4%;
    margin: 0.75rem auto 1rem;
    grid-area: qr;

    > svg {
      display: block;
      width: 100%;
      height: unset;
      border-radius: 4%;
    }
  }

  &__character {
    cursor: pointer;
    font-size: 2rem;
    font-weight: 300;
    grid-area: character;
    line-height: 0.8;

    &-ilustration {
      display: block;
      width: 50%;
      max-width: 5rem;
      margin: 0.5rem auto;
    }
  }

  &__abilities {
    grid-area: abilities;
  }
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

  &__name {
    font-weight: 500;
  }
}

.small-title {
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  line-height: 0.8;
  text-transform: uppercase;
}
</style>
