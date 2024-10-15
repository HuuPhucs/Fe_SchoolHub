<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  data?: any
}>()

const gocTruyenThong = ref<any>({})

onMounted(() => {
  gocTruyenThong.value = props.data
})
</script>

<template>
  <ContentContainer class="pt-12">
    <VRow justify="center">
      <VCol
        cols="12"
        sm="12"
        md="11"
      >
        <PageTitle
          class="traditional-dsc1"
          :title="gocTruyenThong.tieuDe"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        sm="12"
        md="12"
      >
        <div class="traditional-dsc2">
          <CkContent :data="gocTruyenThong.moTa" />
        </div>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        v-if="gocTruyenThong.caiDatChiTiet"
        cols="12"
        sm="12"
        md="7"
      >
        <a
          :href="gocTruyenThong.caiDatChiTiet[0].link"
          target="_blank"
        >
          <div class="traditional__img1">
            <img
              class="img1"
              :src="gocTruyenThong.caiDatChiTiet[0].linkAnh"
              alt=""
            >
            <div class="position" />
            <div class="title1">
              {{ gocTruyenThong.caiDatChiTiet[0].tieuDe }}
            </div>
            <div class="title2">
              <div class="title2__padding">
                <CkContent
                  class="title2__2"
                  :data="gocTruyenThong.caiDatChiTiet[0].moTa"
                />
              </div>
            </div>
          </div>
        </a>
      </VCol>
      <VCol
        cols="12"
        sm="12"
        md="5"
      >
        <VRow>
          <VCol
            v-for="(item, index) in gocTruyenThong.caiDatChiTiet.slice(1)"
            v-if="gocTruyenThong.caiDatChiTiet"
            :key="item.id"
            cols="12"
          >
            <a
              :href="item.link"
              target="_blank"
            >
              <div :class="`traditional__img${index + 2}`">
                <img
                  :class="`img${index + 2}`"
                  :src="item.linkAnh"
                  alt=""
                >
                <div class="position" />
                <div class="title1">
                  {{ item.tieuDe }}
                </div>
                <div class="title2">
                  <div class="title2__padding">
                    <div class="title2__2">
                      <CkContent
                        class="title2__2"
                        :data="item.moTa"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
    <VRow
      class="mt-12"
      justify="center"
    >
      <RouterLink to="/goc-truyen-thong">
        <VBtn text="TÌM HIỂU THÊM" />
      </RouterLink>
    </VRow>
  </ContentContainer>
</template>

<style scoped lang="scss">
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f8fb;
  gap: 10px;
}

.traditional-dsc1 {
  color: var(--primary-blue-005-baa, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
}

.traditional-dsc2 {
  color: #191b25;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
}

.traditional__img1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  block-size: 100%;
  inline-size: 100%;
}

// Hover img1
.traditional__img1:hover .title1 {
  opacity: 0;
}

.traditional__img1:hover .title2 {
  opacity: 1;
}

.traditional__img1:hover .position {
  opacity: 0.8;
}

//

.img1 {
  overflow: hidden;
  border-radius: 10px;
  block-size: 100%;
  max-inline-size: 100%;
  object-fit: cover;
  object-position: center;
}

.traditional__img2,
.traditional__img3 {
  position: relative;
  border-radius: 10px;
  block-size: 100%;
  inline-size: max-content;
  max-inline-size: 100%;
}

//Hover
.traditional__img2:hover .title1,
.traditional__img3:hover .title1 {
  opacity: 0;
}

.traditional__img2:hover .title2,
.traditional__img3:hover .title2 {
  opacity: 1;
}

.traditional__img2:hover .position,
.traditional__img3:hover .position {
  opacity: 0.8;
}

//
.img2,
.img3 {
  overflow: hidden;
  border-radius: 10px;
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
  object-position: center;
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
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.title1 {
  position: absolute;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  inset-block-end: 0;
  inset-inline: 0;
  line-height: normal;
  margin-block-end: 20px;
  opacity: 1;
  text-align: center;
  transition: opacity 0.2s ease-in-out;
}

.title2 {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  block-size: 90%;
  gap: 10px;
  inline-size: 90%;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.title2__padding {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  gap: 20px;
}

.title2__1 {
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
}

.title2__2 {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .traditional__img1,
  .traditional__img2,
  .traditional__img3,
  .img1,
  .img2,
  .img3 {
    block-size: 90vw !important;
  }
}
</style>
