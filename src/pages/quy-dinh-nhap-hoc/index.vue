<script setup lang="ts">
import { DanhSachTrangTinh } from "@/Constants/enums";
import { useSetupLocalI18n } from "@/composable/setupI18n";
import QuyDinhNhapHoc from "@/services/quyDinhNhapHoc.service";
const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const dataQuyDinhNhapHoc = ref([]);

const loadData = async() => {
  const res = await QuyDinhNhapHoc.getTrang(DanhSachTrangTinh.QuyDinhNhapHoc);
  if (res) {
    setupMessageForRegularPageConfig(res)
    dataQuyDinhNhapHoc.value = res.caiDatTongThe[0];
  }
};
onBeforeMount(async () => {
  if (dataQuyDinhNhapHoc.value.length <= 0) await loadData();
});
</script>

<template>
  <PageContent class="pb-15">
    <ContentContainer>
      <v-row>
        <v-col cols="12">
          <div class="title">{{ t(dataQuyDinhNhapHoc.tieuDe || '') }}</div>

          <div v-html="t(dataQuyDinhNhapHoc.mota || '')" class="title-detail"></div>

          <iframe :src="dataQuyDinhNhapHoc.link" style="width: 100%;height: 1000px;"> </iframe>
        </v-col>
      </v-row>
    </ContentContainer>
  </PageContent>
</template>

<style>
.container {
}
.title {
  color: var(--primary-blue, #005baa);
  text-align: center;
  /* Heading/H1_bold */

  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.title-detail {
  color: #191b25;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  margin-top: 20px;
  margin-bottom: 35px;
}
</style>
