<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted, onUpdated, inject } from 'vue'
import DynamicDialogManager from './Dialog/DynamicDialogManager.vue'
import { DialogService } from './Dialog/DialogService'
import { useDialog } from 'primevue/usedialog'
import SPImagePickerDialog from './SPImagePickerDialog.vue'
import type { IImagePickerProps } from '../interfaces/ImagePickerTypes'
import { useImagesStore } from '../stores/images'
import type { DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions'

const appImages = useImagesStore()
const dialogService = inject<DialogService>('dialogService')!
const dialog = useDialog()
const props = defineProps<IImagePickerProps>()

const resultData = ref({})

const onOpenDialog = async () => {
  const result = await dialogService.show(
    SPImagePickerDialog,
    {
      header: 'Select an Image You Goober',
      width: '80vw',
      height: '80vh',
      modal: true,
      data: {
        wurl: props.webAbsoluteUrl
      }
    }
  )
  if (!result.cancelled) {
    console.log('Dialog Results:' + result.data)
  }
}

const imagefield = defineModel('imagefield')

// #region FUNCTIONS

function onSelectImage() {
  const dialogRef = dialog.open(SPImagePickerDialog, {
    props: {
      header: 'Select an Image',
      style: {
        height: '80vh',
        width: '80vw',
      },
      modal: true,
    },
    data: {
      wurl: props.webAbsoluteUrl,
    },
    onClose: (result: DynamicDialogCloseOptions) => {
      if (result.data && result.data.imageurl) {
        console.log('DATA RETURNED: ' + result.data.imageurl)
        imagefield.value = result.data.imageurl
      }
    },
  })
}

// #endregion
/* onUpdated(() => {
  console.log('UPDATED: ' + resultData.value)
}) */

onMounted(() => {
  console.log('SPImagePicker Mounted')
  /* if (props.webAbsoluteUrl) {
    appImages.getLibraries(props.webAbsoluteUrl)
  } */
})
</script>

<template>
  <div>
    <DynamicDialogManager />
    <InputGroup>
      <input v-model="imagefield" :placeholder="props.placeholder" />
      <InputGroupAddon>
        <Button icon="pi pi-image" v-on:click="onOpenDialog" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<style scoped></style>
