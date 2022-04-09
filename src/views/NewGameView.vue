<script setup lang="ts">
import CharacterCreatorModal from '@/components/CharacterCreatorModal.vue'
import type { CustomCharacter } from '@/data/characters.types'
import { useCustomDataStore } from '@/stores/customData'
import {
  useGameConfigStore,
  type AbilitiesConfig,
  type CharacterConfig,
} from '@/stores/gameConfig'
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/outline'
import { SparklesIcon, UserAddIcon } from '@heroicons/vue/solid'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Popper from 'vue3-popper'
import IconButton from '../components/IconButton.vue'
import InputNumber from '../components/InputNumber.vue'
import TagList from '../components/TagList.vue'
import { default as abilitiesInfo } from '../data/abilities'
import { default as charactersInfo } from '../data/characters'
import ilustrations from '../data/ilustrations'

const gameConfigStore = useGameConfigStore()

const { characters, abilities, players, customCharacters } =
  storeToRefs(gameConfigStore)
const { createNewGame } = gameConfigStore

const { saveCustomCharacter, removeCustomCharacter } = useCustomDataStore()

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

const showModal = ref<boolean>(false)
watch(showModal, () => {
  if (!showModal.value) {
    customCharacterToEdit.value = undefined
  }
})

function setCharacterAmount({ id, amount }: CharacterConfig): void {
  const character = newCharacters.find((character) => character.id === id)

  if (amount === 0) {
    if (!character) return

    newCharacters.splice(newCharacters.indexOf(character), 1)
    return
  }

  if (!character) {
    newCharacters.push({ id: id, amount })
    return
  }

  character.amount = amount
}

function setAbilityAmount({ id, amount }: AbilitiesConfig): void {
  const ability = newAbilities.find((character) => character.id === id)

  if (amount === 0) {
    if (!ability) return

    newAbilities.splice(newAbilities.indexOf(ability), 1)
    return
  }

  if (!ability) {
    newAbilities.push({ id: id, amount })
    return
  }

  ability.amount = amount
}

function handleCreateGame(): void {
  createNewGame(newCharacters, newAbilities, newPlayerNames.value, new Date())
  router.push({ name: 'storyteller' })
}

function handleAddCustomCharacterClick(): void {
  showModal.value = true
}

function handleCreateOrEditCustomCharacter(
  customCharacter: CustomCharacter
): void {
  saveCustomCharacter(customCharacter)

  showModal.value = false
}
const customCharacterToEdit = ref<CustomCharacter | undefined>(undefined)
function handleEditCustomCharacter(customCharacter: CustomCharacter): void {
  customCharacterToEdit.value = customCharacter
  showModal.value = true
}
</script>

