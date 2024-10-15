<template>

  <div class="aboutus">

    <content-container>
      <VRow>
        <VCol class="aboutus-title pt-6">
          <page-title :title="props.data.tieuDe"/>
          <VRow justify="center">
            <VCol cols="12" md="9">
              <CkContent class="text-center" :data="props.data.mota"/>
            </VCol>
          </VRow>
        </VCol>
      </VRow>


      <div class="backgroudTrangChu">
        <v-row align="end">
          <v-col
            cols="12"
            class="d-md-none"
            v-for="(item, index) in props.data.caiDatChiTiet"
            :key="index"
          >
            <div :class="classNameForAboutUs[index] + '-block rounded'">
              <div :class="classNameForAboutUs[index] + '-block-title-img'">
                <div :class="classNameForAboutUs[index] + '-block-img'">
                  <img
                    :class="classNameForAboutUs[index] + '-block__1'"
                    :src="item.linkAnh"
                    alt=""
                  />
                </div>
                <div :class="classNameForAboutUs[index] + '-block-title'">
                  <a href="https://www.google.com/" target="_blank">
                    <p class="cardBlock__title">{{ item.tieuDe }}</p>
                    <ck-content class="text-center" :data="item.moTa"/>
                  </a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="d-none d-md-flex">
          <v-col cols="6">
            <div class="first-block"
                 v-animate-onscroll.repeat="{ in: 'animate__animated animate__slow animate__rotateInDownRight', out: 'animate__animated animate__rotateOutDownRight' }"
                 data-animate-onscroll-offset="200"
            >
              <div class="first-block-title-img">
                <div class="first-block-img">
                  <img class="first-block__1" :src="props.data.caiDatChiTiet[0]?.linkAnh" alt=""/>
                </div>
                <div class="first-block-title">
                  <component
                    :is="props.data.caiDatChiTiet[0].link ? 'a' : 'div'"
                    class="text-white text-shadow"
                    :href="props.data.caiDatChiTiet[0].link"
                  >
                    <CkContent :data="props.data.caiDatChiTiet[0].moTa"/>
                  </component>
                </div>
              </div>
              <svg
                width="10"
                height="20"
                viewBox="0 0 359 415"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="maskRect1" style="box-shadow: 5px 10px #888888">
                    <path
                      d="M237.468 20.3252C243.08 20.3252 247.63 15.7753 247.63 10.1626C247.63 4.54996 243.08 0 237.468 0C231.855 0 227.305 4.54996 227.305 10.1626C227.305 15.7753 231.855 20.3252 237.468 20.3252ZM199.496 77.6712C199.496 86.6467 192.22 93.9227 183.244 93.9227C174.269 93.9227 166.993 86.6467 166.993 77.6712C166.993 68.6957 174.269 61.4197 183.244 61.4197C192.22 61.4197 199.496 68.6957 199.496 77.6712ZM309.478 143.365C309.827 141.012 310.008 138.604 310.008 136.154C310.008 109.228 288.179 87.3997 261.253 87.3997C237.885 87.3997 218.357 103.84 213.604 125.785H108.138C48.4957 125.785 0.169418 174.179 0.14209 233.879C0.14209 293.605 48.4958 342 108.111 342C108.111 342 257.573 343.724 265.855 344.956C331.457 354.755 358.763 414.674 358.763 414.674C358.763 414.674 357.916 292.51 357.916 233.194C357.916 195.627 338.652 162.562 309.478 143.365Z"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="second-block"
                 v-animate-onscroll.repeat="{ in: 'animate__animated animate__slow animate__rotateInDownLeft', out: 'animate__animated animate__rotateOutDownLeft' }"
                 data-animate-onscroll-offset="200"
            >
              <div class="second-block-title-img">
                <div class="second-block-img">
                  <img class="second-block__1" :src="props.data.caiDatChiTiet[1]?.linkAnh" alt=""/>
                </div>
                <div class="second-block-title">
                  <component
                    :is="props.data.caiDatChiTiet[1].link ? 'a' : 'div'"
                    class="text-white text-shadow"
                    :href="props.data.caiDatChiTiet[1].link"
                  >
                    <CkContent :data="props.data.caiDatChiTiet[1].moTa"/>
                  </component>
                </div>
              </div>
            </div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 415 335"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="maskRect2" style="box-shadow: 5px 10px #888888">
                  <path
                    d="M289.942 0.92334H126.17C126.019 0.92334 125.867 0.92334 125.737 0.92334C125.607 0.92334 125.477 0.92334 125.347 0.92334C56.9389 0.92334 1.48879 56.3735 1.48879 124.782C1.48879 193.19 0.513672 334.036 0.513672 334.036C0.513672 334.036 32.0416 264.935 107.795 253.645C117.373 252.215 289.942 250.243 289.942 250.243C358.805 250.243 414.602 194.425 414.602 125.583C414.602 56.7419 358.784 0.92334 289.942 0.92334Z"
                    fill="#298EF5"
                  />
                </clipPath>
              </defs>
            </svg>
          </v-col>
        </v-row>
        <v-row class="d-none d-md-flex">
          <v-col cols="6">
            <div class="third-block"
                 v-animate-onscroll.repeat="{ in: 'animate__animated animate__slow animate__rotateInDownLeft', out: 'animate__animated animate__rotateOutDownLeft' }"
            >
              <div class="third-block-title-img">
                <div class="third-block-img">
                  <img class="third-block__1" :src="props.data.caiDatChiTiet[2]?.linkAnh" alt=""/>
                </div>
                <div class="third-block-title">
                  <component
                    :is="props.data.caiDatChiTiet[2].link ? 'a' : 'div'"
                    class="text-white text-shadow"
                    :href="props.data.caiDatChiTiet[2].link"
                  >
                    <CkContent :data="props.data.caiDatChiTiet[2].moTa"/>
                  </component>
                </div>
              </div>
            </div>
            <svg
              width="495"
              height="1"
              viewBox="0 0 495 395"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="maskRect3" style="box-shadow: 5px 10px #888888">
                  <path
                    d="M344.81 0H149.042C66.7513 0 0.0216725 66.0276 0 147.452C0 225.445 61.1712 289.28 138.638 294.553C137.525 298.233 136.926 302.137 136.926 306.181C136.926 328.321 154.873 346.268 177.013 346.268C199.152 346.268 217.1 328.321 217.1 306.181C217.1 302.569 216.622 299.068 215.726 295.738C277.089 296.566 359.644 297.861 366.764 298.915C457.311 312.275 495 394 495 394C495 394 493.83 227.398 493.83 146.487C493.83 65.5773 427.555 0 345.785 0C345.709 0 345.633 0.00537109 345.557 0.0107422C345.481 0.0160828 345.406 0.0214233 345.33 0.0214233C345.156 0.0214233 344.983 0 344.81 0ZM95.4944 360.959C103.252 361.024 109.601 354.762 109.666 346.982C109.709 339.203 103.447 332.854 95.6894 332.811C87.932 332.746 81.5831 339.008 81.5181 346.787C81.4531 354.545 87.7153 360.894 95.4944 360.959ZM151.463 386.442C151.506 390.776 148.018 394.329 143.684 394.373C139.35 394.416 135.797 390.927 135.753 386.594C135.71 382.26 139.199 378.706 143.532 378.663C147.866 378.62 151.42 382.087 151.463 386.442Z"
                  />
                </clipPath>
              </defs>
            </svg>
          </v-col>
          <v-col cols="6">
            <div class="forth-block"
                 v-animate-onscroll.repeat="{ in: 'animate__animated animate__slow animate__rotateInDownRight', out: 'animate__animated animate__rotateOutDownRight' }"
            >
              <div class="forth-block-title-img">
                <div class="forth-block-img">
                  <img class="forth-block__1" :src="props.data.caiDatChiTiet[3]?.linkAnh" alt=""/>
                </div>
                <div class="forth-block-title">
                  <component
                    :is="props.data.caiDatChiTiet[3].link ? 'a' : 'div'"
                    class="text-white text-shadow"
                    :href="props.data.caiDatChiTiet[3].link"
                  >
                    <CkContent :data="props.data.caiDatChiTiet[3].moTa"/>
                  </component>
                </div>
              </div>
            </div>
            <svg
              width="518"
              height="1"
              viewBox="0 0 518 532"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="maskRect4" style="box-shadow: 5px 10px #888888">
                  <path
                    d="M473.58 22.4678C479.636 22.4678 484.544 17.5589 484.544 11.5034C484.544 5.44797 479.636 0.539062 473.58 0.539062C467.525 0.539062 462.616 5.44797 462.616 11.5034C462.616 17.5589 467.525 22.4678 473.58 22.4678ZM518 76.5097C518 86.6819 509.754 94.9281 499.582 94.9281C489.41 94.9281 481.164 86.6819 481.164 76.5097C481.164 66.3375 489.41 58.0913 499.582 58.0913C509.754 58.0913 518 66.3375 518 76.5097ZM442.797 159.605C456.224 150.923 465.108 135.819 465.108 118.633C465.108 91.6988 443.288 69.8784 416.354 69.8784C389.419 69.8784 367.599 91.6988 367.599 118.633C367.599 120.365 367.689 122.076 367.865 123.761C360.494 122.601 352.945 122 345.259 122H149.887C149.801 122 149.714 122.006 149.627 122.011C149.541 122.017 149.454 122.022 149.368 122.022C149.292 122.022 149.217 122.017 149.141 122.011C149.065 122.006 148.989 122 148.914 122C67.3086 122 1.16797 190.24 1.16797 274.436C1.16797 358.632 0 532 0 532C0 532 37.6124 446.956 127.977 433.054C139.397 431.291 345.281 428.881 345.281 428.881C427.427 428.881 494 360.194 494 275.44C493.988 229.204 474.159 187.738 442.797 159.605Z"
                    fill="#298EF5"
                  />
                </clipPath>
              </defs>
            </svg>
          </v-col>
        </v-row>
      </div>
    </content-container>
  </div>

