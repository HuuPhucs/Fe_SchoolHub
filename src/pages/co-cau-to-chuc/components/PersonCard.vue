<template>
  <div>
    <v-card class="person-card"
            :color="cardColor"
    >
      <div>
        <img class="person-card__img" :src="data?.anhDaiDien" />
      </div>
      <VCardText class="pt-2">
        <h4 class="person-card__hoten">{{data?.hocHamHocVi}} <span class="text-uppercase">{{ data?.hoTen }}</span></h4>
        <VDivider class="titleDivider my-2"/>
        <div class="person-card__chucDanh">{{ data?.chucDanh }}</div> 
      </VCardText>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {PersonInfo} from "./PersonInfo";

const props = defineProps<{
  color: string,
  data?: PersonInfo
}>();

const cardColor = computed(()=>{
  return props.color === 'vang' ? '#FCF0E3' : '#EDF2FF' 
});

</script>

<style lang="scss" scoped>
.person-card {
  border-radius: 10px;
  
  .person-card__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .person-card__hoten{
    &, * {
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
</style>
