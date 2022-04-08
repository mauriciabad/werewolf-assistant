<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'
import { getCharacter } from '@/data/characters'
import { getAbility } from '@/data/abilities'
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { playerViewUrl } from '@/services/player'
import TagList from '@/components/TagList.vue'
import HidableText from '../HidableText.vue'

interface Props {
  player: PlayerConfig
  showSecretInfo: boolean
  creationDate: Date
}

const props = defineProps<Props>()

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

    <div class="card__small-title">Character</div>
    <div class="card__character">
      <HidableText
        :text="getCharacter(player.character).name"
        :visible="showSecretInfo"
        :length="10"
      />
    </div>

    <template v-if="player.abilities.length">
      <div class="card__small-title">Abilities</div>
      <TagList
        v-slot="{ text: ability }"
        :items="player.abilities.map((id) => getAbility(id).name)"
        high-contrast
        ><HidableText :text="ability" :visible="showSecretInfo" :length="7"
      /></TagList>
    </template>
  </div>
</template>

<style lang="scss">
$card-width: calc(100% - 3rem);
$card-max-width: 30rem;

.card {
  min-width: 10rem;
  max-width: $card-max-width;
  box-sizing: border-box;
  flex: 0 0 $card-width;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  text-align: center;

  &__name {
    font-size: 1.5rem;
    line-height: 0.8;
  }

  &__qr {
    display: block;
    width: 100%;
    align-self: center;
    margin: 0.75rem auto 1rem;
    border-radius: 4%;

    > svg {
      display: block;
      width: 100%;
      height: unset;
      border-radius: 4%;
    }
  }

  &__character {
    margin-bottom: 1.25rem;
    font-size: 2rem;
    font-weight: 300;
    line-height: 0.8;

    &:last-child {
      margin-bottom: 0.25rem;
    }
  }

  &__small-title {
    margin-bottom: 0.25rem;
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    line-height: 0.8;
    text-transform: uppercase;
  }
}
</style>
