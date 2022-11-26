<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  visible: boolean
  length?: number
}>()

const fakeText = computed(() => {
  const length = props.length ?? 0
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i++) {
    if (i !== 0 && i !== length - 1 && Math.random() < 1 / 7) {
      result += ' '
    } else {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
  }

  return result
})
</script>

<template>
  <span v-if="visible">{{ text }}</span>
  <span v-else class="hidden-text">{{ fakeText }}</span>
</template>

<style scoped lang="scss">
.hidden-text {
  filter: blur(0.25em);
}
</style>
