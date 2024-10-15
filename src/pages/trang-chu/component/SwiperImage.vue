<script setup lang="ts">
import { LoaiMedia } from '@/Constants/enums'
import TrangChuService from '@/services/TrangChu.service'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import PanoramaImage from '@/pages/trang-chu/component/PanoramaImage.vue'

// Props

const props = defineProps<{
  isTitle?: boolean
}>()

const thumbsSwiper = ref(null)
const isTitle = ref(true)
const showDiaDiem = ref(false)
const indexMedia = ref(0)
const items = ref<{ message: string }[]>()
const modules = ref([FreeMode, Navigation, Thumbs])

const dataSwiper = ref<{
  chiTietCoSoVatChat: {
    id: number
    loaiMedia: LoaiMedia
    linkAnh: string
    videoUrl: string
    url: string
  }[]
}[]>([])

const navigation = ref({
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
})

const setThumbsSwiper = (swiper: null) => {
  thumbsSwiper.value = swiper
}

onMounted(() => {
  isTitle.value = props.isTitle
  modules.value = [FreeMode, Navigation, Thumbs]
})

const onClick = (e: any, index: number) => {
  [...document.querySelectorAll('.select-item')]
    .map((e: any) => e.style.color = '#FFFFFF')

  e.target.style.color = '#FEB907'
  indexMedia.value = index
}

const getEmbeddedIframe = (youtubeLink: string) => {
  const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]+)/
  const match = youtubeLink.match(regex)
  if (match && match[1]) {
    const videoId = match[1]

    return `https://www.youtube.com/embed/${videoId}`
  }
  else {
    console.error('Invalid YouTube link')
  }
}

const getVideoId = (url: string) => {
  if (!url)
    return ''

  const regExp
      = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

  const match = url.match(regExp)

  return match && match[7].length == 11 ? match[7] : false
}

const youtubeParser = (url: string) => {
  const videoId = getVideoId(url)
  if (videoId)
    return `https://www.youtube.com/embed/${videoId}`
}

const getThumbnail = (url: string) => {
  const videoId = getVideoId(url)
  if (videoId)
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

const loadData = async () => {
  const res = await TrangChuService.GetCoSoVatChat()

  items.value = res.map(item => ({ message: item.tenDiaDiem }))

  dataSwiper.value = res
}

onMounted(async () => {
  try {
    await loadData()
  }
  catch {
    console.error('load data failed!')
  }
})
</script>

<template>
  <ContentContainer style="backgroud: white">
    <PageTitle
      v-if="isTitle"
      title="THAM QUAN TIỂU HỌC NGUYỄN SIÊU"
      class="pt-12"
    />
    <VRow>
      <VCol>
        <div class="sightseeing-slide">
          <div class="main-select">
            <div
              class="menuList"
              @click="showDiaDiem = !showDiaDiem"
            >
              <VIcon
                size="18"
                :icon="showDiaDiem ? 'nsps-minus-square' : 'nsps-plus-square'"
              />
              <span class="menuList__select">TIỂU HỌC NGUYỄN SIÊU </span>
            </div>
            <div
              v-if="showDiaDiem"
              class="ma-0 menuList__popover"
            >
              <ul>
                <li
                  v-for="(item, index) in items"
                  :key="index"
                  class="select-item"
                  @click="(e) => onClick(e, index)"
                >
                  {{ item.message }}
                </li>
              </ul>
            </div>
          </div>

          <Swiper
            class="mySwiper2"
            loading="lazy"
            :loop="true"
            :navigation="navigation"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :allow-touch-move="false"
          >
            <SwiperSlide
              v-for="item in dataSwiper[indexMedia]?.chiTietCoSoVatChat"
              :key="item.id"
            >
              <img
                v-if="item.loaiMedia === LoaiMedia.Anh"
                class="image-base"
                :src="item.linkAnh"
              >
              <PanoramaImage
                v-else-if="item.loaiMedia === LoaiMedia.Anh360"
                :image="item.linkAnh"
              />
              <!-- :image="item.linkAnh" -->
              <iframe
                v-else-if="item.loaiMedia === LoaiMedia.Video"
                loading="lazy"
                width="1200"
                height="620"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                :src="youtubeParser(item.linkAnh)"
              />
            </SwiperSlide>
          </Swiper>

          <Swiper
            loading="lazy"
            class="mySwiper"
            :loop="true"
            :space-between="60"
            :slides-per-view="6"
            :free-mode="true"
            :watch-slides-progress="true"
            :modules="modules"
            @swiper="setThumbsSwiper"
          >
            <SwiperSlide
              v-for="item in dataSwiper[indexMedia]?.chiTietCoSoVatChat"
              :key="item.id"
            >
              <img
                v-if="item.loaiMedia === LoaiMedia.Anh"
                :src="item.linkAnh"
              >
              <img
                v-if="item.loaiMedia === LoaiMedia.Anh360"
                :src="item.linkAnh"
                class="img-panorama"
              >

              <VIcon
                v-if="item.loaiMedia === LoaiMedia.Anh360"
                class="icon-image-360"
              >
                tabler-360-view
              </VIcon>
              <VIcon
                v-if="item.loaiMedia === LoaiMedia.Video"
                class="icon-video-play"
              >
                tabler-player-play-filled
              </VIcon>

              <img
                v-if="item.loaiMedia === LoaiMedia.Video"
                :src="getThumbnail(item.linkAnh)"
              >
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
.icon-image-360{
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
}
.icon-video-play{
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%,-50%);
}

@media only screen and (max-width: 600px) {
  .mySwiper .swiper-slide {
    width: 25% !important;
    margin-right: 20px !important;
  }
}

.swiper-button-prev,
.swiper-button-next {
  border-radius: 50% !important;
  width: 28px !important;
  height: 28px !important;
  background: linear-gradient(90deg, #f05a22 0%, #feb907 100%) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -15px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 14px;
  color: white;
}

.sightseeing-slide {
  height: 620px;
  position: relative;
}

.main-select {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  width: 230px;
  height: 363px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 6px !important;
}

.menuList {
  background-color: #0635aa;
  display: flex;
  height: 44px;
  padding: 10px 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  cursor: pointer;
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
  width: 230px;
  height: 44px;
  padding: 10px 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1px solid var(--gray-6-d-768-f, #6d768f);
  color: var(--primary-ffffff, #fff);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

.menuList__popover {
  background-color: rgba(25, 27, 37, 0.8);
  transition-delay: 2s !important;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 20px 60px 0 ;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  background: #191b25;
}

.mySwiper img {
  border-radius: 6px;
  border: 4px solid var(--primary-orange, #f05a22);

}

.mySwiper .swiper-slide {
  width: 25%;
  height: 80%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiperIframe {
  width: 100%;
  height: 100%;
}
</style>
