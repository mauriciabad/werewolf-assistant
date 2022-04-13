<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import Layout from '../components/Layout.vue'

const { t } = useI18n()
</script>

<template>
  <Layout locale-selector>
    <div class="content">
      <h1 class="title">{{ t('whatAreYouQuestion') }}</h1>
      <div class="links">
        <RouterLink class="link" :to="{ name: 'storyteller' }">{{
          t('storyteller')
        }}</RouterLink>
        <RouterLink class="link" :to="{ name: 'player' }">{{
          t('player')
        }}</RouterLink>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
  font-size: 3rem;
  text-align: center;
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.link {
  display: flex;
  height: 10rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid var(--color-border);
  aspect-ratio: 1;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  font-size: 1.5rem;
}
</style>
