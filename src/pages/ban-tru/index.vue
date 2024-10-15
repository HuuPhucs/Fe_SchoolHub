<script setup lang="ts">
import { DanhSachTrangTinh } from '@/Constants/enums'
import { useSetupLocalI18n } from '@/composable/setupI18n'
import BanTruService from '@/services/banTru.service'
import PageConfigService from '@/services/pageConfig.service'
import { onBeforeMount, ref } from 'vue'
import ThucDonItem from './components/ThucDonItem.vue'

const {t, setupMessageForRegularPageConfig, setMessageI18n } = useSetupLocalI18n();

// Bien
const tableConfig = ref({
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 8,
    totalPages: 1,
    totalItems: 1,
  },
})

const currentTab = ref(0)
const loading = ref(false)
const workingItem = ref(null)
const staticText = ref({
  tongQuan: '',
  thucDon: ''
})

// Ham
onBeforeMount(async () => {
  await Promise.all([loadTongQuan(), loadData()])
})

const loadTongQuan = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.ThucDon)

  if (res) {
    setupMessageForRegularPageConfig(res)
    workingItem.value = res
  }
}

const loadData = async () => {
  loading.value = true

  const params = {
    pageNo: tableConfig.value.pagination.pageNo,
    pageSize: tableConfig.value.pagination.pageSize,
  }

  const res = await BanTruService.GetAll(params)
  if (res) {
    tableConfig.value.data = res.data
    tableConfig.value.pagination = {
      ...tableConfig.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    }
  }
  loading.value = false
}

const onPageNoChanged = () => {
  loadData()
}
</script>

<template>
  <PageContent
    style="background-color: #fff;"
    class="pb-15"
  >
    <ContentContainer>
      <VTabs
        v-model="currentTab"
        class="container_tabs v-tabs-pill"
        align-tabs="end"
        bg-color="light-blue"
      >
        <VTab class="container_tab">
          {{ $t('Bán trú.Tổng quan') }}
        </VTab>
        <VTab class="container_tab">
          {{ $t('Bán trú.Thực Đơn') }}
        </VTab>
      </VTabs>

      <VCard
        flat
        class="mt-5"
      >
        <VCardText>
          <VWindow v-model="currentTab">
            <VWindowItem
              v-if="workingItem"
              id="tongquan"
            >
              <h1 class="header">
                {{ t(workingItem.caiDatTongThe[0].tieuDe) }}
              </h1>
              <VRow>
                <VCol v-html="t(workingItem.caiDatTongThe[0].mota)" />
              </VRow>
            </VWindowItem>
            <VWindowItem id="thucdon">
              <h1 class="header">
                {{ $t('Bán trú.Thực Đơn') }}
              </h1>
              <VRow style="margin-top: 40px;">
                <VCol
                  v-for="item in tableConfig.data"
                  :key="item.id"
                  sm="12"
                  cols="12"
                  md="6
                  "
                >
                  <RouterLink :to="`/ban-tru/${item.id}`">
                    <ThucDonItem :data="item" />
                  </RouterLink>
                </VCol>
              </VRow>
              <VCardText class="pt-2">
                <VRow>
                  <VCol
                    style="padding: 12px 0;"
                    offset="8"
                    class="d-flex justify-end"
                  >
                    <VPagination
                      v-model="tableConfig.pagination.pageNo"
                      total-visible="5"
                      :length="tableConfig.pagination.totalPages"
                      @update:modelValue="onPageNoChanged"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
.container_tabs {
  margin-block: 0 !important;
  margin-inline: 0 20px !important;
  margin-inline-end: 20px;

  .container_tab {
    display: flex;
    align-content: center;
    align-items: center;
    border: 1px solid #89a4e9;
    border-radius: 4px;
    background: #fff;
    color: var(--primary-text-st, #191b25);
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-inline-end: 1px;
  }

  .container_tab:hover {
    color: var(--primary-text-st, #191b25) !important;
  }
}

.v-slide-group-item--active {
  border: 1px solid var(--primary-blue, #005baa) !important;
  border-radius: 4px !important;
  background: var(--primary-blue, #005baa) !important;
  color: var(--primary-ffffff, #fff) !important;
  font-size: 18px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: normal !important;
}

.header {
  color: var(--primary-blue, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
}

#thucdon{
  max-width: 800px; margin:auto
}
</style>
