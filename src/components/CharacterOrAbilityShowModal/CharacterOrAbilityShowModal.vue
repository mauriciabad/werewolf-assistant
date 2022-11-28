<script lang="ts" setup>
import { useDataTranslations } from '@/compositions/useDataTranslations'
import type { Ability, CustomAbility } from '@/data/abilities.types'
import { isCustomAbility, isAbility } from '@/data/abilities.types'
import type { Character, CustomCharacter } from '@/data/characters.types'
import { isCustomCharacter, isCharacter } from '@/data/characters.types'
import { XIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IlustrationImg from '@/components/IlustrationImg.vue'
import CustomModal from '@/components/CustomModal.vue'
import IconButton from '@/components/IconButton.vue'

const props = defineProps<{
  modelValue: boolean
  data: Character | CustomCharacter | Ability | CustomAbility
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

const { getName, getDescription } = useDataTranslations()

const showModal = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <CustomModal v-model="showModal">
    <template #title>
      <template v-if="isCustomCharacter(data) || isCharacter(data)">{{
        t('ui.character')
      }}</template>
      <template v-else-if="isCustomAbility(data) || isAbility(data)">{{
        t('ui.ability')
      }}</template>
    </template>

    <template #default>
      <IlustrationImg :id="data.ilustration" class="ilustration" />
      <h1 class="name">{{ getName(data) }}</h1>
      <p>{{ getDescription(data) }}</p>
    </template>

    <template #footer="{ close }">
      <IconButton @click="close">
        <template #icon> <XIcon /> </template>{{ t('ui.close') }}
      </IconButton>
    </template>
  </CustomModal>
</template>

<style lang="scss" scoped>
.name {
  font-size: 3rem;
}

.ilustration {
  width: 100%;
  min-width: 0;
  max-width: 25rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
}
</style>
