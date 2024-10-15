<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ContentImageItem from './components/ContentImageItem.vue'
import { DanhSachTrangTinh } from '@/Constants/enums'
import type IMenuTab from '@/components/pageContent/models/menuTab.interface'
import type { CaiDatTongThe } from '@/models/tongquan.models'
import MenuService from '@/services/menu.service'
import PageConfigService from '@/services/pageConfig.service'

const tableConfig: Ref<CaiDatTongThe[]> = ref([])

const loadData = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.TongQuan)
  if (res)
    tableConfig.value = res.caiDatTongThe as CaiDatTongThe[]
}

onMounted(async () => {
  await loadData()
})

const firstBoxExpanded = ref(false)
const secondBoxExpanded = ref(false)
const thirdBoxExpanded = ref(false)

const expandedInformation = (event: any, id: string) => {
  event.target.innerText = event.target.innerText === 'Đóng' ? 'Xem thêm' : 'Đóng'
  if (id === 'box-1')
    firstBoxExpanded.value = !firstBoxExpanded.value
  else if (id === 'box-2')
    secondBoxExpanded.value = !secondBoxExpanded.value
  else if (id === 'box-3')
    thirdBoxExpanded.value = !thirdBoxExpanded.value
}

const menuTabs = ref<IMenuTab[]>([
  {
    title: 'Tổng quan',
    path: '/tong-quan',
    isActive: true,
  },
  {
    title: 'Phương thức dạy học',
    path: '/phuong-thuc-day-hoc',
  },
  {
    title: 'Cơ sở vật chất',
    path: '/co-so-vat-chat',
  },

  {
    title: 'Cơ cấu tổ chức',
    path: '/hoi-dong-truong',
  },
  {
    title: 'Góc truyền thống',
    path: '/goc-truyen-thong',
  },
])

const breadcrumsItems = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Góc truyền thống',
    disabled: true,
  },
])
</script>

<template>
  <PageContent
    v-if="tableConfig.length"
    :menu-tabs="menuTabs"
    :breadcrumbs-items="breadcrumsItems"
  >
    <ContentContainer >
      <div class="overview">
        <page-title :title="tableConfig[0]?.tieuDe"/>
        <div class="title-home container text-justify">
          <CkContent :data="tableConfig[0]?.mota ? tableConfig[0]?.mota : ''" />
        </div>
        <!-- Grid -->
        <div class="item-image container pb-4">
          <div class="item item-1">
            <img
              class="img"
              :src="tableConfig[0].caiDatChiTiet[0].linkAnh"
              alt=""
            >
          </div>
          <div class="item item-2">
            <div>
              <img
                class="img img-1"
                :src="tableConfig[0].caiDatChiTiet[1].linkAnh"
                alt=""
              >
            </div>
            <div>
              <img
                class="img img-2"
                :src="tableConfig[0].caiDatChiTiet[2].linkAnh"
                alt=""
              >
            </div>
          </div>
          <div class="item item-3">
            <div>
              <img
                class="img"
                :src="tableConfig[0].caiDatChiTiet[3].linkAnh"
                alt=""
              >
            </div>
            <div>
              <img
                class="img"
                :src="tableConfig[0].caiDatChiTiet[4].linkAnh"
                alt=""
              >
            </div>
          </div>
          <div class="item item-2">
            <img
              class="img"
              :src="tableConfig[0].caiDatChiTiet[5].linkAnh"
              alt=""
            >
          </div>
        </div>

        <div class="container py-4">
          <PageTitle>
            {{ tableConfig[1].tieuDe }}
          </PageTitle>

          <div
            v-for="(item, index) in tableConfig[1].caiDatChiTiet"
            :key="index"
          >
            <ContentImageItem
              :data="item"
              :image-position="index % 2 === 1 ? 'left' : 'right'"
              :background-color="index % 3 === 0 ? '#6DCEF5' : index % 3 === 1 ? '#F05A22' : '#005BAA'"
            />
          </div>
        </div>
      </div>
    </ContentContainer>
    <div class="d-flex pt-4">
      <div class="image-box">
        <div class="image-left">
          <h2>{{ tableConfig[2].tieuDe }}</h2>
          <div style="margin-top: 10px;">
            <VRow
              v-for="item in tableConfig[2].caiDatChiTiet"
              :key="item.id"
            >
              <VCol
                cols="1"
                style="text-align: end;"
              >
                <VIcon
                  class="icon-check"
                  icon="mdi-check"
                />
              </VCol>
              <VCol cols="11">
                <div
                  style="color: white;"
                  v-html="item.moTa"
                />
              </VCol>
            </VRow>
          </div>
        </div>
        <div class="image-right" />
      </div>
    </div>
    <ContentContainer v-if="tableConfig[3]?.tieuDe && tableConfig[3].mota">
      <page-title :title="tableConfig[3]?.tieuDe"/>
      <CkContent :data="tableConfig[3].mota"/>
    </ContentContainer>

    <!--
      <div class="d-flex pt-4">
      <VCol
      cols="7"
      style="background-color: rgba(1, 14, 45, 70%);"
      >
      <h2 class="text-white pb-4">
      {{ tableConfig[2].tieuDe }}
      </h2>
      <div
      v-for="(item, index) in tableConfig[2].caiDatChiTiet"
      :key="`ns2-${index}`"
      >
      <div class="d-flex">
      <VIcon
      icon="nsps-check"
      size="30"
      />
      <div class="pl4 text-white">
      <CkContent :data="item.moTa" />
      </div>
      </div>
      </div>
      </VCol>
      <VCol
      cols="5"
      class="p-0"
      >
      <img
      src="../../assets/images/imgTongQuan/TongQuan1.jpg"
      style="height: 100%;"
      >
      </VCol>
      </div>

      <ContentContainer class="py-10">
      <VRow>
      <VCol>
      <PageTitle title="Nếp Nguyễn Siêu" />
      <div class="text-center">
      <img src="../../assets/images/imgTongQuan/nep-nguyen-sieu.png">
      </div>
      </VCol>
      </VRow>
      </ContentContainer>
    -->
  </PageContent>
