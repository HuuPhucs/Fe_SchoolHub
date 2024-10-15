<template>
  <VRow :class="{'collapsed' : collapsed}" class="smtn" no-gutters>
    <VCol v-if="imagePosition === 'left'" cols="12" md="5" class="smtn__img-box">
      <img :src="data.linkAnh"/>
    </VCol>
    <VCol cols="12" md="7" class="pa-10" :style="{ 'backgroundColor': backgroundColor }">
      <div class="pb-4 d-flex">
        <div class="text-white">
          <div
            v-if="data?.icon"
            v-html="data?.icon"
          />
          <div v-else>
            <img src="../../../assets/images/imgTongQuan/KinhLup.svg"
              width="57"
              height="55"
            >
          </div>
        </div>
        <div class="ml-4 text-white">
          <CkContent :data="data.tieuDe ? data.tieuDe : ''"/>
        </div>
      </div>

      <div class="pb-4 text-white">
        <CkContent :data="data.moTa"/>
      </div>
      <v-btn
        class="more-btn"
        @click="collapsed = !collapsed"
      >
        {{ collapsed? 'Xem thêm' : 'Đóng' }}
      </v-btn>
    </VCol>
    <VCol v-if="imagePosition === 'right'" cols="12" md="5" class="smtn__img-box">
      <img :src="data.linkAnh"/>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any,
  imagePosition?: string
  backgroundColor?: string
}>()

const collapsed = ref(true);
</script>

<style lang="scss" scoped>
.smtn{
  min-height: 315px;
  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  &.collapsed{
    height: 315px;
    overflow: hidden;
    text-overflow: ellipsis;

    .smtn__img-box img{
      height: 315px;
    }
  }
  
  &.collapsed .ck-content{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .more-btn {
    border-radius: 6px;
    background: rgba(25, 27, 37, 0.3) !important;
  }
  
}
</style>
