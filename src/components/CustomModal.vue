<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

import { XIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const showModal = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <VueFinalModal
    v-slot="{ params, close }"
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <div class="modal__content">
      <slot :params="params"></slot>
    </div>
    <div class="modal__action">
      <slot name="footer" :close="close"> </slot>
    </div>
    <div role="button" class="modal__close" @click="close">
      <XIcon />
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
::v-deep(.modal-container) {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  max-height: 90%;
  flex-direction: column;
  border: 1px solid var(--color-border);
  margin: 0 1rem;
  background: var(--color-background);
  border-radius: 0.25rem;
}

.modal__title {
  margin: 0 2rem 0 0;
  color: var(--color-heading);
  font-size: 1.5rem;
  text-align: center;
}

.modal__content {
  overflow: auto;
  flex-grow: 1;
  padding: 1rem;
  padding-bottom: 0.5rem;
  text-align: center;
}

.modal__action {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: 0.5rem;
  gap: 1rem;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  cursor: pointer;
}
</style>
