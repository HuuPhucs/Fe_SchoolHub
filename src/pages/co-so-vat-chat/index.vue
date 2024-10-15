<template>
  <page-content :title="t(coSoVatChat?.tieuDe || '')" class="mb-5">
    <content-container>
      <v-row class="mt-8">
        <ck-content class="mt-4 mb-4 text-justify" :data="t(coSoVatChat?.mota || '')"/>
      </v-row>
      <v-row>
        <v-col>
          <swiper-image
              :is-title="false"
              class="mb-12"
          />
        </v-col>
      </v-row>

    </content-container>
  </page-content>
</template>
<script setup lang="ts">

import { DanhSachTrangTinh } from '@/Constants/enums'
import { useSetupLocalI18n } from '@/composable/setupI18n'
import SwiperImage from "@/pages/trang-chu/component/swiperImage.vue"
import PageConfigService from '@/services/pageConfig.service'
import { ref } from "vue"

const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const coSoVatChat = ref<{ mota: string }>()

const loadData = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.CoSoVatChat)
  setupMessageForRegularPageConfig(res)
  coSoVatChat.value = res.caiDatTongThe[0]
}

onMounted(async () => {
  try {
    await loadData()
  } catch {
    console.error('load data failed!')
  }
})

</script>

<style lang="scss" scoped>
:root {
  --text: #191b25;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  object-position: center;
}

ul {
  list-style-type: none;
}
</style>


