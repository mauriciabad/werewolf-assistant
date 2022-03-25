<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/base.css';

#app {
  min-height: 100vh;
}

a,
.green {
  text-decoration: none;
  color: hsl(160deg 100% 37% / 100%);
  transition: 0.4s;
}

a:hover {
  background-color: hsl(160deg 100% 37% / 20%);
}
</style>
