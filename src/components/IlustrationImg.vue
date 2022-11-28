<script setup lang="ts">
import ilustrations, { type IlustrationId } from '@/data/ilustrations'
import { ref } from 'vue'

defineProps<{
  id: IlustrationId
}>()

const isLoading = ref<boolean>(true)
</script>

<template>
  <img
    :src="ilustrations[id]"
    alt=""
    loading="lazy"
    :class="{ loading: isLoading }"
    @load="isLoading = false"
  />
</template>

<style lang="scss" scoped>
.loading {
  background-image: url('@/assets/loading-spinner.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}
</style>