</template>

<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
const classNameForAboutUs = ["first", "second", "third", "forth"];


</script>

<style lang="scss" scoped>
@media only screen and (max-width: 960px) {
  .aboutus {
    margin-bottom: 20px;
  }

  .first-block,
  .second-block,
  .third-block,
  .forth-block {
    width: 100% !important;
    height: 300px !important;
    top: 0 !important;
  }

  .first-block-title,
  .forth-block-title,
  .third-block-title,
  .forth-block-title {
    width: 80% !important;
  }

  .first-block-title {
    top: 35% !important;
    right: 10% !important;
  }

  .second-block-title {
    top: 20% !important;
    right: 12% !important;
  }

  .third-block-title {
    top: 30% !important;
    right: 10% !important;
  }

  .forth-block-title {
    right: 10% !important;
    top: 33% !important;
  }

  .first-block,
  .second-block,
  .third-block,
  .forth-block {
    &__1 {
      width: 100% !important;
    }
  }
}

.cardBlock {
  &__title {
    font-size: 30px;
  }
}

.backgroudTrangChu {
  position: relative;

  .backgroudTrangChu__img {
    opacity: 0.1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: inherit !important;
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      overflow: hidden;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}

.aboutus {
  background-repeat: repeat;
  background-size: auto;
}

.aboutus-title {
  border-radius: 10px;
  //margin: -45px auto 0 auto;
  background-color: #fff;
}

.aboutus-dsc {
  color: #191b25;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  /* 150% */
}

.first-block {
  &:hover {
    font-size: 1.1em;
    transition: font-size 1s ease;
  }

  &__1 {
    width: 359px;
    height: inherit;
    object-fit: cover;
    object-position: center;
  }

  -moz-transition: background 0.5s ease-in-out;
  -webkit-transition: background 0.5s ease-in-out;
  -o-transition: background 0.5s ease-in-out;
  transition: background 0.5s ease-in-out;
  -webkit-clip-path: url(#maskRect1);
  background: #F7861D;
  width: 359px;
  height: 415px;
  float: right;
  display: inline-block;
  opacity: 0;

  a {
    color: white;
    text-decoration: none;
    text-align: center;
  }
}

.first-block-title-img {
  position: relative;
  height: 100%;
}

.first-block-title {
  position: absolute;
  top: 58%;
  width: 75%;
  text-align: center;
  transform: translate(-50%, -50%);
  left: 51%;
}

.first-block-img {
  opacity: 0;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.first-block__title1 {
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
}

.first-block:hover .first-block-img {
  opacity: 1;
  animation-name: hideBackgroundIMG;
  animation-duration: 0.5s;

  @keyframes hideBackgroundIMG {
    0% {
      opacity: 0%;
    }

    25% {
      opacity: 25%;
    }

    50% {
      opacity: 50%;
    }

    75% {
      opacity: 75%;
    }

    100% {
      opacity: 100%;
    }
  }
}

.second-block {
  &:hover {
    font-size: 1.1em;
    transition: font-size 1s ease;
  }

  &__1 {
    width: 415px;
    height: 335px;
    object-fit: cover;
    object-position: center;
  }

  -webkit-clip-path: url(#maskRect2);
  background-color: #6DCEF5;
  width: 415px;
  height: 335px;
  float: left;
  position: relative;
  top: 100px;
  opacity: 0;

  a {
    color: white;
    text-decoration: none;
  }
}

.second-block-title-img {
  position: relative;
  height: 100%;
}

.second-block-title {
  position: absolute;
  top: 44%;
  width: 75%;
  text-align: center;
  transform: translate(-50%, -50%);
  left: 51%;
}

.second-block-img {
  opacity: 0;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.second-block:hover .second-block-img {
  opacity: 1;
  animation-name: hideBackgroundIMG;
  animation-duration: 1s;

  @keyframes hideBackgroundIMG {
    0% {
      opacity: 50%;
    }

    25% {
      opacity: 25%;
    }

    50% {
      opacity: 50%;
    }

    75% {
      opacity: 75%;
    }

    100% {
      opacity: 100%;
    }
  }
}

.third-block {
  &__1 {
    width: inherit;
    height: 395px;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    font-size: 1.1em;
    transition: font-size 1s ease;
  }

  &__wrapper {
    width: 80%;
    margin: 80px auto 0 auto;
    text-align: center;
    color: white;
  }

  -webkit-clip-path: url(#maskRect3);
  background-color: #005BAA;
  width: 495px;
  height: 395px;
  float: right;
  position: relative;
  top: -60px;

  a {
    color: white;
    text-decoration: none;
  }
}

.third-block-title-img {
  position: relative;
  height: 100%;
}

.third-block-title {
  position: absolute;
  text-align: center;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
}

.third-block-img {
  opacity: 0;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.third-block:hover .third-block-img {
  opacity: 1;
  animation-name: hideBackgroundIMG;
  animation-duration: 1s;

  @keyframes hideBackgroundIMG {
    0% {
      opacity: 50%;
    }

    25% {
      opacity: 25%;
    }

    50% {
      opacity: 50%;
    }

    75% {
      opacity: 75%;
    }

    100% {
      opacity: 100%;
    }
  }
}

.forth-block {
  &:hover {
    font-size: 1.1em;
    transition: font-size 1s ease;
  }

  &__1 {
    width: 518px;
    height: 532px;
    object-fit: cover;
    object-position: center;
  }

  -webkit-clip-path: url(#maskRect4);
  background-color: #F05A22;
  width: 518px;
  height: 532px;
  float: left;
  position: relative;
  top: -180px;

  a {
    color: white;
    text-decoration: none;
  }
}

.forth-block-title-img {
  position: relative;
  height: 100%;
}

.forth-block-title {
  position: absolute;
  text-align: center;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
}

.forth-block-img {
  opacity: 0;
  height: inherit;
}

.forth-block:hover .forth-block-img {
  opacity: 1;
  animation-name: hideBackgroundIMG;
  animation-duration: 1s;

  @keyframes hideBackgroundIMG {
    0% {
      opacity: 50%;
    }

    25% {
      opacity: 25%;
    }

    50% {
      opacity: 50%;
    }

    75% {
      opacity: 75%;
    }

    100% {
      opacity: 100%;
    }
  }
}

.seemore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  padding-bottom: 48px;
}

.seemore-btn {
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: var(--primary-blue, #005baa);
}

.seemore-btn-title {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  /* 150% */
  text-transform: uppercase;
}

.first-block:hover {
  .text-shadow {
    text-shadow: 1px 1px 40px black, 0 0 8px black, 0 0 5px black;
  }
}

.second-block:hover {
  .text-shadow {
    text-shadow: 1px 1px 40px black, 0 0 8px black, 0 0 5px black;
  }
}

.third-block:hover {
  .text-shadow {
    text-shadow: 1px 1px 40px black, 0 0 8px black, 0 0 5px black;
  }
}

.forth-block:hover {
  .text-shadow {
    text-shadow: 1px 1px 40px black, 0 0 8px black, 0 0 5px black;
  }
}
</style>
