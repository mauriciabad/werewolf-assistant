<script setup lang="ts">
import type { CharacterId } from "@/data/characters.types";
import { computed, reactive } from "vue";
import characters from "../data/characters";
import InputNumber from "../components/InputNumber.vue";

type GameConfig = {
  characters: { id: CharacterId; amount: number }[];
};

const gameConfig = reactive<GameConfig>({
  characters: [],
});

const totalCharacters = computed<number>(() =>
  gameConfig.characters.reduce((total, { amount }) => total + amount, 0)
);

function setCharacterAmount(characterId: CharacterId, amount: number): void {
  const character = gameConfig.characters.find(
    (character) => character.id === characterId
  );
  if (character) {
    character.amount = amount;
  } else {
    gameConfig.characters.push({ id: characterId, amount });
  }
}
</script>

<template>
  <main class="main">
    <h1>New Game</h1>

    <h2>Choose characters (total {{ totalCharacters }})</h2>

    <div class="list">
      <div
        v-for="character in characters"
        :key="character.id"
        class="list__item-wrapper"
      >
        <label :for="character.id" class="list__item-label">
          {{ character.name }}
        </label>
        <InputNumber
          @input="setCharacterAmount(character.id, $event)"
          :id="character.id"
          :default="0"
        />
      </div>
    </div>
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
</style>
