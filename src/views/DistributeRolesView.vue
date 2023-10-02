<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { IconChevronLeft, IconEye, IconEyeOff } from '@tabler/icons-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import RoleCarrousel from '@/components/distribute-roles/RoleCarrousel.vue'

const { t } = useI18n()

const gameConfigStore = useGameConfigStore()

const { players, creationDate } = storeToRefs(gameConfigStore)

console.log(creationDate.value)

const router = useRouter()
if (players.value.length === 0) {
  router.replace({ name: 'storyteller' })
}

const showSecretInfo = ref<boolean>(true)
</script>

<template>
  <main class="main">
    <div class="header">
      <RouterLink class="go-back" :to="{ name: 'storyteller' }">
        <div class="go-back__icon-wrapper">
          <IconChevronLeft class="go-back__icon" />
        </div>
        <span class="go-back__text">{{ t('ui.goBack') }}</span>
      </RouterLink>

      <div
        class="secret-info"
        role="button"
        tabindex="0"
        @click="showSecretInfo = !showSecretInfo"
        @keypress.enter="showSecretInfo = !showSecretInfo"
        @keypress.space="showSecretInfo = !showSecretInfo"
      >
        <IconEye
          v-if="showSecretInfo"
          :size="72"
          :stroke-width="4 / 3"
          class="secret-info__icon"
        />
        <IconEyeOff
          v-else
          :size="72"
          :stroke-width="4 / 3"
          class="secret-info__icon"
        />
      </div>
    </div>

    <RoleCarrousel
      class="carrousel"
      :players="players"
      :show-secret-info="showSecretInfo"
      :creation-date="creationDate"
    />
  </main>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  height: var(--vh100);
  grid-template: auto 1fr / 1fr;
}

.carrousel {
  overflow: auto;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  max-width: var(--max-width, 30rem);
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  margin: 0 auto;
}

.go-back {
  position: absolute;
  left: 1rem;
  display: inline-block;
  color: var(--color-text);
  cursor: pointer;

  &__icon-wrapper {
    display: inline-block;
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--color-background-mute);
    vertical-align: middle;
  }

  &__icon {
    display: block;
    color: var(--color-text-mute);
  }

  &__text {
    display: inline-block;
    margin-left: 0.5rem;
    color: var(--color-text-mute);
    font-size: 1rem;
  }
}

.secret-info {
  display: inline-block;
  padding: 0.5rem;
  border-radius: 100%;
  margin: 0 auto;
  background-color: var(--color-background-mute);
  cursor: pointer;
  user-select: none;

  &__icon {
    display: block;
    color: var(--color-text-mute);
  }
}
</style>
