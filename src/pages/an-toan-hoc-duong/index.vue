<script lang="ts" setup>
import { DanhSachTrangTinh } from '@/Constants/enums'
import { useSetupLocalI18n } from '@/composable/setupI18n'
import type { CaiDatTongThe } from '@/models/tongquan.models'
import PageConfigService from '@/services/pageConfig.service'
import type { Ref } from 'vue'
import { ref } from 'vue'

const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const currentTab = ref(0)
const listAnToanThongTin: Ref<CaiDatTongThe[]> = ref([])

onBeforeMount(async () => {
  // call api mock
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.AnToanHocDuong)
  if (res) {
    setupMessageForRegularPageConfig(res)
    listAnToanThongTin.value = res.caiDatTongThe
  }
})
</script>

<template>
  <PageContent>
    <ContentContainer>
      <VTabs
        v-model="currentTab"
        class="container_tabs v-tabs-pill"
        align-tabs="start"
        bg-color="light-blue"
      >
        <VTab
          v-for="item in listAnToanThongTin"
          class="container_tab"
        >
          {{ t(item.tieuDe) }}
        </VTab>
      </VTabs>

      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem v-for="item in listAnToanThongTin">
            <PageTitle
              :title="t(item.tieuDe)"
              class="pt-4"
            />
            <VCardText>
              <CkContent :data="t(item.mota)" />
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </ContentContainer>
  </PageContent>
</template>
