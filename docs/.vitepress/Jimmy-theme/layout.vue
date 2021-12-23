<template>
  <h1>Custom Layout!</h1>
  <!-- <img :src="$withBase('/assets/bg.jpg')" alt="foo" /> -->
  <Content />
  <!-- make sure to include markdown outlet -->
</template>

<script setup>
alert(111)
import { onMounted } from 'vue'

onMounted(() => {
  console.log('hello world')
})
</script>

<style>
/* h1 {
  color: red;
} */
</style>