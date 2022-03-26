<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'
import RoleCarrouselItem from './RoleCarrouselItem.vue'

defineProps<{
  players: PlayerConfig[]
  showSecretInfo: boolean
}>()
</script>

<template>
  <div class="carrousel">
    <RoleCarrouselItem
      v-for="player in players"
      :key="player.id"
      :player="player"
      :show-secret-info="showSecretInfo"
      class="carrousel__item"
    />
  </div>
</template>

<style scoped lang="scss">
.carrousel {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.75rem;
  scroll-snap-type: x mandatory;

  &__item {
    scroll-snap-align: center;

    &:first-child {
      margin-left: 1.5rem;
    }

    &:last-child {
      margin-right: 1.5rem;
    }
  }
}
</style>
