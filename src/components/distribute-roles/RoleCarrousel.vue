<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'
import RoleCarrouselItem from './RoleCarrouselItem.vue'

defineProps<{
  players: PlayerConfig[]
}>()
</script>

<template>
  <div class="carrousel">
    <RoleCarrouselItem
      v-for="player in players"
      :key="player.id"
      :player="player"
      class="carrousel__item"
    />
  </div>
</template>

<style scoped lang="scss">
.carrousel {
  &__item {
  }
}
</style>
