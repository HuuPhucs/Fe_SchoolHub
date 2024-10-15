<script setup lang="ts">
import {useGenerateImageVariant} from '@core/composable/useGenerateImageVariant'
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-description="Chúng tôi không thể tìm thấy trang bạn đang truy cập."
      error-title="Trang không tồn tại :(("
    />
    <VBtn
      to="/"
      class="mb-12"
    >
      Quay về trang chủ
    </VBtn>

    <!-- 👉 Image -->
    <!--    <div class="misc-avatar w-100 text-center">-->
    <!--      <VImg-->
    <!--        :src="misc404"-->
    <!--        alt="Coming Soon"-->
    <!--        :max-width="200"-->
    <!--        class="mx-auto"-->
    <!--      />-->
    <!--    </div>-->

    <!--    <VImg-->
    <!--      :src="authThemeMask"-->
    <!--      class="misc-footer-img d-none d-md-block"-->
    <!--    />-->
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
