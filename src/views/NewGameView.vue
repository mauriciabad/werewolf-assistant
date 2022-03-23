<script setup lang="ts">
import type { CharacterId } from "@/data/characters.types";
import { useGameConfigStore, type CharacterConfig } from "@/stores/gameConfig";
import { SparklesIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import IconButton from "../components/IconButton.vue";
import InputNumber from "../components/InputNumber.vue";
import { default as charactersInfo } from "../data/characters";

const gameConfigStore = useGameConfigStore();

const { characters } = storeToRefs(gameConfigStore);

const newCharacters = reactive<CharacterConfig[]>(characters.value);
const newCharacterCount = computed<number>(() =>
  newCharacters.reduce((total, { amount }) => total + amount, 0)
);

const { createNewGame } = gameConfigStore;

const router = useRouter();

function setCharacterAmount(characterId: CharacterId, amount: number): void {
  const character = newCharacters.find(
    (character) => character.id === characterId
  );

  if (amount === 0) {
    if (!character) return;

    newCharacters.splice(newCharacters.indexOf(character), 1);
    return;
  }

  if (!character) {
    newCharacters.push({ id: characterId, amount });
    return;
  }

  character.amount = amount;
}

function handleCreateGame(): void {
  createNewGame(newCharacters);
  router.push({ name: "dealer" });
}
</script>

<template>
  <main class="main">
    <h1>New Game</h1>

    <h2>Choose characters (total {{ newCharacterCount }})</h2>

    <div class="list">
      <div
        v-for="character in charactersInfo"
        :key="character.id"
        class="list__item-wrapper"
      >
        <label :for="character.id" class="list__item-label">{{
          character.name
        }}</label>
        <InputNumber
          @input="setCharacterAmount(character.id, $event)"
          :id="character.id"
          :default="
            newCharacters.find((c) => c.id === character.id)?.amount ?? 0
          "
        />
      </div>
    </div>

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
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.list {
  width: 100%;
  max-width: 25rem;
  text-align: left;
  margin-top: 1rem;

  &__item {
    width: 100%;
    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    &-label {
      font-size: 1.2rem;
      flex: 1;
    }
  }
}

.create-button {
  margin-top: 1rem;
}
</style>
