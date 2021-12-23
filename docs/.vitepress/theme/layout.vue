<template>
  <h1>Custom Layout!</h1>
  <img :src="$withBase('/assets/bg.jpg')" alt="foo" />
  <Content />
  <!-- make sure to include markdown outlet -->
</template>

<script>
export default {

}
</script>

<style>
h1 {
  color: red;
}
</style>