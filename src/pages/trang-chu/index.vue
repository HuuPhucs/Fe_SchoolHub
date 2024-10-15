<route lang="yaml">
alias: "/"
</route>

<template>
  <page-content :hide-banner="true">
    <!-- <Masthead :next="mastheadNextRef" :data="mastHeadData"/>

    <div style="background-color: #fff">

      <VeChungToi
        ref="mastheadNextRef"
        v-if="trangChu[VE_CHUNG_TOI]"
        :data="trangChu[VE_CHUNG_TOI]"
      />

      <ChuongTrinhHoc
        v-if="trangChu[CHUONG_TRINH_HOC]"
        :data="trangChu[CHUONG_TRINH_HOC]"
      />
      <GocTruyenThong
        v-if="trangChu[GOC_TRUYEN_THONG]"
        :data="trangChu[GOC_TRUYEN_THONG]"
        data-animate-onscroll-offset="100"
        v-animate-onscroll="{ in: 'animate__animated animate__slow animate__slideInUp' }"
      />
      <SwiperImage :is-title="true"
                   data-animate-onscroll-offset="100"
                   v-animate-onscroll="{ in: 'animate__animated animate__slow animate__backInUp' }"
      ></SwiperImage>
      <TinTuc v-animate-onscroll="{ in: 'animate__animated animate__slow animate__zoomIn' }"></TinTuc>
    </div> -->
      <HomePageBanner/>
      <AboutUs/>
      <VRow>
        <VCol cols="3">
          <SuKienSapToi/>
        </VCol>
        <VCol cols="9">
          <TinTucMoi/>
        </VCol>
      </VRow>
      <ThanhTichCuaCon/>
      <DoiTac/>

  </page-content>
</template>

<script lang="ts" setup>

import { DanhSachTrangTinh } from "@/Constants/enums";
import PageConfigService from "@/services/pageConfig.service";
import AboutUs from "./component/aboutUs.vue";
import DoiTac from "./component/doiTac.vue";
import HomePageBanner from "./component/homePageBanner.vue";
import SuKienSapToi from "./component/suKienSapToi.vue";
import ThanhTichCuaCon from "./component/thanhTichCuaCon.vue";
import TinTucMoi from "./component/tinTucMoi.vue";

const VE_CHUNG_TOI = 1;
const CHUONG_TRINH_HOC = 2;
const GOC_TRUYEN_THONG = 3;

const mastheadNextRef = ref(null);
const mastHeadData = ref<any[]>([]);
const trangChu = ref<any>({});

const loadData = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.TrangChu)
  if (res.caiDatTongThe[0].caiDatChiTiet) {
    mastHeadData.value =  res.caiDatTongThe[0].caiDatChiTiet.map(item => {
      return {
        src: item.file.filePath || item.file.linkFile,
        type: item.file.fileType
      }
    })
    console.log(mastHeadData.value)
  }
  trangChu.value = res.caiDatTongThe;
};

onMounted(async () => {
  try {
    await loadData();
  } catch {
    console.error("load data failed!");
  }
});
</script>


<style lang="scss" scoped>

</style>
