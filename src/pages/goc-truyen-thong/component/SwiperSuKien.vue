<script setup lang="ts">
// eslint-disable-next-line import/order
import type { SlideSuKien } from "@/models/slideSuKien.models";
// eslint-disable-next-line import/order
import TinTucService from "@/services/tinTuc.service";
import TrangChuService from "@/services/TrangChu.service";

// Import Swiper Vue.js components
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";

const thumbsSwiper = ref(null);

const dataSwiper: Ref<SlideSuKien[]> = ref([]);

const isLoop = ref(true);
const isFreeMode = ref(true);
const isWatchSlideProgress = ref(true);

const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});

const setThumbsSwiper = (swiper: null) => {
  thumbsSwiper.value = swiper;
};

const modules = ref([FreeMode, Navigation, Thumbs]);

const tableConfigTinTuc = ref({
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 3,
    totalPages: 1,
    totalItems: 1,
  },
});

const loadData = async () => {
  const params = {
    pageNo: tableConfigTinTuc.value.pagination.pageNo,
    pageSize: tableConfigTinTuc.value.pagination.pageSize,
  };

  const res = await TinTucService.GetAllTinTuyenThong(params);
  // const res = await TinTucService.GetAll(params)
  if (res) {
    debugger
    tableConfigTinTuc.value.data = res.data;
    tableConfigTinTuc.value.pagination = {
      ...tableConfigTinTuc.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    };

    dataSwiper.value = res.data.map((item: any) => {
      return {
        id: item.id,
        imgUrl: item.anhDaiDien,
        title: item.tieuDe,
      };
    });
  }
};

const data = async() => {
   const res = await TrangChuService.GetCoSoVatChat ()
 
    dataSwiper.value = res[0].chiTietCoSoVatChat;
}

onMounted(async () => {
  modules.value = [FreeMode, Navigation, Thumbs];
  await loadData();
  // await data()
});
</script>

<template>

  <ContentContainer   v-if="dataSwiper.length > 0" style="backgroud: white">
    <VRow>
      <VCol>
        <div>
          <!-- <Swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            loop
            loading="lazy"
            :navigation="navigation"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="height-0"
          >
            <SwiperSlide
              v-for="item in dataSwiper"
              :key="item.id"
            >
              <img :src="item.imgUrl">
            </SwiperSlide>
          </Swiper> -->
          <Swiper
            :loop="isLoop"
            loading="lazy"
            :space-between="60"
            :slides-per-view="3"
            :free-mode="isFreeMode"
            :watch-slides-progress="isWatchSlideProgress"
            :modules="modules"
            :navigation="navigation"
            class="mySwiper"
          >
            <SwiperSlide
              v-for="item in dataSwiper"
              :key="item.id"
            >
              <div>
                <a
                  target="_blank"
                  href="#"
                >
                  <img :src="item.linkAnh">
                  <div class="title">
                    {{ item.title }}
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <div class="swiper-button-prev" />
            <div class="swiper-button-next" />
          </Swiper>
        </div>
      </VCol>
    </VRow>
  </ContentContainer>
</template>

<style lang="scss" scoped>
.swiper-button-prev,
.swiper-button-next {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  background: linear-gradient(90deg, #f05a22 0%, #feb907 100%) !important;
  block-size: 28px !important;
  inline-size: 28px !important;
  margin-block: -15px 0;
  margin-inline: -10px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: white;
  font-size: 14px;
}

.sightseeing-slide {
  position: relative;
  block-size: 620px;
}

.main-select {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  border-radius: 6px !important;
  block-size: 363px;
  inline-size: 230px;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.menuList {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  background-color: #0635aa;
  block-size: 44px;
  cursor: pointer;
  gap: 10px;
  padding-block: 10px;
  padding-inline: 16px;
}

.menuList__select {
  color: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.select-item {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  block-size: 44px;
  border-block-end: 1px solid var(--gray-6-d-768-f, #6d768f);
  color: var(--primary-ffffff, #fff);
  cursor: pointer;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  gap: 10px;
  inline-size: 230px;
  line-height: normal;
  padding-block: 10px;
  padding-inline: 16px;
}

.menuList__popover {
  background-color: rgba(25, 27, 37, 80%);
  transition-delay: 2s !important;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
}

.swiper-slide img {
  display: block;
  block-size: 100%;
  inline-size: 100%;
  min-block-size: 310px;
  object-fit: cover;
}

.mySwiper2 {
  block-size: 80%;
  inline-size: 100%;
}

.mySwiper {
  display: flex;
  box-sizing: border-box;
  align-items: center !important;
  justify-content: center !important;
  block-size: 20%;
  padding-block: 0 0;
  padding-inline: 40px;
}

.mySwiper img {
  border: 4px solid transparent;
  border-radius: 10px;
}

.mySwiper .swiper-slide {
  block-size: 80%;
  inline-size: 25%;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
}

.swiperIframe {
  block-size: 100%;
  inline-size: 100%;
}

.title {
  position: absolute;
  background-color: rgba(var(--v-theme-primary), 0.4);
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  inset-block-end: 0;
  inset-inline: 0;
  line-height: normal;
  margin-block-end: 20px;
  opacity: 1;
  text-align: center;
  transition: opacity 0.2s ease-in-out;
}

.visibility-hidden {
  visibility: hidden;
}

.height-0 {
  block-size: 0;
}
</style>
