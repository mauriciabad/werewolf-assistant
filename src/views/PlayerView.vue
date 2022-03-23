<script setup lang="ts">
import { getAbility } from "@/data/abilities";
import type { Ability, AbilityId } from "@/data/abilities.types";
import { getCharacter } from "@/data/characters";
import type { Character, CharacterId } from "@/data/characters.types";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const hasData = computed<boolean>(
  () =>
    !!route.query.player && !!route.query.character && !!route.query.abilities
);

const character = computed<Character>(() => {
  if (Array.isArray(route.query.character)) {
    return getCharacter(route.query.character[0] as CharacterId);
  } else {
    return getCharacter(route.query.character as CharacterId);
  }
});

const abilities = computed<Ability[]>(() => {
  if (Array.isArray(route.query.abilities)) {
    return route.query.abilities.map((abilityId) =>
      getAbility(abilityId as AbilityId)
    );
  } else {
    return [getAbility(route.query.abilities as AbilityId)];
  }
});
</script>

<template>
  <main class="player">
    <template v-if="hasData">
      <p>{{ route.query.player }}</p>

      <img v-if="character.image" :src="character.image" :alt="''" class="image" />

      <div class="character">
        <h1>{{ character.name }}</h1>
        <p>{{ character.description }}</p>
      </div>

      <div class="abilities">
        <h2>Abilities</h2>
        <ul>
          <li v-for="ability in abilities" :key="ability.id">
            <strong>{{ ability.name }}:</strong>
            {{ ability.description }}
          </li>
        </ul>
      </div>
    </template>

    <template v-else>
      <h1>Scan the QR code</h1>
      <p>Open your camera and scan the QR code that the narrator will show you.</p>
    </template>
  </main>
</template>

<style scoped lang="scss">
.player {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
}
.image {
  height: 10rem;
}

h1 {
  margin-top: 0.5rem;
}
h2 {
  margin-top: 2rem;
}
strong {
  font-weight: bold;
}
</style>
