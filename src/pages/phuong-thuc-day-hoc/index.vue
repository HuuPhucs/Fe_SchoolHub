<script setup lang="ts">
import { DanhSachTrangTinh } from '@/Constants/enums';
import { useSetupLocalI18n } from '@/composable/setupI18n';
import PageConfigService from '@/services/pageConfig.service';
import { onBeforeMount, ref } from 'vue';
const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();
const dataDayHoc = ref<any>({})

onBeforeMount(async () => {
  await loadDataDayHoc();
})

const loadDataDayHoc = async () => {
  const res = await PageConfigService.getPageConfig(DanhSachTrangTinh.PhuongThucDayHoc);
  setupMessageForRegularPageConfig(res)
  dataDayHoc.value = res.caiDatTongThe[0];
}

</script>

<template>
  <page-content :title="t(dataDayHoc.tieuDe || '')">
    <content-container>
      <div class="teach-detail">

        <ck-content class="dsc-organization text-justify mt-5 mb-5" :data="t(dataDayHoc.moTa || '')" />
        <div class="w-100 mt-5 mb-5">
          <v-row>
            <v-col v-for="(item, index) in dataDayHoc.caiDatChiTiet" :key="index" cols="12" sm="12" md="12"
              class="rounded">
              <v-card flat>
                <v-row no-gutters>
                  <v-col v-if="index % 2 !== 0" cols="12" md="6" sm="12">
                    <v-img :src="item.linkAnh" class="dayHoc_img" cover></v-img>
                  </v-col>

                  <v-col md="6" sm="12" cols="12" class="card-content"
                    :style="index % 2 === 0 ? 'background:#FBEFEC' : 'background:#EEF5FF'">
                    <div class="dayHoc_content">
                      <v-card-title class="title-organization">{{ t(item.tieuDe || '') }}
                        <v-divider class="my-2 titleDivider" />
                      </v-card-title>
                      <ck-content class="dsc-organization mt-4" style="padding: 0.5rem 1rem;" :data="t(item.moTa || '')" />
                    </div>
                  </v-col>

                  <v-col v-if="index % 2 === 0" md="6" sm="12" cols="12">
                    <v-img :src="item.linkAnh" class="dayHoc_img" cover></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </content-container>
  </page-content>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .dayHoc_content {
    max-width: 94%;
    margin: 4% auto;
  }

  .dayHoc_img {
    height: 260px;
  }
}

.dayHoc_content {
  max-width: 82%;
  margin: 8% auto;
}

.dayHoc_img {
  height: 350px;
}

.teach-title {
  display: inline-flex;
  align-items: center;
}

.teach-dsc1 {
  color: var(--gray-6-d-768-f, #6d768f);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}

.teach-dsc2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #6d768f;
  gap: 10px;
  padding-block: 0;
  padding-inline: 8px;
}

.teach-dsc3 {
  color: var(--primary-text-st, #191b25);

  /* Body/regular */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}

.teach-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teach-detail-title {
  color: var(--primary-blue, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
}

.title-organization {
  color: var(--primary-blue, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.dsc-organization {
  color: #231f20;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
