<template>
  <header class="masthead" ref="el">
    <swiper
      :modules="modules"
      :autoplay="autoplayConfig"
      :navigation="navigationConfig"
      :keyboard="keyboardConfig"
      :centeredSlides="true"
      :loop="true"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
      @slideChangeTransitionEnd="onSlideChangeTransitionEnd"
      @click="togglePause"
      @autoplayTimeLeft="onAutoplayTimeLeft"
      @keyPress="onKeyPress"
      class="nsps-slideshow"
    >
      <swiper-slide v-for="item in props.data" v-slot="{ isActive }">
        <template v-if="item.type === FileType.Video">
          <video class="fullpage" 
                 playsinline="playsinline" 
                 muted="muted"
                 @ended="onVideoEnded"
          >
            <source :src="item.src"/>
          </video>
        </template>
        <template v-if="item.type === FileType.Image">
          <img :src="item.src" class="fullpage" alt=""/>
        </template>
      </swiper-slide>


      <template #container-end>
        <div class="autoplay-progress" @click="togglePause">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>

        <button class="explore" @click="explore">
          Khám phá <br/>
          <v-icon class="explore__icon-down animate__animated animate__infinite"
                  size="30"
                  icon="mdi-expand-more"/>
        </button>

        <div class="social-networks">
          <a href="https://facebook.com"
             target="_blank"
             class="social-networks__item facebook"
          >
            <VIcon icon="fa-facebook"/>
            <div class="social-networks__item-name">Facebook</div>
          </a>
        </div>

      </template>

    </swiper>
  </header>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, Navigation, Keyboard} from 'swiper/modules';
import {AutoplayOptions, KeyboardOptions, NavigationOptions, Swiper as SwiperClass} from "swiper/types";
import { FileType } from '@/Constants/enums'
import {watch} from 'vue'
import 'swiper/css';
import "swiper/css/navigation"

const props = defineProps<{
  next?: any,
  data: any[]
}>();


// Explore button
const el = ref(null);
const explore = (event) => {
  // Scroll down
  props.next?.$el.scrollIntoView({
    behavior: 'smooth'
  });
}
// .END Explore button


// Swiper config
const modules = ref([
  Autoplay,
  Navigation,
  Keyboard,
])
const swiperInstance = ref<SwiperClass>(null);
const autoplayConfig = ref<AutoplayOptions>({
  delay: 10000,
  disableOnInteraction: false,
})
const navigationConfig = ref<NavigationOptions>({
  enabled: true,
})
const keyboardConfig = ref<KeyboardOptions>({
  enabled: true,
  pageUpDown: true,
  onlyInViewport: false
});


import img1 from "@images/imgTrangChu/imgTrangChu.png";
import img2 from "@images/imgTrangChu/truyenThong1.jpg";
import img3 from "@images/imgTrangChu/truyenThong2.jpg";
import img4 from "@images/imgTrangChu/truyenThong3.jpg";
import video from "@/assets/mp4/bg.mp4";

const slideData = ref([])

const progressCircle = ref(null);
const progressContent = ref(null);

// watch(props.data, (value) => {
//   if (value && value.length > 0) {
//     slideData.value = value.map(item => {
//       return {
//         src: item.file.filePath,
//         type: item.file.fileType
//       }
//     })
//   }
// })

const onSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper: SwiperClass) => {
  const el = swiper.slides[swiper.activeIndex] as HTMLElement;
  const videoEl = el.getElementsByTagName('video')[0];
  if(videoEl){
    el.setAttribute('data-swiper-autoplay', videoEl.duration * 1000)
  }
    
}
const onSlideChangeTransitionEnd = (swiper: SwiperClass) => {
  const el = swiper.slides[swiper.activeIndex] as HTMLElement;
  const videoEl = el.getElementsByTagName('video')[0];
  if(videoEl){
    videoEl.currentTime = 0;
    videoEl.play();
    
  }
};

const onVideoEnded = (e) => {
  swiperInstance.value.slideNext();
}

const onAutoplayTimeLeft = (s, time, progress) => {
  progressCircle?.value?.style?.setProperty('--progress', 1 - progress);

  if (progressContent?.value) {
    progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
  }
};

const togglePause = () => {
  if (swiperInstance.value.autoplay.paused) {
    swiperInstance.value.autoplay.resume();
  } else {
    swiperInstance.value.autoplay.pause();
  }
}

const onKeyPress = (swiper, keyCode) => {
  if (keyCode === 32) {
    if (swiper.autoplay.paused) {
      swiper.autoplay.resume();
    } else {
      swiper.autoplay.pause();
    }
  }
}

const preventSpacePress = (e: any) => {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
}
window.addEventListener("keypress", preventSpacePress, true);

const onScroll= (e) => {
  var els = document.getElementsByClassName("social-networks");
  els.forEach((x:HTMLElement) => x.classList.add())
}
window.addEventListener("scroll", preventSpacePress, true);

// .END Slide autoplay-progress

</script>

<style lang="scss" scoped>

@mixin nsps-overlay-slide-show {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

$border-radius: 10px;

header.masthead {
  background: linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url("../assets/img/bg-masthead.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
  position: relative;


  .fullpage {
    object-fit: cover;
    object-position: center;
    height: inherit;
    width: 100%;
  }
}

@keyframes nspsBounce {
  from,
  20%,
  53%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -10px, 0) scaleY(1.1);
    transform: translate3d(0, -10px, 0) scaleY(1.1);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -8px, 0) scaleY(1.05);
    transform: translate3d(0, -8px, 0) scaleY(1.05);
  }

  80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
}

.explore {
  @include nsps-overlay-slide-show;

  border: 0;
  margin: 0;
  cursor: pointer;
  position: absolute;
  padding: 20px 20px 0;
  border-radius: $border-radius;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  overflow: hidden;
  z-index: 2400;
  text-transform: uppercase;
  font-weight: 700;
  display: none;

  .explore__icon-down {
    animation-duration: 2s;
    speak: none;
    -webkit-animation-name: nspsBounce;
    animation-name: nspsBounce;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
  }
}

.nsps-slideshow {
  height: 100%;
}

.autoplay-progress {
  @include nsps-overlay-slide-show;

  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 9999999999;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  border-radius: $border-radius;

  svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 9999999999;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: currentColor;
    fill: none;
    stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  @include nsps-overlay-slide-show;
  --swiper-navigation-sides-offset: 0;
  padding: 20px;
  height: 60px;
}

:deep(.swiper-button-prev) {
  border-radius: 0 $border-radius $border-radius 0;
}

:deep(.swiper-button-next) {
  border-radius: $border-radius 0 0 $border-radius;
}


.social-networks {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 10;
  display: none;

  .social-networks__item + .social-networks__item {
    margin-top: 1px;
  }

  .social-networks__item {
    @include nsps-overlay-slide-show;
    color: #fff;
    padding: 12px;
    display: block;
    right: 0;
    width: fit-content;
    margin-left: auto;
    margin-right: 0;
    transition: background-color 0.3s;

    .social-networks__item-name {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      padding-left: 4px;
    }


    &:hover {

      &.facebook {
        background-color: #4267B2;
      }

      &.youtube {
        background-color: #FF0000;
      }


    }
  }
}

.facebook {
  background-color: #4267B2;
}

@media (min-width: 992px) {
  header.masthead {
    height: calc(100vh - 64px);
    //overflow: hidden;
    //min-height: 40rem;
    //padding-top: 4.5rem;
    //padding-bottom: 0;
  }

  .explore,
  .social-networks {
    display: block;
  }
}

</style>
