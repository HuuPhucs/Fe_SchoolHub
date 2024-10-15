<template>
  <v-card height="100%" class="person-card" :color="cardColor">
    <div>
      <img class="person-card__img" :src="data?.linkAnh" />
    </div>
    <VCardText class="pa-5 pt-2 desCard">
      <h4 class="person-card__hoten">
        {{ data?.danhHieu }}
        <span class="text-uppercase">{{ data?.hoTen }}</span>
      </h4>
      <VDivider class="titleDivider my-2" />
      <h5 style="color: #005baa" class="pt-1">{{ data?.chucVu }}</h5>
      <v-row class="pt-3 item-hocvan">
        <v-col cols="12">
          <img src="@images/mock-img/cil_school.svg" />
          <p class="education">
            {{ data?.hocVan }}
          </p>
        </v-col>
      </v-row>
      <v-row class="thongTinLienLac">
        <v-col col="12">
          <img src="@images/mock-img/clarity_email-line.svg" />
          <p class="email">{{ data?.thongTinLienLac }}</p>
        </v-col>
      </v-row>
    </VCardText>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NhanVienInfo } from "./NhanVienInfo";

const props = defineProps<{
  color: string;
  data?: NhanVienInfo;
}>();

const cardColor = computed(() => {
  return props.color === "xanh" ? "#EDF2FF" : "#FCF0E3";
});
</script>

<style lang="scss" scoped>
.person-card {
  border-radius: 10px;

  .person-card__img {
    height: 320px;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }

  .person-card__hoten {
    &,
    * {
      font-weight: bold;
    }
  }

  .titleDivider {
    width: 60px;
    border-width: 2px 0 0 0;
  }

  &__chucDanh {
    font-weight: bold;
  }
}
.education {
  margin-left: 50px;
  margin-top: -30px;
  overflow: hidden;
  color: #141414;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
.email {
  margin-left: 50px;
  margin-top: -30px;
  overflow: hidden;
  color: #141414;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.thongTinLienLac {
  position: absolute;
  bottom: 1.5%;
}

.desCard {
  height: 210px;
}
.chucVu {
  margin-left: 10px;
  overflow: hidden;
  color: #005baa;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
}
</style>
