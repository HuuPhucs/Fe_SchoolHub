<script setup lang="ts">
import { DanhSachTrangTinh } from '@/Constants/enums'
import { useSetupLocalI18n } from '@/composable/setupI18n'
import type { GocTruyenThongModel } from '@/models/gioithieu.models'
import GocTruyenThong from '@/services/gocTruyenThong.service'
import PageConfigService from '@/services/pageConfig.service'
import Flipbook from 'flipbook-vue'
import { getCurrentInstance, ref } from 'vue'
import SuKienNoiBat from './component/SuKienNoiBat.vue'
import SwiperSuKien from './component/SwiperSuKien.vue'

const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();

const instance: any = getCurrentInstance();
const pages: Ref<string[]> = ref([null])
const book = ref()
const dataGocTruyenThong: Ref<GocTruyenThongModel[]> = ref([])
const pageConfig = ref({})

const loadBook = async () => {
  dataGocTruyenThong.value = await GocTruyenThong.GetAll()

  const config = await PageConfigService.getPageConfig(DanhSachTrangTinh.GocTruyenThong)
  setupMessageForRegularPageConfig(config)
  pageConfig.value = config.caiDatTongThe[0]
  if (dataGocTruyenThong.value.length) {
    pages.value = [null]
    pages.value.push(...dataGocTruyenThong.value.map(data => data.linkAnh))
    console.log(pages.value)
  }
}

onBeforeMount(async () => {
  await loadBook()
})
const goFirstPage=()=>{
  instance.refs.myBook.goToPage(1)
}
const goLastPage=()=>{
  instance.refs.myBook.goToPage(pages.value.length-1)
}
</script>

<template>
  <PageContent
    :title="t(pageConfig.tieuDe || '')"
    class="pb-12"
  >
    <ContentContainer>
      <div class="text-justify">
        <p> {{ t(pageConfig.mota || '') }} </p>
      </div>
      <div>
        <Flipbook
          ref="myBook"
          v-slot="flipbook"
          class="flipbook"
          :click-to-zoom="false"
          :pages="pages"
          :drag-to-flip="true"
          :centering="true"
        >
          <div class="flipbook-head">
            <IconBtn
              size="small"
              @click="goFirstPage()"
            >
              <VIcon icon="nsps-first" />
            </IconBtn>

            <IconBtn
              size="small"
              @click="flipbook.flipLeft"
            >
              <VIcon icon="nsps-prev" />
            </IconBtn>

            <span>{{ flipbook.page }}</span>
            <span>/</span>
            <span>{{ flipbook.numPages }}</span>

            <IconBtn
              size="small"
              @click="flipbook.flipRight"
            >
              <VIcon icon="nsps-next" />
            </IconBtn>
            <IconBtn
              size="small"
              @click="goLastPage()"
            >
              <VIcon icon="nsps-last" />
            </IconBtn>
          </div>
        </Flipbook>
      </div>
      <SuKienNoiBat class="mt-4" />
      <SwiperSuKien class="mt-4" />
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
:deep(.bounding-box) {
  box-shadow: 1px 1px 10px #191b25;
}

.flipbook {
  position: relative;
  block-size: 842px;
  inline-size: 100%;
}

.flipbook-head {
  position: absolute;
  inset-block-end: -40px;
  inset-inline-end: 46%;
}

.traditional {
  margin-block-start: 100px;
}

.traditional-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.traditional-dsc1 {
  color: #005baa !important;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.traditional-dsc2 {
  color: #191b25;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
}

