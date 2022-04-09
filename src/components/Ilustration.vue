<script setup lang="ts">
import ilustrations, { type IlustrationId } from '@/data/ilustrations'

defineProps<{
  id: IlustrationId
}>()
</script>

<template>
  <img :src="ilustrations[id]" alt="" loading="lazy" />
</template>
