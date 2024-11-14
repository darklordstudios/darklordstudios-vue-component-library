<script setup lang="ts">
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, onBeforeMount, onMounted, onUnmounted, inject } from 'vue'
import type { Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useImagesStore } from './stores/images'
import type { StockImagesEvent, SubmitValue } from './interfaces/StockImageTypes'
import type { IImagePickerResult } from './interfaces/ImagePickerTypes'

// #region VARIABLES
const appImages = useImagesStore()
const selectedImageUrl = ref('')
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

// #endregion

// #region FUNCTIONS

function handleSave(event: StockImagesEvent): void {
  let cdnFileInfo: SubmitValue
  if (event.Values && (event.Values as SubmitValue[]).length > 0) {
    cdnFileInfo = (event.Values as SubmitValue[])[0]
    if (cdnFileInfo) {
      let imagePickerResult: IImagePickerResult = {
        downloadFileContent: () => {
          return appImages.getImageContentAsFile(cdnFileInfo.sourceUrl, appImages.getFileNameFromUrl(appImages.getFileNameFromUrl(cdnFileInfo.sourceUrl)))
        },
        imageAbsoluteUrl: cdnFileInfo.sourceUrl,
        imageName: appImages.getFileNameFromUrl(cdnFileInfo.sourceUrl),
        imageNameWithoutExtension: appImages.getFileNameWithoutExtension(cdnFileInfo.sourceUrl)
      }
      console.log('HANDLE SAVE ' + imagePickerResult)
      selectedImageUrl.value = imagePickerResult.imageAbsoluteUrl
      dialogRef?.value.close({
        url: selectedImageUrl.value
      })
    }
  }
}

function handleImageIframeEvent(event): void {
  if (!event || !event.origin || event.origin.indexOf('https://hubblecontent.osi.office.net') !== 0) {
    return
  }
  const eventData: StockImagesEvent = JSON.parse(event.data)
  if (eventData.MessageId === 'AddItem') {
    // handle save
    handleSave(eventData)
  } else if (eventData.MessageId === 'CancelDialog') {
    // handle close
    console.log('CLOSE SELECTED')
  }
}

// #endregion

onBeforeMount(() => {
  appImages.getLibraries()
})

onMounted(() => {
  window.addEventListener('message', handleImageIframeEvent)
})

onUnmounted(() => {
  window.removeEventListener('message', handleImageIframeEvent)
})
</script>

<template>
  <div ref="ImagePickerDialog" class="card w-full h-full">
    <Tabs value="0" class="h-full">
      <TabList>
        <Tab value="0" as="div" class="flex align-items-center justify-content-center gap-2">
          <Button icon="bi bi-diagram-2" severity="success" rounded size="small" />
          <span class="font-bold whitespace-nowrap">Site</span>
        </Tab>
        <Tab value="1" as="div" class="flex align-items-center justify-content-center gap-2">
          <Button icon="bi bi-images" severity="success" rounded size="small" />
          <span class="font-bold whitespace-nowrap">Stock Images</span>
        </Tab>
        <Tab value="2" as="div" class="flex align-items-center justify-content-center gap-2">
          <Button icon="bi bi-cloud-arrow-up" severity="success" rounded size="small" />
          <span class="font-bold whitespace-nowrap">Upload</span>
        </Tab>
        <!-- <Tab value="3" as="div" class="flex align-items-center justify-content-center gap-2">
          <Button icon="bi bi-link" severity="success" rounded size="small" />
          <span class="font-bold whitespace-nowrap">Link</span>
        </Tab>
        <Tab value="4" as="div" class="flex align-items-center justify-content-center gap-2">
          <Button icon="bi bi-hdd" severity="success" rounded size="small" />
          <span class="font-bold whitespace-nowrap">One Drive</span>
        </Tab> -->
      </TabList>
      <TabPanels class="h-full">
        <TabPanel value="0" class="w-full h-full"></TabPanel>
        <TabPanel value="1" class="w-full h-full">
          <iframe :src="appImages.stockImagePickerUrl" style="width: 100%; height: 100%"></iframe>
        </TabPanel>
        <TabPanel value="2" class="w-full h-full"></TabPanel>
        <!-- <TabPanel value="3" class="w-full h-full"></TabPanel>
        <TabPanel value="4" class="w-full h-full"></TabPanel> -->
      </TabPanels>
    </Tabs>
  </div>
</template>

<style>
.p-dialog-content {
  height: 100% !important;
}
</style>
