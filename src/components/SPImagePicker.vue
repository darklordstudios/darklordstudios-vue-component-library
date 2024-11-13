<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  label: string
}>

const SPImagePicker = ref(null)

onMounted(() => {
  console.log('SPImagePicker Mounted')
})
</script>

<template>
  <div ref="SPImagePicker">
    <button>{{ props.label }}</button>
  </div>
</template>

<style scoped></style>
