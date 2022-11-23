<script setup lang="ts">
import type { PlayerConfig } from '@/stores/gameConfig'

defineProps<{
  players: PlayerConfig[]
  showSecretInfo: boolean
  creationDate: Date
}>()
</script>

<template>
  <div class="carrousel">
    <RoleCarrouselItem v-for="player in players" :key="player.id" :player="player" :show-secret-info="showSecretInfo"
      :creation-date="creationDate" class="carrousel__item" />
  </div>
</template>

<style scoped lang="scss">
.carrousel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.75rem;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;

  &::before,
  &::after {
    position: fixed;
    z-index: 1;
    content: '';
  }

  &::before {
    background: linear-gradient(to right,
        var(--color-background) calc(100% - 4rem),
        transparent 100%);
    inset: 0 calc(50vw + var(--max-width, 30rem) / 2 + 0.75rem) 0 0;
  }

  &::after {
    background: linear-gradient(to left,
        var(--color-background) calc(100% - 4rem),
        transparent 100%);
    inset: 0 0 0 calc(50vw + var(--max-width, 30rem) / 2 + 0.75rem);
  }

  &__item {
    scroll-snap-align: center;

    &:first-child {
      margin-left: calc(1.5rem + max(0px, calc(100vw - var(--max-width, 30rem))));
    }

    &:last-child {
      margin-right: calc(1.5rem + max(0px, calc(100vw - var(--max-width, 30rem))));
    }
  }
}
</style>
