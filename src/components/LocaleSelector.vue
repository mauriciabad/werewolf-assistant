<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { getLocaleInfo, localesInfo } from '@/i18n'
import type { LocaleInfo } from '@/i18n'
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

const { locale } = useI18n()

const localeLangOnly = computed<string>({
  get: () => {
    return locale.value.split('-')[0]
  },
  set: (value) => {
    locale.value = value
  },
})

const currentLocaleInfo = computed<LocaleInfo | undefined>(() =>
  getLocaleInfo(localeLangOnly.value)
)
</script>

<template>
  <label class="selector">
    <img
      v-if="currentLocaleInfo"
      class="selector__image"
      :src="currentLocaleInfo.icon"
      alt=""
    />
    <span class="selector__name">{{
      currentLocaleInfo ? currentLocaleInfo.name : locale
    }}</span>
    <ChevronDownIcon class="selector__arrow" />
    <select v-model="localeLangOnly" class="selector__input">
      <option
        v-for="localeInfo in localesInfo"
        :key="localeInfo.id"
        :value="localeInfo.id"
      >
        {{ localeInfo.name }}
      </option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
.selector {
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 9rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  appearance: none;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0 var(--color-primary);
  color: var(--color-text);
  text-align: left;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:focus-within {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  &__input {
    position: absolute;
    z-index: 1;
    cursor: pointer;
    inset: 0;
    opacity: 0;
  }

  &__image {
    height: 20px;
    margin-right: 0.5rem;
  }

  &__name {
    flex: 1 1 0;
    line-height: 1;
  }

  &__arrow {
    height: 20px;
  }
}
</style>
