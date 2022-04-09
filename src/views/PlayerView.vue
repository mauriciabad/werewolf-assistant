<script setup lang="ts">
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { getAbility } from '@/data/abilities'
import type { Ability, CustomAbility } from '@/data/abilities.types'
import { isCustomAbilityId } from '@/data/abilities.types'
import { getCharacter } from '@/data/characters'
import type { Character, CustomCharacter } from '@/data/characters.types'
import { isCharacterId, isCustomCharacterId } from '@/data/characters.types'
import ilustrations from '@/data/ilustrations'
import { computed } from 'vue'

const { getQueryParam, getQueryParamList } = useRouterHelper()

const hasData = computed<boolean>(
  () =>
    getQueryParam('character') !== undefined ||
    getQueryParam('custom-character') !== undefined
)

const playerName = computed<string | undefined>(() => getQueryParam('player'))

const character = computed<Character | undefined>(() => {
  const characterId = getQueryParam('character')
  if (characterId === undefined || !isCharacterId(characterId)) {
    return undefined
  }

  return getCharacter(characterId)
})

const customCharacter = computed<CustomCharacter | undefined>(() => {
  const customCharacterJSON = getQueryParam('custom-character')
  if (customCharacterJSON === undefined) {
    return undefined
  }
  try {
    const customCharacter: CustomCharacter = JSON.parse(customCharacterJSON)
    if (
      !customCharacter ||
      typeof customCharacter !== 'object' ||
      !isCustomCharacterId(customCharacter.id) ||
      typeof customCharacter.name !== 'string' ||
      typeof customCharacter.description !== 'string' ||
      typeof customCharacter.ilustration !== 'string' ||
      !ilustrations[customCharacter.ilustration]
    ) {
      return undefined
    }

    return customCharacter
  } catch {
    return undefined
  }
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

const customAbilities = computed<(CustomAbility | undefined)[]>(() => {
  const customAbilitiesJSONs = getQueryParamList('custom-abilities')
  if (customAbilitiesJSONs === undefined) {
    return []
  }

  return customAbilitiesJSONs
    .map<CustomAbility | undefined>((customAbilitiesJSON) => {
      try {
        return JSON.parse(customAbilitiesJSON)
      } catch {
        return undefined
      }
    })
    .map((customAbility) => {
      if (
        !customAbility ||
        typeof customAbility !== 'object' ||
        typeof customAbility.id !== 'string' ||
        !isCustomAbilityId(customAbility.id) ||
        typeof customAbility.name !== 'string' ||
        typeof customAbility.description !== 'string' ||
        typeof customAbility.ilustration !== 'string' ||
        !ilustrations[customAbility.ilustration]
      ) {
        return undefined
      }

      return customAbility
    })
})

const allAbilities = computed<(Ability | CustomAbility | undefined)[]>(() => {
  return [...abilities.value, ...customAbilities.value]
})
</script>

<template>
  <main class="main">
    <template v-if="hasData">
      <template
        v-if="(character || customCharacter) && allAbilities.every((a):a is Ability | CustomAbility => a !== undefined)"
      >
        <p class="name">{{ playerName }}</p>

        <img
          :src="
            character
              ? ilustrations[character.ilustration]
              : ilustrations[customCharacter!.ilustration]
          "
          alt=""
          class="ilustration ilustration--character"
        />
        <div class="ability-ilustrations-list">
          <img
            v-for="ability in allAbilities"
            :key="ability.id"
            :src="ilustrations[ability.ilustration]"
            alt=""
            class="ilustration ilustration--ability"
          />
        </div>

        <div class="character">
          <h1>{{ character ? character.name : customCharacter!.name }}</h1>
          <p>
            {{ character ? character.description : customCharacter!.description }}
          </p>
        </div>

        <div v-if="abilities.length" class="abilities">
          <h2>Abilities</h2>
          <ul>
            <li v-for="ability in allAbilities" :key="ability.id">
              <strong>{{ ability.name }}:</strong>
              {{ ability.description }}
            </li>
          </ul>
        </div>

        <p v-if="creationDate" class="creation-date">
          Game started at {{ creationDate.toLocaleString() }}
        </p>
      </template>

      <template v-else>
        <h1>Error</h1>
        <ul class="error-list">
          <li
            v-if="
              !customCharacter &&
              getQueryParam('custom-character') !== undefined
            "
            class="error-list__item"
          >
            Unknown custom character {{ getQueryParam('custom-character') }}
          </li>
          <li
            v-if="!character || getQueryParam('character') !== undefined"
            class="error-list__item"
          >
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

.name {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.ilustration {
  --size: 100%;

  display: inline-block;
  width: 100%;
  max-width: var(--size);
  padding: 1rem;
  border: 1px solid var(--vt-c-divider-light-2);
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%),
    0 8px 10px -6px rgb(0 0 0 / 10%);
  object-fit: contain;

  &--ability {
    --size: 5rem;

    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  &--character {
    --size: #{5rem * 2 + 1rem};
  }
}

.ability-ilustrations-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
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
  padding-top: 2rem;
  font-size: 0.85rem;
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
  color: var(--color-red);
  text-align: left;
}
</style>
