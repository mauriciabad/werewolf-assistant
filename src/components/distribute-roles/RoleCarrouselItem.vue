<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'
import { getCharacter } from '@/data/characters'
import { getAbility } from '@/data/abilities'
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { playerViewUrl } from '@/services/player'
import HidableText from '../HidableText.vue'
import type { Ability } from '@/data/abilities.types'
import type { Character } from '@/data/characters.types'
import HidableImage from '../HidableImage.vue'

interface Props {
  player: PlayerConfig
  showSecretInfo: boolean
  creationDate: Date
}

const props = defineProps<Props>()

const character = computed<Character>(() =>
  getCharacter(props.player.character)
)
const abilities = computed<Ability[]>(() =>
  props.player.abilities.map((id) => getAbility(id))
)

const url = computed<string>(() =>
  playerViewUrl(props.player, props.creationDate)
)
</script>

<template>
  <div class="card">
    <div class="card__name">{{ player.name }}</div>

    <a class="card__qr" :href="url">
      <QrcodeVue render-as="svg" :value="url" :margin="2" />
    </a>

    <div class="card__character">
      <div class="small-title">Character</div>
      <HidableImage
        type="character"
        :visible="showSecretInfo"
        :src="character.image"
        class="card__character-image"
        alt=""
      />
      <HidableText
        :text="character.name"
        :visible="showSecretInfo"
        :length="8"
      />
    </div>

    <div v-if="player.abilities.length" class="card__abilities">
      <div class="small-title">Abilities</div>
      <ul class="ability-list">
        <li v-for="ability in abilities" :key="ability.id" class="ability">
          <HidableImage
            type="ability"
            :visible="showSecretInfo"
            :src="ability.image"
            class="ability__image"
            alt=""
          />
          <span class="ability__name"
            ><HidableText
              :text="ability.name"
              :visible="showSecretInfo"
              :length="7"
          /></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
$card-width: calc(100% - 3rem);
$card-max-width: 30rem;

.card {
  display: grid;
  min-width: 10rem;
  max-width: $card-max-width;
  box-sizing: border-box;
  flex: 0 0 $card-width;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  grid-template: auto auto auto / 1fr 1fr;
  grid-template-areas: 'name name' 'qr qr' 'character abilities';
  text-align: center;

  &__name {
    font-size: 1.5rem;
    grid-area: name;
    line-height: 0.8;
  }

  &__qr {
    display: block;
    width: 100%;
    align-self: center;
    margin: 0.75rem auto 1rem;
    border-radius: 4%;
    grid-area: qr;

    > svg {
      display: block;
      width: 100%;
      height: unset;
      border-radius: 4%;
    }
  }

  &__character {
    font-size: 2rem;
    font-weight: 300;
    grid-area: character;
    line-height: 0.8;

    &-image {
      display: block;
      width: 50%;
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
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &__image {
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