</template>

<style lang="scss" scoped>
.h-300 {
  block-size: 300px;
}

.p-0 {
  padding: 0;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(25, 27, 37, 30%);
  color: #ffff;
  gap: 10px;
  padding-block: 8px;
  padding-inline: 16px;
}

.pl4 {
  padding-inline-start: 12px;
}

img:not(.exclude-height) {
  inline-size: 100%;
  object-fit: cover;
  object-position: center;
}

.detail-box {
  padding-block: 32px 35px;
  padding-inline: 44px;
}

.detail-box-2 {
  padding-block: 22px 25px;
  padding-inline: 39px 41px;
}

.item-image {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-block-start: 60px;
}

.text-primary {
  margin-block: 50px;
  margin-inline: 0;
}

.img {
  inline-size: 100%;
  object-fit: cover;
  object-position: center;
}

.item {
  inline-size: 25%;
}

.item img {
  border-radius: 12px;
}

.image-box {
  display: flex;
  inline-size: 100%;
  margin-block-start: 60px;
}

.image-left {
  position: relative;
  z-index: 1;
  background-image: url("/imgs/TongQuan/E51DC00E-DDAD-48AB-A771-A62662B77A07.png");
  background-size: cover;
  inline-size: 64.5%;
  padding-block: 38px 37px;
  padding-inline: 120px 81px;
}

.image-left::before {
  position: absolute;
  z-index: -1;
  background-color: rgba(1, 14, 45, 70%);
  block-size: 100%;
  content: "";
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.image-left h2 {
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-transform: uppercase;
}

.image-left p {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}

.image-left p svg {
  margin-inline-end: 24px;
}

.image-left h2 p {
  align-items: center;
}

.image-right {
  background-image: url("/imgs/TongQuan/5F757A89-7F6E-42B7-80DE-F29674C39A20.png");
  background-size: cover;
  inline-size: 35.5%;
}

.icon-check {
  color: white;
}
</style>
