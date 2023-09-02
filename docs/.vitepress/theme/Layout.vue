<script setup>
  import DefaultTheme from 'vitepress/theme'
  import Discussion from '../../../components/Discussion.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <Discussion style="margin-top: 40px;" />
    </template>
  </DefaultTheme.Layout>
</template>