.traditional-img {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.traditional-img1 {
  position: relative;
  border-radius: 10px;
  block-size: 640px;
  inline-size: 714px;
}

.position {
  position: absolute;
  overflow: hidden;
  border-radius: 10px;
  background:
    linear-gradient(
      0deg,
      rgba(0, 13, 46, 80%) 0%,
      rgba(0, 13, 46, 80%) 100%
    ),
    lightgray 50%;
  block-size: 100%;
  inline-size: 100%;
  inset: 0 !important;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.traditional-img1:hover .position {
  opacity: 0.8;
}

.traditional-img1:hover .traditional-img1-title {
  border-radius: 10px;
  opacity: 1;
}

.img {
  overflow: hidden;
  border-radius: 10px;
  block-size: 640px;
  inline-size: 714px;
}

.traditional-img-right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}

.traditional-img1-title {
  position: absolute;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  inset-block-end: 26px;
  inset-inline-start: 114px;
  line-height: normal;
  opacity: 0;
  text-align: center;
  text-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
  transition: opacity 0.2s ease-in-out;
}

.traditional-img2 {
  position: relative;
  border-radius: 10px;
  block-size: 307px;
  gap: 24px !important;
  inline-size: 463px;
  margin-block-end: 12px;
}

.img2 {
  overflow: hidden;
  border-radius: 10px;
  block-size: 307px;
  gap: 24px !important;
  inline-size: 463px;
}

.traditional-img2:hover .traditional-img2-title {
  opacity: 1;
  transition-delay: 0.25s;
}

.traditional-img2:hover .position {
  opacity: 0.8;
}

.traditional-img2-title {
  position: absolute;
  color: #fff;

  // text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  inset-block-end: 24px;
  inset-inline-end: 117px;
  line-height: normal;
  opacity: 0;
  text-align: center;
}

.traditional-img3 {
  position: relative;
  block-size: 307px;
  gap: 24px !important;
  inline-size: 463px;
  margin-block-start: 12px;
}

.traditional-img3:hover .position {
  opacity: 0.8;
}

.img3 {
  overflow: hidden;
  border-radius: 10px;
  block-size: 307px;
  gap: 24px !important;
  inline-size: 463px;
}

.traditional-img3:hover .traditional-img3-title {
  opacity: 1;
  transition-delay: 0.25s;
}

.traditional-img3-title {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #fff !important;
  border-radius: 4px;
  block-size: 251px;
  gap: 10px;
  inline-size: 407px;
  inset-block-start: 28px;
  inset-inline-start: 28px;
  opacity: 0;
}

.traditional-img3-title1 {
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  text-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
}

.traditional-img3-title2 {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  inline-size: 295px;
  line-height: normal;
  text-align: center;
  text-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
}

.them {
  display: flex;
  justify-content: center;
  border-radius: 6px;
  background-color: var(--primary-blue, #005baa);
  block-size: 40px;
  gap: 10px;
  inline-size: 162px;
  padding-block: 8px;
  padding-inline: 16px;
}

.them-title {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;
}

/* Mobile */

@media screen and (max-width: 768px) {
  .traditional {
    margin-block-start: 400px;
    padding-block: 0;
    padding-inline: 16px;
  }

  .flipbook {
    block-size: 90vh;
    inline-size: 90vw;
  }

  .flipbook-head {
    position: absolute;
    inset-block-end: 0%;
    inset-inline-end: 32%;
  }

  .traditional-dsc1 {
    color: #0635aa;
    font-size: 20px !important;
    font-style: normal;
    font-weight: 700;
    inline-size: max-content;
    line-height: normal;
  }

  .traditional-img,
  .traditional-img2,
  .traditional-img3,
  .traditional-img2,
  .img,
  .img2,
  .img3 {
    inline-size: 90vw !important;
  }

  .traditional-img1-title {
    font-size: 18px !important;
    inset-block-end: 19.74px;
    inset-inline: 10px 14.5px !important;
  }

  .img,
  .img2,
  .img3 {
    object-fit: cover;
    object-position: center;
  }

  .traditional-img {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .img2,
  .img3 {
    border-radius: 10px;
    block-size: 640px !important;
    inline-size: 714px !important;
  }

  .traditional-img2,
  .traditional-img3 {
    border-radius: 10px;
    block-size: 640px !important;
    inline-size: 714px !important;
  }

  .traditional-img3-title {
    position: absolute !important;
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    inset-inline-start: 50px !important;
    opacity: 0;
  }

  .traditional-img2-title {
    inset-block-end: 26px;
    inset-inline-start: 114px;
  }

  .traditional-img3-title {
    inset-block-start: 50% !important;
    inset-inline-start: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
}
</style>
