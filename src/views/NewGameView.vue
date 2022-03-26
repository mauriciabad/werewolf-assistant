<script setup lang="ts">
import type { CharacterId } from '@/data/characters.types'
import {
  useGameConfigStore,
  type AbilitiesConfig,
  type CharacterConfig,
} from '@/stores/gameConfig'
import { SparklesIcon } from '@heroicons/vue/solid'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconButton from '../components/IconButton.vue'
import InputNumber from '../components/InputNumber.vue'
import { default as charactersInfo } from '../data/characters'
import { default as abilitiesInfo } from '../data/abilities'
import type { AbilityId } from '@/data/abilities.types'
import Popper from 'vue3-popper'
import { InformationCircleIcon } from '@heroicons/vue/outline'
import TagList from '../components/TagList.vue'

const gameConfigStore = useGameConfigStore()

const { characters, abilities, players } = storeToRefs(gameConfigStore)

const newCharacters = reactive<CharacterConfig[]>(characters.value)
const newCharacterCount = computed<number>(() =>
  newCharacters.reduce((total, { amount }) => total + amount, 0)
)
const newAbilities = reactive<AbilitiesConfig[]>(abilities.value)
const newAbilityCount = computed<number>(() =>
  newAbilities.reduce((total, { amount }) => total + amount, 0)
)
const newAbilitiesPerCharacter = computed<number>(() =>
  newCharacterCount.value === 0
    ? 0
    : Math.floor(newAbilityCount.value / newCharacterCount.value)
)

const { createNewGame } = gameConfigStore

const router = useRouter()

const initialPlayerNames = players.value.map((player) => player.name).join('\n')

const rawPlayerNames = ref<string>(initialPlayerNames)
const newPlayerNames = computed<string[]>(() =>
  rawPlayerNames.value
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .filter((s, i, arr) => arr.indexOf(s) === i)
)
const playerNamesCount = computed<number>(() => newPlayerNames.value.length)

function setCharacterAmount(characterId: CharacterId, amount: number): void {
  const character = newCharacters.find(
    (character) => character.id === characterId
  )

  if (amount === 0) {
    if (!character) return

    newCharacters.splice(newCharacters.indexOf(character), 1)
    return
  }

  if (!character) {
    newCharacters.push({ id: characterId, amount })
    return
  }

  character.amount = amount
}

function setAbilityAmount(abilityId: AbilityId, amount: number): void {
  const ability = newAbilities.find((character) => character.id === abilityId)

  if (amount === 0) {
    if (!ability) return

    newAbilities.splice(newAbilities.indexOf(ability), 1)
    return
  }

  if (!ability) {
    newAbilities.push({ id: abilityId, amount })
    return
  }

  ability.amount = amount
}

function handleCreateGame(): void {
  createNewGame(newCharacters, newAbilities, newPlayerNames.value)
  router.push({ name: 'storyteller' })
}
</script>

<template>
  <main class="main">
    <h1>New Game</h1>

    <h2>Choose characters</h2>
    <p>Total {{ newCharacterCount }} | {{ playerNamesCount }} players</p>

    <div class="list">
      <div
        v-for="character in charactersInfo"
        :key="character.id"
        class="list__item-wrapper"
      >
        <Popper hover arrow>
          <template #content>
            <span class="toltip-content">{{ character.description }}</span>
          </template>
          <div>
            <label :for="character.id" class="list__item-label">{{
              character.name
            }}</label>
            <InformationCircleIcon class="info-icon" />
          </div>
        </Popper>
        <InputNumber
          @input="setCharacterAmount(character.id, $event)"
          :id="character.id"
          :default="
            newCharacters.find((c) => c.id === character.id)?.amount ?? 0
          "
        />
      </div>
    </div>

    <h2>Choose abilities</h2>
    <p>
      Total {{ newAbilityCount }} | {{ newAbilitiesPerCharacter }} per character
      |
      {{ newAbilityCount - newAbilitiesPerCharacter * newCharacterCount }}
      remaining
    </p>

    <div class="list">
      <div
        v-for="ability in abilitiesInfo"
        :key="ability.id"
        class="list__item-wrapper"
      >
        <Popper hover arrow>
          <template #content>
            <span class="toltip-content">{{ ability.description }}</span>
          </template>
          <div>
            <label :for="ability.id" class="list__item-label">{{
              ability.name
            }}</label>
            <InformationCircleIcon class="info-icon" />
          </div>
        </Popper>
        <InputNumber
          @input="setAbilityAmount(ability.id, $event)"
          :id="ability.id"
          :default="newAbilities.find((a) => a.id === ability.id)?.amount ?? 0"
        />
      </div>
    </div>

    <h2>
      <label for="player-names">Player names</label>
    </h2>
    <p>Total {{ playerNamesCount }}</p>
    <textarea
      name="Player names"
      id="player-names"
      rows="10"
      v-model="rawPlayerNames"
      class="player-names"
    ></textarea>
    <TagList :items="newPlayerNames" class="player-names-list" />

    <IconButton
      @click="handleCreateGame"
      :disabled="newCharacterCount <= 1"
      class="create-button"
    >
      <template v-slot:icon> <SparklesIcon /> </template>Create game
    </IconButton>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.list {
  width: 100%;
  max-width: 25rem;
  margin-top: 1rem;
  text-align: left;

  &__item {
    width: 100%;

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    &-label {
      flex: 1;
      font-size: 1.2rem;
    }
  }
}

.create-button {
  margin-top: 1rem;
}

.info-icon {
  width: 24px;
  margin-left: 0.5rem;
  color: var(--color-text-soft);
  vertical-align: -20%;
}

.toltip-content {
  display: block;
  width: calc(
    100vw - 2 * (var(--popper-theme-padding) + var(--popper-theme-border-width))
  );
  max-width: 25rem;
}

h2 {
  margin-top: 2rem;
}

.player-names {
  width: 100%;
  max-width: 25rem;
  min-height: 4rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  margin-top: 1rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

.player-names-list {
  max-width: 25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>
