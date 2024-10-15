<script setup lang="ts">
import type { CaiDatTongThe } from '@/models/tongquan.models'
import NhanVienService from '@/services/NhanVien.service'
import TuVanTamLyService from '@/services/tuVanTamLy.service'
import { ref } from 'vue'
import ChuyenVienCard from './components/ChuyenVienCard.vue'

const loading = ref(false)
const workingItem: Ref<CaiDatTongThe[]> = ref([])
const nhanVienInfo = ref([])

const breadcrumbsItems = ref([
  {
    title: 'Trang chủ',
    disabled: true,
    href: '/',
  },
  {
    title: 'Cuộc sống học đường',
    disabled: true,
  },
  {
    title: 'Tư vấn tâm lý',
    disabled: false,
  },
])

const loadData = async () => {
  loading.value = true

  const res = await TuVanTamLyService.GetAll()
  const NhanVienInfo = await NhanVienService.getChuyenVienTamLy()
  if (res) {
    workingItem.value = res.caiDatTongThe as CaiDatTongThe[]
    if (NhanVienInfo)
      nhanVienInfo.value = NhanVienInfo
  }
  loading.value = false
}

onBeforeMount(async () => {
  await loadData()
})
</script>

<template>
  <PageContent :breadcrumbs-items="breadcrumbsItems">
    <ContentContainer class="pt-3">
     
        <CkContent :data="workingItem[0]?.mota ? workingItem[0]?.mota : ''" />
        <div class="container py-4">
          <PageTitle>
            {{ workingItem[1]?.tieuDe }}
          </PageTitle>
        </div>
        <VRow>
          <VCol
            v-for="(item, index) in workingItem[1]?.caiDatChiTiet"
            cols="12"
            lg="4"
            md="6"
            sm="12"
          >
            <VCard
              v-if="index == 0"
              class="container card-part2 justify-center"
            >
              <img
                src="@images/mock-img/Group(4).svg"
                class="img-top"
              >
              <p class="title">
                {{ item.tieuDe }}
              </p>
              <div
                class="px-9 pt-2"
                style="text-align: justify;"
                v-html="item.moTa"
              />
              <p
                class="footer1 px-9"
                style="text-align: justify;"
              >
                Học sinh sẽ đăng ký tham vấn thông qua GVCN
              </p>
            </VCard>
            <VCard
              v-if="index > 0"
              class="container card-part2"
            >
              <img
                src="@images/mock-img/Group(4).svg"
                class="img-top"
              >
              <p class="title">
                {{ item.tieuDe }}
              </p>
              <div
                class="px-9 pt-2"
                style="text-align: justify;"
                v-html="item.moTa"
              />
              <div class="btn-footer">
                <VBtn
                  class="btn"
                  elevation="20"
                  size="x-large"
                  style="
                    background:
                      var(
                        --linear-1,
                        linear-gradient(90deg, #f05a22 0%, #feb907 100%)
                      );"                   
                  :href="item.link"
                  target="_blank"
                >
                  Đăng ký tham vấn
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>

        <div class="container py-5 mt-10" v-if="nhanVienInfo[0]?.id">
          <PageTitle >
            {{ workingItem[2]?.tieuDe }}
          </PageTitle>
        </div>
        <VRow class="d-flex justify-center">
          <VCol
            v-for="item in nhanVienInfo"
            cols="12"
            lg="4"
            md="6"
            sm="12"
          >
            <ChuyenVienCard
              color="xanh"
              :data="item"
              
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="7"
            lg="7"
            md="12"
            sm="12"
            class="footer"
          >
            <div class="header3 mb-2">
              {{ workingItem[3]?.tieuDe }}
            </div>
            <div
              v-for="item in workingItem[3]?.caiDatChiTiet"
              class="content2 mb-1"
            >
              <VRow>
                <VCol
                  cols="1"
                  class="pr-0"
                >
                  <VIcon
                    style="color: #005baa !important;"
                    icon="mdi-check"
                    size="large"
                  />
                </VCol>
                <VCol
                  cols="11"
                  class="px-0"
                >
                  <div>
                    <CkContent :data="item?.moTa ? item?.moTa : ''" />
                  </div>
                </VCol>
              </VRow>
            </div>
          </VCol>
          <VCol
            cols="5"
            lg="5"
            md="12"
            sm="12"
            style="margin-left: 0;"
          >
            <img
              src="@images/mock-img/Group1683.svg"
              style="margin-left: 0;"
            >
          </VCol>
        </VRow>
     
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss">
body {
  font-size: 16px;
}

.img-top {
  inline-size: 100%;
}

.content {
  color: #191b25;
  font-family: sans-serif;
  font-weight: 400;
  inline-size: 100%;
  line-height: normal;
  margin-block-start: 40px;
  word-wrap: break-word;
}

.title {
  color: #fff;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-block-start: -47px;
  text-align: center;
  text-transform: uppercase;
}

.footer1 {
  position: absolute;
  color: #6d768f;
  font-style: normal;
  font-weight: 400;
  inline-size: 100%;
  inset-block-end: 5px;
  line-height: normal;
  text-align: center;
}

.card-part2 {
  position: relative;
  background-color: #fcf0e3 !important;
  min-block-size: 600px;
}

.btn-footer {
  position: absolute;
  inset-block-end: 5px;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
}

.footer {
  padding: 0;
  margin-block-start: 170px;
  margin-inline-start: 0 !important;
}

.header3 {
  color: #0635aa;
  font-size: 28px !important;
  font-weight: bold !important;
  text-transform: uppercase;
}
</style>
