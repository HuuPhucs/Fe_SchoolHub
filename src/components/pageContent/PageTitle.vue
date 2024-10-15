<template>

  <h1 class="text-center text-primary mb-7"><slot>{{ title }}</slot></h1>

</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>

</style>
