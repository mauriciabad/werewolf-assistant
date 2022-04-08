<script setup lang="ts">
import { getAbility } from '@/data/abilities'
import type { Ability, AbilityId } from '@/data/abilities.types'
import { getCharacter } from '@/data/characters'
import type { Character, CharacterId } from '@/data/characters.types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const hasData = computed<boolean>(
  () => !!route.query.player && !!route.query.character
)

const character = computed<Character>(() => {
  if (Array.isArray(route.query.character)) {
    return getCharacter(route.query.character[0] as CharacterId)
  } else {
    return getCharacter(route.query.character as CharacterId)
  }
})

const creationDate = computed<Date>(() => {
  if (Array.isArray(route.query.creationDate)) {
    return new Date(route.query.creationDate[0] as string)
  } else {
    return new Date(route.query.creationDate as string)
  }
})

const abilities = computed<Ability[]>(() => {
  if (Array.isArray(route.query.abilities)) {
    return route.query.abilities.map((abilityId) =>
      getAbility(abilityId as AbilityId)
    )
  } else if (route.query.abilities) {
    return [getAbility(route.query.abilities as AbilityId)]
  } else {
    return []
  }
})
</script>

<template>
  <main class="main">
    <template v-if="hasData">
      <p>{{ route.query.player }}</p>

      <img
        v-if="character.image"
        :src="character.image"
        :alt="''"
        class="image"
      />
      <img
        v-else
        src="@/assets/default-character-image.png"
        :alt="''"
        class="image"
      />

      <div class="character">
        <h1>{{ character.name }}</h1>
        <p>{{ character.description }}</p>
      </div>

      <div v-if="abilities.length" class="abilities">
        <h2>Abilities</h2>
        <ul>
          <li v-for="ability in abilities" :key="ability.id">
            <strong>{{ ability.name }}:</strong>
            {{ ability.description }}
          </li>
        </ul>
      </div>

      <p class="creation-date">
        Game created at {{ creationDate.toLocaleString() }}
      </p>
    </template>

    <template v-else>
      <h1>Scan the QR code</h1>
      <p>
        Open your camera and scan the QR code that the narrator will show you.
      </p>
    </template>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  max-width: 40rem;
  min-height: var(--vh100);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  text-align: center;
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

.creation-date {
  position: sticky;
  top: 100%;
  bottom: 0;
  left: 0;
}
</style>
