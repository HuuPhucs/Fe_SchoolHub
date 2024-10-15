<script setup lang="ts">
import { useSetupLocalI18n } from '@/composable/setupI18n';
import moment from "moment";
import { ref } from "vue";

const { t } = useSetupLocalI18n('parent');
const showDialog = ref(false);
const loading = ref(false);
const btnL = ref(null);
const a = ref(null);
const data = ref();
const clubItemSelect = ref("");
const btnR = ref(null);

const onCloseDialogIconClicked = () => {
  showDialog.value = false;
};
const convertTime = (value: string | Date) => {
  if (!value) return value;
  return moment(value).format(`HH:mm`);
};
const convertMoney = (value: any) => {
  if (!value) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const show = async (item: any, params: any) => {
  data.value = params;
  clubItemSelect.value = t(item.tenCauLacBo);
  showDialog.value = true;
};
const thisLeftClick = () => {
  btnL.value.$attrs.onClick();
};
const thisRightClick = () => {
  btnR.value.$attrs.onClick();
};

defineExpose({
  show,
});
</script>

<template>
  <VDialog
    background="rgba(33, 33, 33, 0.50)"
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
    class="cau-lac-bo-dialog"
    width="80%"
    height="90%"
  >
    <DialogCloseBtn
      class="cau-lac-bo-dialog__closeBtn"
      @click="onCloseDialogIconClicked"
    >
    </DialogCloseBtn>
    <VCarousel
      style="border-radius: 10px"
      v-model="clubItemSelect"
      height="auto"
      hide-delimiters
      class="cau-lac-bo-carousel"
      ref="a"
    >
      <template #prev="{ props }">
        <VIcon
          @click="props.onClick"
          id="buttontrai"
          icon="mdi-chevron-left-circle"
          color="#FEB907"
          size="32"
          class="btn-next"
          ref="btnL"
          hidden
        >
        </VIcon>
      </template>
      <template #next="{ props }">
        <VIcon
          id="buttonPhai"
          @click="props.onClick"
          icon="mdi-chevron-right-circle"
          ref="btnR"
          color="#FEB907"
          size="32"
          hidden
        >
        </VIcon>
      </template>
      <VCarouselItem
        class="card"
        v-for="item in data"
        :key="item.id"
        :value="t(item.tenCauLacBo)"
      >
        <v-slide-group show-arrows>
          <VCard width="100%" :loading="loading" class="py-4 px-10">
            <page-title :title="t(item.tenCauLacBo)" />
            <VRow>
              <VCol class="d-flex justify-center" cols="12">
                <div class="cau-lac-bo-carousel__box">
                  <VRow>
                    <VCol cols="12" sm="4">
                      <VRow
                        justify="space-around"
                        align="center"
                        class="border-right"
                      >
                        <VIcon color="#005BAA" size="large"
                          >mdi-calendar-blank-outline</VIcon
                        >

                        <div>
                          <h5 class="text-h5">{{$t('Chương trình học.Số Buổi Học')}}</h5>
                          <CkContent :data="item.soBuoiHoc + ' ' + $t('Chương trình học.buổi/tuần')">
                          </CkContent>
                        </div>
                      </VRow>
                    </VCol>
                    <VCol cols="12" sm="4">
                      <VRow justify="space-around" align="center">
                        <VIcon color="#005BAA" size="large"
                          >mdi-sack-outline</VIcon
                        >
                        <div class="">
                          <h5 class="text-h5">{{ $t('Chương trình học.Học Phí') }}</h5>
                          <CkContent :data="convertMoney(item.hocPhi)" />
                        </div>
                      </VRow>
                    </VCol>
                    <VCol cols="12" sm="4">
                      <VRow
                        justify="space-around"
                        align="center"
                        style="border-left: 1px solid #005baa"
                      >
                        <VIcon color="#005BAA" size="large"
                          >mdi-clock-time-seven-outline</VIcon
                        >

                        <div class="">
                          <h5 class="text-h5">{{ $t('Chương trình học.Thời Gian') }}</h5>
                          <div class="d-flex">
                            <CkContent
                              :data="convertTime(item.thoiGianBatDau)"
                            />-
                            <CkContent
                              :data="convertTime(item.thoiGianKetThuc)"
                            />
                          </div>
                        </div>
                      </VRow>
                    </VCol>
                  </VRow>
                </div>
              </VCol>
            </VRow>

            <VRow class="information-text" justify="center">
              <VCol class="d-flex justify-center">
                <div class="box-information" style="width: 782px">
                  <h5 class="text-h5 py-1">{{$t('Chương trình học.Thông Tin CLB')}}</h5>
                  <p class="text-chitiet" v-html="t(item.moTa)" justify="center" />
                </div>
              </VCol>
            </VRow>
            <VRow
              class="cau-lac-bo-carousel__imgContainer"
              justify="space-between"
            >
              <VCol cols="12" :md="index % 2 == 0 ? '3' : '6' " v-for="(obj,index) in item.anhCauLacBos" v-if="item.anhCauLacBos.length == 3" >
                <VImg style="height: 280px;" :src="obj.linkAnh" cover alt=""/>
              </VCol>
              <VCol cols="12" md="5" v-for="(obj,index) in item.anhCauLacBos" v-if="item.anhCauLacBos.length == 2">
                <VImg style="height: 280px;" :src="obj.linkAnh" cover />
              </VCol>
            </VRow>
          </VCard>
        </v-slide-group>
      </VCarouselItem>
    </VCarousel>

    <icon-btn
      class="button-left"
      size="30"
      style="background-color: #feb907"
      variant="text"
    >
      <v-icon
        icon="tabler-chevron-left"
        color="#fff"
        size="30"
        @click="thisLeftClick()"
      >
      </v-icon>
    </icon-btn>
    <icon-btn
      class="button-right"
      size="30"
      style="background-color: #feb907"
      variant="text"
    >
      <v-icon
        icon="tabler-chevron-right"
        color="#fff"
        size="30"
        @click="thisRightClick()"
      >
      </v-icon>
    </icon-btn>
  </VDialog>
</template>

<style scoped lang="scss">
p {
  margin-block-end: 0 !important;
}
.v-dialog .v-dialog-close-btn {
  color: white !important;
}
.cau-lac-bo-dialog {
  overflow: scroll !important;
  max-block-size: 100vh;
  padding-inline-end: 0 !important;
  .cau-lac-bo-dialog__closeBtn {
    background: var(--linear, linear-gradient(90deg, #f69622 0%, #fec707 100%));
  }

  .cau-lac-bo-carousel {
    position: relative;

    .cau-lac-bo-carousel__btn {
      padding: 8px;
      border-radius: 50px;
      background: var(
        --linear,
        linear-gradient(90deg, #f69622 0%, #fec707 100%)
      );
      block-size: 32px !important;
      inline-size: 32px !important;

      &:hover {
        opacity: 0.8;
      }
    }

    .cau-lac-bo-carousel__box {
      display: flex;
      align-items: enter;
      border: 1px solid var(--funtion-border-89-a-4-e-9, #89a4e9);
      border-radius: 4px;
      background: var(--primary-ffffff, #fff);
      inline-size: 782px;
      padding-block: 16px;
      padding-inline: 20px;
    }
  }
}

.text-h5 {
  color: var(--gray-6-d-768-f, #6d768f);
  font-family: "San Francisco Display";
  line-height: 22px;
}

.text-chitiet {
  display: -webkit-box;
  overflow: hidden;
  align-self: stretch;
  -webkit-box-orient: vertical;
  color: var(--text-color-141414, #141414);
  font-style: normal;
  font-weight: 400;
  -webkit-line-clamp: 3;
  line-height: 140%;
  text-overflow: ellipsis;
}

.v-row {
  margin: 0 !important;
}

.cross {
  background: #89a4e9;
  block-size: 30px;
  inline-size: 1px;
}

@media (max-width: 960px) {
  .cau-lac-bo-carousel {
    overflow-y: scroll;
  }

  .cau-lac-bo-carousel__btn {
    display: none;
  }

  .cau-lac-bo-carousel__btn {
    display: none;
  }
}
.border-right {
  border-right: 1px solid #005baa;
}

.cardColor {
  background-color: rgba(255, 255, 255, 0) !important;
  border-color: white !important;
}
.button-left {
  position: fixed;
  top: 47%;
  left: -50px;
}
.button-right {
  position: fixed;
  top: 47%;
  right: -50px;
}
</style>
