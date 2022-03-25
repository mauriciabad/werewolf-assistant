<script setup lang="ts">
import { useGameConfigStore } from '@/stores/gameConfig'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RoleCarrousel from '../components/distribute-roles/RoleCarrousel.vue'

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
    <div class="secret-info">
      <input
        type="checkbox"
        id="show-secret-info-input"
        v-model="showSecretInfo"
        class="secret-info__input"
      />
      <label for="show-secret-info-input" class="secret-info__label"
        >Show secret information</label
      >
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
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  text-align: center;

  &__input {
    margin-right: 1rem;
    vertical-align: middle;
  }
}
</style>
