<script setup lang="ts">
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { getAbility } from '@/data/abilities'
import type { Ability } from '@/data/abilities.types'
import { getCharacter } from '@/data/characters'
import type { Character } from '@/data/characters.types'
import { computed } from 'vue'

const { getQueryParam, getQueryParamList } = useRouterHelper()

const hasData = computed<boolean>(
  () => getQueryParam('character') !== undefined
)

const playerName = computed<string | undefined>(() => getQueryParam('player'))

const character = computed<Character | undefined>(() => {
  const characterId = getQueryParam('character')
  if (characterId === undefined) return undefined
  return getCharacter(characterId)
})

const creationDate = computed<Date | undefined>(() => {
  const creationDateString = getQueryParam('creationDate')
  if (creationDateString === undefined) return undefined

  const date = new Date(creationDateString)
  if (isNaN(date.getTime())) return undefined

  return date
})

const abilities = computed<(Ability | undefined)[]>(() =>
  getQueryParamList('abilities').map((abilityId) => getAbility(abilityId))
)
</script>

<template>
  <main class="main">
    <template v-if="hasData">
      <template
        v-if="character && abilities.every((ability):ability is Ability => ability !== undefined)"
      >
        <p>{{ playerName }}</p>

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

        <p v-if="creationDate" class="creation-date">
          Game created at {{ creationDate.toLocaleString() }}
        </p>
      </template>

      <template v-else>
        <h1>Error</h1>
        <ul class="error-list">
          <li v-if="!character" class="error-list__item">
            Unknown character "{{ getQueryParam('character') }}"
          </li>
          <li
            v-for="abilityId in getQueryParamList('abilities').filter(
              (abilityId) => getAbility(abilityId) === undefined
            )"
            :key="abilityId"
            class="error-list__item"
          >
            Unknown ability "{{ abilityId }}"
          </li>
        </ul>

        <p class="error-explanation">
          <strong>Scan the QR code again.</strong>
          <br />
          If the error still appears, ask the storyteller to create a new game.
        </p>
      </template>
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

.error-explanation {
  margin-top: 2rem;
}

.error-list {
  padding: 1rem;
  padding-left: 2rem;
  border: 1px solid var(--color-border);
  margin-top: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  color: #dc143c;
  text-align: left;
}
</style>
