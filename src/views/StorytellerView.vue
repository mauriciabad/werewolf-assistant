<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { RefreshIcon, IdentificationIcon } from '@heroicons/vue/solid'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import { useDataTranslations } from '@/compositions/useDataTranslations'

const { t } = useI18n()

const { getActionName, getActionDescription } = useDataTranslations()

const gameConfigStore = useGameConfigStore()

const { players, firstNightActions, nightActions, creationDate } =
  storeToRefs(gameConfigStore)

const router = useRouter()
if (players.value.length === 0) {
  router.replace({ name: 'newGame' })
}
</script>

<template>
  <Layout locale-selector>
    <div class="storyteller">
      <div class="links">
        <RouterLink class="link" :to="{ name: 'newGame' }">
          <RefreshIcon class="link__icon" />{{ t('ui.createNewGame') }}
        </RouterLink>
      </div>

      <div class="content">
        <p>
          {{
            t('ui.gameStartedAt', {
              date: creationDate.toLocaleDateString(),
              time: creationDate.toLocaleTimeString(),
            })
          }}
        </p>
        <h1>{{ t('ui.firstNightActions') }}</h1>
        <ol class="action-list">
          <li
            v-for="action in firstNightActions"
            :key="action.id"
            class="action-list__item"
          >
            <strong>{{ getActionName(action) }}:</strong>
            {{ getActionDescription(action) }}
          </li>
        </ol>

        <h1>{{ t('ui.regularNightActions') }}</h1>
        <ol class="action-list">
          <li
            v-for="action in nightActions"
            :key="action.id"
            class="action-list__item"
          >
            <strong>{{ getActionName(action) }}:</strong>
            {{ getActionDescription(action) }}
          </li>
        </ol>

        <h1>{{ t('ui.player', 2) }}</h1>
        <div class="links">
          <RouterLink class="link" :to="{ name: 'distributeRoles' }">
            <IdentificationIcon class="link__icon" />{{
              t('ui.distributeCharacters')
            }}
          </RouterLink>
        </div>
        <p class="text">{{ t('ui.tapCharacterExpandsExplanation') }}</p>

        <div class="player-list">
          <PlayerCard
            v-for="player in players"
            :key="player.id"
            :player="player"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
h1 {
  margin-top: 2rem;
}

.storyteller {
  display: grid;
  grid-template: auto 1fr / auto;
  text-align: center;
}

.content {
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.link {
  display: inline-block;
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0 var(--color-primary);
  font-size: 1rem;
  justify-self: center;
  outline: none;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &__icon {
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-primary);
  }
}

.player-list {
  width: 100%;
}

.text {
  margin: 1rem 0 0.5rem;
}

.action-list {
  width: 100%;
  padding-left: 1.25rem;
  text-align: left;

  &__item {
    margin-bottom: 0.5rem;

    strong {
      font-weight: bold;
    }
  }
}
</style>
