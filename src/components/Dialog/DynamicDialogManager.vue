<template>
  <template v-for="[id, config] in dialogsEntries" :key="id">
    <DynamicDialog
      :visible="true"
      :header="config.header"
      :modal="config.modal"
      :closable="config.closable"
      :dismissable-mask="config.dismissableMask"
      :close-on-escape="config.closeOnEscape"
      :position="config.position"
      :style="config.style"
      :class="config.class"
      @hide="closeDialog(id)"
    >
      <DialogContent
        :component="config.component"
        :props="config.props"
        :dialog-id="id"
        :data="config.data"
        @close="closeDialog(id, $event)"
      />
    </DynamicDialog>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DynamicDialog from 'primevue/dynamicdialog'
import { useDialogStore } from '../../stores/dialog'
import DialogContent from './DialogContent.vue'
import type { DialogResult } from '../../interfaces/DialogTypes.ts'

const dialogStore = useDialogStore()
const dialogsEntries = computed(() => Array.from(dialogStore.dialogs.entries()))

const closeDialog = (id: string, result?: DialogResult) => {
  dialogStore.close(id, result)
}
</script>