<template>
  <main class="main">
    <div class="header">
      <RouterLink class="go-back" :to="{ name: 'storyteller' }">
        <div class="go-back__icon-wrapper">
          <ChevronLeftIcon class="go-back__icon" />
        </div>
        <span class="go-back__text">Go back</span>
      </RouterLink>
    </div>

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
          <div class="list__item-name-wrapper">
            <img
              class="list__item-ilustration"
              :src="ilustrations[character.ilustration]"
              alt=""
            />
            <label :for="character.id" class="list__item-label">{{
              character.name
            }}</label>
            <InformationCircleIcon class="list__item-icon" />
          </div>
        </Popper>
        <InputNumber
          :id="character.id"
          :default="
            newCharacters.find((c) => c.id === character.id)?.amount ?? 0
          "
          @input="setCharacterAmount({ id: character.id, amount: $event })"
        />
      </div>

      <div v-if="customCharacters.length" class="separator" />

      <div
        v-for="character in customCharacters"
        :key="character.id"
        class="list__item-wrapper"
      >
        <Popper hover arrow>
          <template #content>
            <span class="toltip-content">{{ character.description }}</span>
          </template>
          <div class="list__item-name-wrapper">
            <img
              class="list__item-ilustration"
              :src="ilustrations[character.ilustration]"
              alt=""
            />
            <label :for="character.id" class="list__item-label">{{
              character.name
            }}</label>
            <InformationCircleIcon class="list__item-icon" />
            <TrashIcon
              class="list__item-icon list__item-icon--delete"
              @click="removeCustomCharacter(character.id)"
            />
            <PencilIcon
              class="list__item-icon list__item-icon--edit"
              @click="handleEditCustomCharacter(character)"
            />
          </div>
        </Popper>
        <InputNumber
          :id="character.id"
          :default="
            newCharacters.find((c) => c.id === character.id)?.amount ?? 0
          "
          @input="setCharacterAmount({ id: character.id, amount: $event })"
        />
      </div>
    </div>
    <CharacterCreatorModal
      v-model:modelValue="showModal"
      :initial-value="customCharacterToEdit"
      @create-character="handleCreateOrEditCustomCharacter"
      @edit-character="handleCreateOrEditCustomCharacter"
    />
    <IconButton class="button" @click="handleAddCustomCharacterClick">
      <template #icon> <UserAddIcon /> </template>Add custom character
    </IconButton>

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
          <div class="list__item-name-wrapper">
            <img
              class="list__item-ilustration"
              :src="ilustrations[ability.ilustration]"
              alt=""
            />
            <label :for="ability.id" class="list__item-label">{{
              ability.name
            }}</label>
            <InformationCircleIcon class="list__item-icon" />
          </div>
        </Popper>
        <InputNumber
          :id="ability.id"
          :default="newAbilities.find((a) => a.id === ability.id)?.amount ?? 0"
          @input="setAbilityAmount({ id: ability.id, amount: $event })"
        />
      </div>
    </div>

    <h2>
      <label for="player-names">Player names</label>
    </h2>
    <p>Total {{ playerNamesCount }}</p>
    <textarea
      id="player-names"
      v-model="rawPlayerNames"
      name="Player names"
      rows="10"
      class="player-names"
    ></textarea>
    <TagList :items="newPlayerNames" class="player-names-list" />

    <IconButton
      :disabled="newCharacterCount <= 1"
      class="button"
      @click="handleCreateGame"
    >
      <template #icon> <SparklesIcon /> </template>Create game
    </IconButton>
  </main>
</template>

<style scoped lang="scss">
$max-width: 28rem;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 30rem;
  align-items: center;
  justify-content: start;
  padding-bottom: 1rem;
  margin: 0 auto;
}

.go-back {
  $size: 2.5rem;

  display: inline-block;
  color: var(--color-text);
  cursor: pointer;

  &__icon-wrapper {
    display: inline-block;
    width: $size;
    height: $size;
    padding: 0.5rem;
    background-color: var(--color-background-mute);
    border-radius: 100%;
    vertical-align: middle;
  }

  &__icon {
    display: inline-block;
    color: var(--color-text-mute);
  }

  &__text {
    display: inline-block;
    margin-left: 0.5rem;
    color: var(--color-text-mute);
    font-size: 1rem;
  }
}

.separator {
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background-color: var(--color-border);
}

.list {
  width: 100%;
  max-width: $max-width;
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

    &-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    &-ilustration {
      $size: 2.5rem;

      display: inline-block;
      width: $size;
      height: $size;
      box-sizing: content-box;
      padding: 0.25rem;
      background-color: #fff;
      border-radius: 0.25rem;
      object-fit: contain;
    }

    &-label {
      flex: 1;
      font-size: 1.2rem;
    }

    &-icon {
      width: 24px;
      color: var(--color-text-soft);
      vertical-align: -20%;

      &--delete {
        color: var(--color-red-soft);
        cursor: pointer;
      }

      &--edit {
        color: var(--color-blue-soft);
        cursor: pointer;
      }
    }
  }
}

.button {
  margin-top: 1rem;
}

.toltip-content {
  display: block;
  width: calc(
    100vw - 2 * (var(--popper-theme-padding) + var(--popper-theme-border-width))
  );
  max-width: $max-width;
}

h2 {
  margin-top: 2rem;
}

.player-names {
  width: 100%;
  max-width: $max-width;
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
  max-width: $max-width;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>
