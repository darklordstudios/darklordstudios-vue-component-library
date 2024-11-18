<script setup lang="ts">
import { ref } from 'vue'
import SPImagePicker from './components/SPImagePicker.vue'

const imagewidget = ref(null)
const selectedImage = ref('')
</script>

<template>
  <div>
    <div ref="imagewidget" style="border: 2px solid red; min-height: 100px; min-width: 200px">
      <img :src="selectedImage" style="width: 1280px; height: 720px" />
      <SPImagePicker
        v-model:imagefield="selectedImage"
        placeholder="Select an Image You Gumby!"
        webAbsoluteUrl="https://legodan.sharepoint.com/sites/LegoDanDev"
      />
    </div>
  </div>
</template>

<style scoped></style>
