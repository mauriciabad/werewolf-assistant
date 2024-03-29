<script lang="ts" setup>
import type { CustomAbility } from '@/data/abilities.types'
import { isCustomAbility } from '@/data/abilities.types'
import type { CustomCharacter } from '@/data/characters.types'
import { isCustomCharacter } from '@/data/characters.types'
import type { IlustrationId } from '@/data/ilustrations'
import { allIlustrationIds } from '@/data/ilustrations'
import { IconCheck, IconX } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import IlustrationImg from '@/components/IlustrationImg.vue'
import CustomModal from '@/components/CustomModal.vue'
import IconButton from '@/components/IconButton.vue'

const props = defineProps<{
  type: 'character' | 'ability'
  modelValue: boolean
  initialValue?: CustomCharacter | CustomAbility
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void

  (e: 'editCharacter', value: CustomCharacter): void
  (e: 'editAbility', value: CustomAbility): void

  (e: 'createCharacter', value: CustomCharacter): void
  (e: 'createAbility', value: CustomAbility): void
}>()

const { t } = useI18n()

const showModal = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

watch(showModal, () => {
  if (showModal.value) {
    name.value = props.initialValue?.name ?? ''
    description.value = props.initialValue?.description ?? ''
    ilustration.value = props.initialValue?.ilustration ?? undefined
  }
})

const name = ref<string>(props.initialValue?.name ?? '')
const description = ref<string>(props.initialValue?.description ?? '')
const ilustration = ref<IlustrationId | undefined>(
  props.initialValue?.ilustration ?? undefined
)

const isValid = computed<boolean>(
  () => !!name.value && !!description.value && !!ilustration.value
)

function handleConfirm(): void {
  if (!name.value || !description.value || !ilustration.value) return
  showModal.value = false

  if (
    props.initialValue &&
    isCustomCharacter(props.initialValue) &&
    props.type === 'character'
  ) {
    const character: CustomCharacter = {
      ...props.initialValue,
      name: name.value,
      description: description.value,
      ilustration: ilustration.value,
    }
    emit('editCharacter', character)
    return
  }

  if (
    props.initialValue &&
    isCustomAbility(props.initialValue) &&
    props.type === 'ability'
  ) {
    const ability: CustomAbility = {
      ...props.initialValue,
      name: name.value,
      description: description.value,
      ilustration: ilustration.value,
    }
    emit('editAbility', ability)
    return
  }

  if (!props.initialValue && props.type === 'character') {
    const character: CustomCharacter = {
      id: `cc:${Date.now()}`,
      name: name.value,
      description: description.value,
      ilustration: ilustration.value,
      team: 'villagers',
    }
    emit('createCharacter', character)
    return
  }

  if (!props.initialValue && props.type === 'ability') {
    const ability: CustomAbility = {
      id: `ca:${Date.now()}`,
      name: name.value,
      description: description.value,
      ilustration: ilustration.value,
    }
    emit('createAbility', ability)
    return
  }
}
</script>

<template>
  <CustomModal v-model="showModal">
    <template #title>
      <template v-if="initialValue">
        <template v-if="type === 'character'">{{
          t('ui.editCustomCharacter')
        }}</template>
        <template v-else>{{ t('ui.editCustomAbility') }}</template>
      </template>
      <template v-else>
        <template v-if="type === 'character'">{{
          t('ui.createCustomCharacter')
        }}</template>
        <template v-else>{{ t('ui.createCustomAbility') }}</template>
      </template>
    </template>

    <label class="fiel">
      <span class="field__label">{{ t('ui.name') }}</span>
      <input
        v-model="name"
        class="field__input"
        type="text"
        required
        maxlength="50"
      />
    </label>
    <label class="field">
      <span class="field__label">{{ t('ui.description') }}</span>
      <textarea
        v-model="description"
        class="field__input field__input--textarea"
        required
        maxlength="1000"
      />
    </label>

    <span class="field__label">{{ t('ui.image') }}</span>
    <div class="ilustration-selector">
      <IlustrationImg
        v-for="ilustrationId in allIlustrationIds"
        :id="ilustrationId"
        :key="ilustrationId"
        class="ilustration-selector__ilustration"
        :class="{
          'ilustration-selector__ilustration--selected':
            ilustration === ilustrationId,
        }"
        tabindex="0"
        role="button"
        :title="ilustrationId"
        @click="ilustration = ilustrationId"
        @keypress.enter="ilustration = ilustrationId"
        @keypress.space="ilustration = ilustrationId"
      />
    </div>

    <template #footer="{ close }">
      <IconButton @click="close">
        <template #icon> <IconX /> </template>{{ t('ui.cancel') }}
      </IconButton>

      <IconButton
        :disabled="!isValid"
        @click="
          () => {
            handleConfirm()
            close()
          }
        "
      >
        <template #icon> <IconCheck /> </template>{{ t('ui.confirm') }}
      </IconButton>
    </template>
  </CustomModal>
</template>

<style lang="scss" scoped>
.ilustration-title {
  margin-top: 2rem;
  color: var(--text-color);
  font-size: 1.2rem;
  text-align: left;
}

.ilustration-selector {
  display: grid;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));

  &__ilustration {
    width: 100%;
    border-radius: 0.5rem;
    aspect-ratio: 1;
    cursor: pointer;
    outline-offset: 0.125rem;

    &:focus-visible {
      outline: 0.25rem solid #333;
    }

    &--selected {
      outline: 0.25rem solid var(--color-primary) !important;
    }
  }
}

.field {
  &__label {
    display: block;
    margin-top: 0.5rem;
    margin-left: 0.25rem;
    font-size: 1rem;
    text-align: left;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-background-soft);
    box-shadow: 0 0 0 0 var(--color-primary);
    color: inherit;
    outline: none;
    transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &:focus-visible {
      box-shadow: 0 0 0 3px var(--color-primary);
    }

    &--textarea {
      height: 6rem;
      min-height: 6rem;
      resize: vertical;
    }
  }
}
</style>
