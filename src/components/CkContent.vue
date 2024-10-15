<template>
  <div class="ck-content" v-if="data">
    <slot>
      <div v-html="props.data"/>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: string
}>();
</script>

<style lang="scss">
@use "@/styles/ck-content.scss";
</style>
