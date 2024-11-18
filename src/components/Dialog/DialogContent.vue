<template>
  <component
    :is="component"
    v-bind="props"
    :dialog-data="data"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { DialogResult } from '../../interfaces/DialogTypes.ts'

const props = defineProps<{
  component: any
  props?: Record<string, any>
  dialogId: string
  data?: any
}>()

const emit = defineEmits<{
  (e: 'close', result?: DialogResult): void
}>()

const handleClose = (result?: DialogResult) => {
  emit('close', result)
}
</script>
