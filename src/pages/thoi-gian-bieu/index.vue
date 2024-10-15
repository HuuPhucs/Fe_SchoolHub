<script setup lang="ts">
import moment from 'moment'
import {onBeforeMount, ref} from 'vue'
import LichThang from "./lich-thang.vue";
import ThoiGianBieu from "./thoi-gian-bieu.vue";
import type {ILichSuKien, IThoiGianBieu} from './types'
import ThoiGianBieuService from '@/services/thoiGianBieu.service'
import {CaEnum} from '@/Constants/ThoiGianBieu'
import IMenuTab from "@/components/pageContent/models/menuTab.interface";
import router from '@/router';
import MenuService from '@/services/menu.service';

const style = ref()

const listRender = ref<{
  tenCa: string
  data: IThoiGianBieu[]
}[]>([])

const dataCalender = ref<ILichSuKien[]>([])
const year = 2023
const list = Array.from({length: 12}, (_, i) => i + 1)
const listLoaiSuKien = ref<{ loaiSuKien: string; mau: string }[]>([])

list.unshift(...list.slice(7, 14))
list.splice(12, 20)

onBeforeMount(async () => {
  const tabList = await MenuService.getTabList(router.currentRoute.value.path)

  const heightImage = document.querySelector('.image-ns')?.clientHeight || 0
  const heightNav = document.querySelector('.nav.container')?.clientHeight || 0

  style.value = {
    'margin-top': `${heightImage + heightNav + 10}px`,
  }

  const result = await ThoiGianBieuService.getPage()

  listLoaiSuKien.value = result.loaiSuKien
  const thoiGianBieu = result.thoiGianBieu.map((i: IThoiGianBieu) => ({
    ...i,
    thoiGianBatDau: moment(i.thoiGianBatDau, 'hh:mm:ss').format('HH[h]mm'),
    thoiGianKetThuc: moment(i.thoiGianKetThuc, 'hh:mm:ss').format('HH[h]mm'),
  }))

  dataCalender.value = result.lichSuKien.map((i: ILichSuKien) => ({
    ...i,
    ngayBatDau: moment(new Date(i.ngayBatDau)).format('YYYY/MM/DD'),
    ngayKetThuc: moment(new Date(i.ngayKetThuc)).format('YYYY/MM/DD'),
  }))

  listRender.value.push({
    tenCa: 'Buổi sáng',
    data: thoiGianBieu.filter((i: IThoiGianBieu) => i.caHoc === CaEnum.CaSang),
  })
  listRender.value.push({
    tenCa: '',
    data: thoiGianBieu.filter((i: IThoiGianBieu) => i.caHoc === CaEnum.CaTrua),
  })
  listRender.value.push({
    tenCa: 'Buổi chiều',
    data: thoiGianBieu.filter((i: IThoiGianBieu) => i.caHoc === CaEnum.CaChieu),
  })
});

</script>

<template>
  <page-content title="Thời gian biểu">
    <content-container>
      <v-row justify="center" class="mb-12">
        <v-col md="8" sm="12">
          <thoi-gian-bieu :list-render="listRender"/>
        </v-col>
      </v-row>
    </content-container>

    <div class="calender-block">
      <div class="title">
        Lịch năm học
      </div>
      <div v-if="dataCalender.length > 0" class="main">
        <div v-for="(item, index) in list" :key="index" class="">
          <lich-thang
            :year="item < index + 1 ? year + 1 : year"
            :month="item"
            :data-calender="dataCalender"
          />
        </div>
      </div>

      <div class="loai-su-kien-block">
        <div class="loai-su-kien">
          <div
            v-for="(item, index) in listLoaiSuKien"
            :key="index"
            class="item"
          >
            <span
              class="color-block"
              :style="{ backgroundColor: item.mau }"
            />
            <span class="su-kien">{{ item.loaiSuKien }}</span>
          </div>
        </div>
      </div>
    </div>
  </page-content>
</template>

<style lang="scss" scoped>

* {
  box-sizing: border-box;
  color: #000;
  opacity: unset;
}

.main {
  margin-bottom: 150px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  width: min-content;
  margin: 0 auto;
}

.breadcrumb {
  max-width: 1200px;
  margin: auto;
}

.breadcrumb-item {
  margin-left: 10px;
}

.icon {
  margin-right: 3px;
  margin-bottom: -2px;
}

.trang-chu {
  color: var(--gray-6-d-768-f, #6D768F);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.calender-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-image: url('https://cth.edu.vn/wp-content/uploads/2017/12/truongNguyenSieu.jpg');

  background-color: rgba(3, 3, 3, 0.30);
  background-blend-mode: overlay;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

.title {
  color: #FFF;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  margin: 30px 0;
}

}

/** */

.time-table {
  padding: 0 10px;
  margin: 30px auto 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 791px;
}

.title {
  margin-bottom: 30px;
  text-align: center;
  color: #005BAA;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

/*** */
.loai-su-kien {
  margin: 0 20px;
  width: 1200px;
  border-radius: 6px;
  background: #FFF;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 14px 0;
}

.loai-su-kien-block {
  margin: 24px auto 71px;
}

.loai-su-kien .item {
  margin: 0 10px;
  padding: 4px 0;
}

.color-block {
  padding: 0 8px;
  border: 0px solid #000;
}

.su-kien {
  margin-left: 10px;
}

@media only screen and (max-width: 1200px) {
  .main {
    grid-template-columns: 1fr 1fr;
  }

  .loai-su-kien {
    flex-wrap: wrap;
    width: 590px;
  }
}

@media only screen and (max-width: 600px) {
  .main {
    grid-template-columns: 1fr;
  }

  .loai-su-kien {
    flex-wrap: wrap;
    width: 285px;
  }
}
</style>
