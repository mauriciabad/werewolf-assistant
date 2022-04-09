<script setup lang="ts">
import CharacterOrAbilityCreatorModal from '@/components/CharacterOrAbilityCreatorModal.vue'
import type { CustomAbility } from '@/data/abilities.types'
import type { CustomCharacter } from '@/data/characters.types'
import { useCustomDataStore } from '@/stores/customData'
import {
  useGameConfigStore,
  type AbilityConfig,
  type CharacterConfig,
} from '@/stores/gameConfig'
import { ChevronLeftIcon } from '@heroicons/vue/outline'
import {
  SparklesIcon,
  UserAddIcon,
  ViewGridAddIcon,
} from '@heroicons/vue/solid'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import CharacterOrAbilityRow from '../components/CharacterOrAbilityRow.vue'
import IconButton from '../components/IconButton.vue'
import TagList from '../components/TagList.vue'
import { default as abilitiesInfo, getAbility } from '../data/abilities'
import { default as charactersInfo } from '../data/characters'

const gameConfigStore = useGameConfigStore()

const { characters, abilities, players } = storeToRefs(gameConfigStore)
const { createNewGame } = gameConfigStore

const customDataStore = useCustomDataStore()
const { customCharacters, customAbilities } = storeToRefs(customDataStore)
const {
  saveCustomCharacter,
  removeCustomCharacter,
  saveCustomAbility,
  removeCustomAbility,
} = customDataStore

const newCharacters = reactive<CharacterConfig[]>(characters.value)
const newCharacterCount = computed<number>(() =>
  newCharacters.reduce((total, { amount }) => total + amount, 0)
)
const newAbilities = reactive<AbilityConfig[]>(abilities.value)
const newAbilityCount = computed<number>(() =>
  newAbilities.reduce((total, { amount }) => total + amount, 0)
)
const newAbilitiesPerCharacter = computed<number>(() =>
  newCharacterCount.value === 0
    ? 0
    : Math.floor(newAbilityCount.value / newCharacterCount.value)
)

const nothingAbilities = computed<number>(() =>
  newCharacterCount.value === 0
    ? 0
    : newAbilityCount.value -
      newAbilitiesPerCharacter.value * newCharacterCount.value
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

function setAbilityAmount({ id, amount }: AbilityConfig): void {
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
  const newAbilitiesIncludingNothings: AbilityConfig[] = nothingAbilities.value
    ? [...newAbilities, { id: 'nothing', amount: nothingAbilities.value }]
    : newAbilities

  createNewGame(
    newCharacters,
    newAbilitiesIncludingNothings,
    newPlayerNames.value,
    new Date()
  )
  router.push({ name: 'storyteller' })
}

// #region Custom Character stuff
const showCustomCharacterModal = ref<boolean>(false)
watch(showCustomCharacterModal, () => {
  if (!showCustomCharacterModal.value) {
    customCharacterToEdit.value = undefined
  }
})

function handleAddCustomCharacterClick(): void {
  showCustomCharacterModal.value = true
}

function handleCreateOrEditCustomCharacter(
  customCharacter: CustomCharacter
): void {
  saveCustomCharacter(customCharacter)

  showCustomCharacterModal.value = false
}
const customCharacterToEdit = ref<CustomCharacter | undefined>(undefined)
function handleEditCustomCharacter(customCharacter: CustomCharacter): void {
  customCharacterToEdit.value = customCharacter
  showCustomCharacterModal.value = true
}

// #endregion
// #region Custom Ability stuff
const showCustomAbilityModal = ref<boolean>(false)
watch(showCustomAbilityModal, () => {
  if (!showCustomAbilityModal.value) {
    customAbilityToEdit.value = undefined
  }
})

function handleAddCustomAbilityClick(): void {
  showCustomAbilityModal.value = true
}

function handleCreateOrEditCustomAbility(customAbility: CustomAbility): void {
  saveCustomAbility(customAbility)

  showCustomAbilityModal.value = false
}
const customAbilityToEdit = ref<CustomAbility | undefined>(undefined)
function handleEditCustomAbility(customAbility: CustomAbility): void {
  customAbilityToEdit.value = customAbility
  showCustomAbilityModal.value = true
}
// #endregion
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
    <p>
      {{ newCharacterCount }} characters | {{ playerNamesCount }} player names
    </p>

    <div class="list">
      <CharacterOrAbilityRow
        v-for="character in charactersInfo"
        :key="character.id"
        :data="character"
        :initial-value="newCharacters.find((a) => a.id === character.id)"
        @update-character="setCharacterAmount"
      />

      <div v-if="customCharacters.length" class="separator" />

      <CharacterOrAbilityRow
        v-for="character in customCharacters"
        :key="character.id"
        :data="character"
        :initial-value="newCharacters.find((a) => a.id === character.id)"
        @update-character="setCharacterAmount"
        @edit-custom-character="handleEditCustomCharacter"
        @remove-custom-character="removeCustomCharacter(character.id)"
      />
    </div>

    <CharacterOrAbilityCreatorModal
      v-model:modelValue="showCustomCharacterModal"
      type="character"
      :initial-value="customCharacterToEdit"
      @create-character="handleCreateOrEditCustomCharacter"
      @edit-character="handleCreateOrEditCustomCharacter"
    />
    <IconButton class="button" @click="handleAddCustomCharacterClick">
      <template #icon> <UserAddIcon /> </template>Add custom character
    </IconButton>

    <h2>Choose abilities</h2>
    <p>
      {{ newAbilitiesPerCharacter }} per character |
      {{ nothingAbilities }} without ability
    </p>

    <div class="list">
      <CharacterOrAbilityRow
        :data="getAbility('nothing')"
        :value="nothingAbilities"
      />

      <CharacterOrAbilityRow
        v-for="ability in abilitiesInfo.filter((a) => a.id !== 'nothing')"
        :key="ability.id"
        :data="ability"
        :initial-value="newAbilities.find((a) => a.id === ability.id)"
        @update-ability="setAbilityAmount"
      />
      <div v-if="customAbilities.length" class="separator" />

      <CharacterOrAbilityRow
        v-for="ability in customAbilities"
        :key="ability.id"
        :data="ability"
        :initial-value="newAbilities.find((a) => a.id === ability.id)"
        @update-ability="setAbilityAmount"
        @edit-custom-ability="handleEditCustomAbility"
        @remove-custom-ability="removeCustomAbility(ability.id)"
      />
    </div>
    <CharacterOrAbilityCreatorModal
      v-model:modelValue="showCustomAbilityModal"
      type="ability"
      :initial-value="customAbilityToEdit"
      @create-ability="handleCreateOrEditCustomAbility"
      @edit-ability="handleCreateOrEditCustomAbility"
    />

    <IconButton class="button" @click="handleAddCustomAbilityClick">
      <template #icon> <ViewGridAddIcon /> </template>Add custom ability
    </IconButton>

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
