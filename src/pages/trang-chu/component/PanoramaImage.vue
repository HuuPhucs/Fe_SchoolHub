<script lang="ts" setup>
import * as PANOLENS from 'panolens'
import { onMounted, ref } from 'vue'

const props = defineProps<{ image: '' }>()

const img = ref()

onMounted(() => {
  const panorama = new PANOLENS.ImagePanorama(props.image)

  const viewer = new PANOLENS.Viewer({
    container: img.value,
  })

  viewer.add(panorama)
})
</script>

<template>
  <div
    ref="img"
    class="image-panorama"
  />
  <VIcon
    class="icon-image-360"
  >
    tabler-360-view
  </VIcon>
</template>

<style lang="scss" scoped>
.icon-image-360{
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  transform: scale(2);
}
.image-panorama{
  min-width: 1200px;
  height: 620px;
}
</style>
