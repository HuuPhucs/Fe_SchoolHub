<script setup lang="ts">
import { useSetupLocalI18n } from "@/composable/setupI18n";
import HocPhiService from "@/services/hocPhi.service";
import { onBeforeMount, ref } from "vue";

const {t, setMessageI18n } = useSetupLocalI18n();
const hocPhi = ref({
  namHocId: 0,
  noiDung:'',
  listHocPhi: [
    {
      heDaoTao: '',
      heDaoTaoId: 0,
      lop: '',
      lopId: 0,
      tienHocPhi: 0
    }
  ]
});  
const namHoc = ref({
  TenNamHoc: ''
});

onBeforeMount(async () => {
  const hocPhiRes = await HocPhiService.getHocPhiByNamHoc();
  if (hocPhiRes) {
    hocPhiRes.noiDung = setMessageI18n(hocPhiRes.noiDung, hocPhiRes.noiDungTiengAnh)
    hocPhi.value = hocPhiRes;
    namHoc.value.TenNamHoc = hocPhiRes.tenNamHoc.substr(7);
  }
})

</script>

<template>
  <page-content
    :title="t('Học phí.Tiêu đề')"
    class="pb-10"
    style="background-color: #fff"
  >
    <content-container>
      <v-row style="text-align: center">
        <v-col >
          <p style="margin: 0;" v-html="t(hocPhi.noiDung)"></p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col>
          <div class="hocphi_title">
            <h3 style="margin: auto;" class="hocphi__title-context">
              {{ $t('Học phí.Bảng quy định học phí') + ' ' + hocPhi.tuNam + ' - ' + hocPhi.denNam }}
            </h3>
            <div class="hocphi__title-img">
              <img class="hocphi__title-image" src="../../assets//images/svg//hocPhiThreeDots.svg">
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" class="pb-5">
        <v-col cols="12" sm="8" md="8" >
          <VTable class="text-no-wrap hocphi_table">
            <thead class="table_title">
              <tr>
                <th class="text-uppercase">{{ $t('Học phí.Mô hình lớp') }}</th>
                <th class="text-uppercase">{{$t('Học phí.Lớp')}}</th>
                <th class="text-uppercase">{{$t('Học phí.Học phí/Chương trình học')}}</th>
              </tr>
            </thead>
            <div class="table_hocphi-space">
              
            </div>
            <tbody class="table_body">
              <tr v-for="item in hocPhi.listHocPhi" :key="item.lop">
                <td>
                  {{ item.heDaoTao }}
                </td>
                <td class="text-center">
                  {{ item.lop }}
                </td>
                <td class="text-center">
                  {{ item.tienHocPhi.toLocaleString('vn') }}
                </td>
              </tr>
              <div class="table_body-border">

              </div>
            </tbody>
          </VTable>
        </v-col>
      </v-row>
    </content-container>
  </page-content>
</template>

<style lang="scss" scoped>
.hocphi_table {
  border-collapse: collapse;
}
.hocphi_title {
  position: relative;
}
.hocphi__title-context {
  width: fit-content;
  padding: 6px 54px;
  text-transform: uppercase;
  text-align: center;
  color: #f05a22;
  border: 1px solid #f05a22;
  border-radius: 6px;
}
.hocphi__title-img {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
}
.table_title {
  text-wrap: wrap;
}
.table_title tr th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.table_title tr th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.table_title tr th {
  text-align: start;
  font-size: 16px;
  font-weight: 700 !important;
  color: #fff !important;
  border-bottom: none !important;
  background-color: #f05a22;
}
.table_hocphi-space {
  height: 10px;
}
.table_body {
  position: relative;
}
.table_body::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #f05a22;
}
.table_body tr td {
  text-align: start !important;
}
@media screen and (max-width: 1000px) {
    .table_body tr td {
      max-width: 160px; 
      text-overflow: ellipsis;
      overflow: hidden;
    }
  .table_title tr th {
    padding: 8px !important;
  }
}
@media screen and (max-width: 739px) {
  .table_body tr td {
      max-width: 110px;
    }
}

@media screen and (max-width: 400px) {
  .table_body tr td {
      max-width: 70px;
    }
}
</style>
