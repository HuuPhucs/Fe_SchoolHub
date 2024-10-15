<template>
  <div class="content-container">
    <slot/>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
@use "@layouts/styles/mixins";

.content-container {
  @include mixins.boxed-content(true);
}
//.v-breadcrumbs-item {
//  white-space: nowrap;
//}
//.v-breadcrumbs-item--disabled {
//  opacity: 1 !important;
//  color: rgb(var(--v-primary-text)) !important;
//  display: -webkit-box !important;
//  -webkit-box-orient: vertical !important;
//  -webkit-line-clamp: 1 !important;
//  overflow: hidden !important;
//  text-overflow: ellipsis !important;
//  white-space: normal !important;
//}
</style>
