<script setup lang="ts">
import {onBeforeMount, ref,} from 'vue';
import NoiQuy from './noiQuy.vue';
import {useSetupLocalI18n} from "@/composable/setupI18n";
import PageConfigService from "@/services/pageConfig.service";
import {DanhSachTrangTinh} from "@/Constants/enums";
import {ICaiDatChiTiet, ICaiDatTongThe} from "@/models/responseModels/pageSetup.model";


const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const staticText = ref({
  noiQuyHocSinh: '',
  noiQuyOTo: '',
  noiQuyCanhBao: '',
})

onBeforeMount(async () => {
  data.value = await PageConfigService.getPageConfig(DanhSachTrangTinh.NoiQuy)
  setupMessageForRegularPageConfig(data.value)
  noiQuyHocSinhData.value = data.value.caiDatTongThe[0]
  noiQuyOtoData.value = data.value.caiDatTongThe[1];
  noiQuyCanhBaoData.value = data.value.caiDatTongThe[2];
})

const data = ref<any>()
const isHocSinh = ref(false);
const noiQuyHocSinhData = ref({} as ICaiDatTongThe)
const noiQuyOtoData = ref({} as ICaiDatChiTiet)
const noiQuyCanhBaoData = ref({})
const currentTab = ref(0)

const breadcrumbsItem = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Nội quy',
    disabled: true,
  },
])
</script>

<template>
  <PageContent :breadcrumbs-items="breadcrumbsItem">
    <ContentContainer>
      <div class="text-justify">
        <div class="d-flex justify-end">
          <VTabs
            v-model="currentTab"
            fixed-tabs
            class="v-tabs-pill "
          >
            <VTab value="noiQuyHocSinh" class="mr-1">
              {{ t(noiQuyHocSinhData.tieuDe || '') }}
            </VTab>
            <VTab value="noiQuyOTo">
              {{ t(noiQuyOtoData.tieuDe || '') }}
            </VTab>
          </VTabs>
        </div>
        <VWindow
          v-if="noiQuyHocSinhData.id"
          v-model="currentTab"
        >
          <VWindowItem value="noiQuyHocSinh">
            <PageTitle
              :title="t(noiQuyHocSinhData.tieuDe)"
              class="pt-4"
            />
            <NoiQuy :noi-quy-data="noiQuyHocSinhData" :note="noiQuyCanhBaoData" :check="isHocSinh"/>
          </VWindowItem>
          <VWindowItem
            v-if="noiQuyOtoData.id"
            value="noiQuyOTo"
          >
            <PageTitle
              :title="t(noiQuyOtoData.tieuDe)"
              class="pt-4"
            />
            <NoiQuy :noi-quy-data="noiQuyOtoData" :note="noiQuyCanhBaoData" :check="!isHocSinh"/>
          </VWindowItem>
        </VWindow>
      </div>
    </ContentContainer>
  </PageContent>
</template>

<style scoped lang="scss">
.v-btn.v-btn--density-default {
  border: 1px solid #89A4E9;
}
</style>
