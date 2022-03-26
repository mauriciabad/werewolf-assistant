<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RoleCarrousel from '../components/distribute-roles/RoleCarrousel.vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'

const gameConfigStore = useGameConfigStore()

const { players } = storeToRefs(gameConfigStore)

const router = useRouter()
if (players.value.length === 0) {
  router.replace({ name: 'storyteller' })
}

const showSecretInfo = ref<boolean>(true)
</script>

<template>
  <main class="main">
    <div
      class="secret-info"
      @click="showSecretInfo = !showSecretInfo"
      role="button"
    >
      <EyeIcon v-if="showSecretInfo" class="secret-info__icon" />
      <EyeOffIcon v-else class="secret-info__icon" />
    </div>

    <RoleCarrousel
      class="carrousel"
      :players="players"
      :show-secret-info="showSecretInfo"
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

.secret-info {
  $size: clamp(3rem, 20vw, 5rem);

  display: inline-block;
  width: $size;
  height: $size;
  padding: 0.5rem;
  margin: 0 auto;
  margin-top: 1rem;
  background-color: var(--color-background-mute);
  border-radius: 100%;
  cursor: pointer;

  &__icon {
    display: block;
    color: var(--color-text-mute);
  }
}
</style>
