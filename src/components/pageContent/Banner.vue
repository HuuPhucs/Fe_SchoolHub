<script setup lang="ts">
import {watch} from 'vue'
import {useRoute} from 'vue-router'
import MenuService from '@/services/menu.service'
import defaultBanner from '@images/pages/default_banner.png'

const props = defineProps<{
  bannerData?: string
}>()

const menuConfig = ref();
const banner = ref(props.bannerData || menuConfig?.linkBanner || defaultBanner);

watch(menuConfig, (newValue) => {
  banner.value = props.bannerData || newValue?.linkBanner || defaultBanner;
})

watch(()=> props.bannerData, (newValue) => {
  banner.value = props.bannerData || newValue?.linkBanner || defaultBanner;
})

const route = useRoute()

onBeforeMount(async () => {
  const menuConfigs = await MenuService.GetMenuConfig()
  menuConfig.value = menuConfigs.find((m: any) => route.matched.some(r => r.path.startsWith(m.url)))
})
</script>

<template>
  <div class="layout-banner">
    <img
      :src="banner"
      alt="banner"
    >
  </div>
</template>

<style lang="scss" scoped>

</style>
