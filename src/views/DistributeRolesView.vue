<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'

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
          <ChevronLeftIcon class="go-back__icon" />
        </div>
        <span class="go-back__text">{{ t('ui.goBack') }}</span>
      </RouterLink>

      <div class="secret-info" role="button" tabindex="0" @click="showSecretInfo = !showSecretInfo"
        @keypress.enter="showSecretInfo = !showSecretInfo" @keypress.space="showSecretInfo = !showSecretInfo">
        <EyeIcon v-if="showSecretInfo" class="secret-info__icon" />
        <EyeOffIcon v-else class="secret-info__icon" />
      </div>
    </div>

    <RoleCarrousel class="carrousel" :players="players" :show-secret-info="showSecretInfo"
      :creation-date="creationDate" />
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
  $size: 2.5rem;

  position: absolute;
  left: 1rem;
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

.secret-info {
  $size: clamp(3rem, 20vw, 5rem);

  display: inline-block;
  width: $size;
  height: $size;
  padding: 0.5rem;
  margin: 0 auto;
  background-color: var(--color-background-mute);
  border-radius: 100%;
  cursor: pointer;
  user-select: none;

  &__icon {
    display: block;
    color: var(--color-text-mute);
  }
}
</style>
