<script setup lang="ts">
import { ref, onMounted, defineModel } from 'vue'

const props = defineProps({
  placeholder: String,
})

const SPImagePicker = ref(null)
const imagefield = defineModel('imagefield')

function onSelectImage() {
  alert('YOU CLICKED IT')
}

onMounted(() => {
  console.log('SPImagePicker Mounted')
})
</script>

<template>
  <div ref="SPImagePicker">
    <InputGroup>
      <input v-model="imagefield" :placeholder="props.placeholder" />
      <InputGroupAddon>
        <Button icon="pi pi-image" v-on:click="onSelectImage" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<style scoped></style>
