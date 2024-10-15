<script setup lang="ts">
import { DanhSachTrangTinh } from '@/Constants/enums';
import { useSetupLocalI18n } from '@/composable/setupI18n';
import PageConfigService from '@/services/pageConfig.service';
import { onBeforeMount, ref } from 'vue';
import ChuongTrinhHoc from "./components/ChuongTrinhHoc.vue";
import DanhSachCauLacBo from "./components/DanhSachCauLacBo.vue";

onBeforeMount(async () => {
  await loadData()
})
const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const chuongTrinhHocData = ref<any>({})
const cauLacBoData = ref<any>({})

const loadData = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.ChuongTrinhHoc)
  setupMessageForRegularPageConfig(res)
  chuongTrinhHocData.value = res.caiDatTongThe[0]
  cauLacBoData.value = res.caiDatTongThe[1]
}
</script>

<template>
  <page-content :title="t(chuongTrinhHocData.tieuDe || '')">
    <chuong-trinh-hoc v-for="(item, index) in chuongTrinhHocData.caiDatChiTiet"
                      :key="item.id"
                      :data="item"
                      :class="index % 3 === 0 ? 'bg-index1' : index % 3 === 2 ? 'bg-index3' : ''"
                      :image-position="index % 2 === 0 ? 'right': 'left'"
    />
    <danh-sach-cau-lac-bo :cau-lac-bo-data="cauLacBoData"/>
  </page-content>
</template>

<style scoped>

.bg-index1 {
  background: #edf2ff;
}

.bg-index3 {
  background: #fcf0e3;
}

</style>
