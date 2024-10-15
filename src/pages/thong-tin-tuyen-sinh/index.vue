<script setup lang="ts">
import type IMenuTab from '@/components/pageContent/models/menuTab.interface'
import PageAPI from '@/services/pageConfig.service'

import { DanhSachTrangTinh } from '@/Constants/enums'

const workingItem = ref()
const loading = ref(false)

onBeforeMount(async () => {
  await loadData()
})

const textBtn = ref(['ĐĂNG KÝ TS ĐẦU CẤP', 'ĐĂNG KÝ BỔ SUNG'])

const breadcrumbsItems = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Thông tin tuyển sinh',
    disabled: false,
  },
  {
    title: 'Thông tin chung',
    disabled: true,
  },
])

const menuTabs = ref<IMenuTab[]>([
  {
    title: 'Thông tin tuyển sinh',
    path: '/thong-tin-tuyen-sinh',
    isActive: true,
  },
  {
    title: 'Học phí',
    path: '/hoc-phi',
  },
  {
    title: 'Quy trình tuyển sinh',
    path: '/quy-trinh-tuyen-sinh',
  },
  {
    title: 'Đăng ký tuyển sinh',
    path: '/dang-ky-tuyen-sinh',
  },
])

const loadData = async () => {
  loading.value = true

  const res = await PageAPI.getPageConfig(DanhSachTrangTinh.ThongTinTuyenSinh)
  if (res) {
    workingItem.value = res
  }
  loading.value = false
}

const onSaveClick = () => {
  loadData()
}
</script>

<template>
  <PageContent
    :menu-tabs="menuTabs"
    :breadcrumbs-items="breadcrumbsItems"
  >
    <ContentContainer>
      <div>
        <VContainer>
          <div
            v-for="(item, index) in workingItem.caiDatTongThe"
            v-if="workingItem"
            :key="index"
            :class="`item-${index}`"
            class="itemMain"
          >
            <h2 class="tieuDeMain">
              {{ item.tieuDe }}
            </h2>
            <CkContent
              :data="item.mota"
              class="custom-ck-content"
            />
            <template v-if="index > 0">
              <div
                v-for="(item2, index2) in item.caiDatChiTiet"
                :key="index2"
                :class="`item2-${index}`"
              >
                <p
                  class="moTa"
                  :class="`moTa-${index}`"
                  v-html="item2.moTa"
                />
              </div>
            </template>

            <VRow>
              <VCol
                v-for="(item2, index2) in item.caiDatChiTiet"
                :key="index2"
                cols="12"
                lg="6"
                md="6"
              >
                <VCard class="itemBox d-flex flex-column ">
                  <VCardTitle
                    class="boxTieuDe"
                    :class="`tieuDe-${index}`"
                  >
                    {{ item2.tieuDe }}
                  </VCardTitle>
                  <VCardText
                    class="px-10 pt-5 pb-10"
                    :class="`moTaBox-${index2}`"
                    v-html="item2.moTa"
                  />
                  <div class="px-4" v-if="item2.link">
                    <VBtn class="button " :href="item2.link" >
                      {{ textBtn[index2] }}
                    </VBtn>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </div>
        </VContainer>
      </div>
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
.itemMain {
  margin-block-end: 40px;
}

.itemBox {
  border: 1px solid #ff9399;
  border-radius: 10px;
  background: #fbefec;
  block-size: 100%;
}

.tieuDeMain {
  color: #005baa;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-block-end: 10px;
  text-transform: uppercase;
}

.boxTieuDe {
  background-color: #f05a22;
  color: #fff;
  text-transform: uppercase;
}

.tieuDe-1 {
  padding: 10px;
  background: #f05a22;
}

.moTa {
  padding: 20px;
  text-align: justify;
}

.button {
  border-radius: 6px;
  background: linear-gradient(90deg, #f05a22 0%, #feb907 100%);
  inset-block-end: 20px;
  inset-inline-start: 20px;
}

.custom-ck-content {
  :deep(ul) {
    padding-inline-start: 2em !important;
  }
}
</style>
