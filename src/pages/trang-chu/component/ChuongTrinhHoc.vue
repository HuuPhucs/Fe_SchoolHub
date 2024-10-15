<template>
  <div style="background: #f1f8fb;" class="chuongTrinhHoc__main py-12">
    <content-container>
      <page-title :title="chuongTrinhHoc.tieuDe" />
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" v-for="(item, index) in chuongTrinhHoc.caiDatChiTiet" :key="index">
          <div class="chuongTrinhHoc" 
               data-animate-onscroll-offset="100"
               v-animate-onscroll.repeat="useAnimate(index)"
          >
            <div class="chuongTrinhHoc-detail">
              <div class="icon" v-html="item.icon"></div>
              <div class="title">{{ item.tieuDe }}</div>
              <ck-content class="dsc" :data="item.moTa" />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-12">
        <router-link to="chuong-trinh-hoc">
          <v-btn text="TÌM HIỂU THÊM"></v-btn>
        </router-link>
      </v-row>
    </content-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const chuongTrinhHoc = ref<any>({});
const props = defineProps<{
  data?: any;
}>();

onMounted(() => {
  chuongTrinhHoc.value = props.data;
});


const animate1 = { in: 'animate__animated animate__slow animate__zoomInLeft', out: 'animate__animated animate__zoomOutLeft' }
const animate2 = { in: 'animate__animated animate__slow animate__zoomInDown', out: 'animate__animated animate__zoomOutUp' }
const animate3 = { in: 'animate__animated animate__slow animate__zoomInRight', out: 'animate__animated animate__zoomOutRight' }

const useAnimate = (index:number) =>{
  var x = index % 3;
  return x === 0 ? animate1 : x === 1 ? animate2 : animate3;
}

</script>
<style lang="scss" scoped>
@media only screen and (max-width: 960px) {
  .chuongTrinhHoc {
    &__main {
      margin-top: 30px !important;
    }
  }
}

.all {
  display: flex;
  padding: 40px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.chuongTrinhHoc__title {
  color: var(--primary-blue-005-baa, #005baa);
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.chuongTrinhHoc {
  display: flex;
  min-height: 380px;
  padding: 40px 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid var(--primary-blue-005-baa, #005baa);
  background: #fff;
}

.chuongTrinhHoc-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.icon {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 72px;
  background: var(--funtion-eef-5-ff, #eef5ff);
}

.title {
  color: var(--primary-blue-005-baa, #005baa);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.dsc {
  color: #191b25;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

:deep(.chuongTrinhHoc):hover {
  background-color: var(--primary-blue, #005baa) !important;
}

.chuongTrinhHoc:hover .title {
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.chuongTrinhHoc:hover .dsc {
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.chuongTrinhHoc:hover svg circle {
  fill: white;
  fill-opacity: 1;
}
</style>
