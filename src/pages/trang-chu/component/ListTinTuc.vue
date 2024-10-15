<template>
  <div class="py-12">
    <ContentContainer>
      <page-title>tin tức & sự kiện</page-title>

      <VRow justify="center">
        <VCol v-for="(item, index) in tableConfigTinTuc.data" :key="index" cols="12" sm="6" md="4">
          <TinTucItem :data="item" />
        </VCol>
      </VRow>

      <VRow justify="center">
        <VCol v-for="item in tableConfigVideo.data" :key="item.id" cols="12" sm="6" md="4">
          <VideoItem :data="item" />
        </VCol>
      </VRow>
      <v-row justify="center">
        <router-link to="/tin-tuc">
          <v-btn text="XEM THÊM"></v-btn>
        </router-link>
      </v-row>
    </ContentContainer>
  </div>
</template>
<script setup lang="ts">
import TinTucItem from "@/pages/tin-tuc/components/TinTucItem.vue";
import VideoItem from "@/pages/tin-tuc/components/VideoItem.vue";
import TinTucService from "@/services/tinTuc.service";
import { onBeforeMount, ref } from "vue";

const tableConfigTinTuc = ref({
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 3,
    totalPages: 1,
    totalItems: 1,
  },
});

const tableConfigVideo = ref({
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 3,
    totalPages: 1,
    totalItems: 1,
  },
});

onBeforeMount(async () => {
  await loadData();
  await loadVideo();
});

const loadData = async () => {
  const params = {
    pageNo: tableConfigTinTuc.value.pagination.pageNo,
    pageSize: tableConfigTinTuc.value.pagination.pageSize,
  };

  const res = await TinTucService.GetTinTucActive(params);
  if (res) {
    tableConfigTinTuc.value.data = res.data;
    tableConfigTinTuc.value.pagination = {
      ...tableConfigTinTuc.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    };
  }
};

const loadVideo = async () => {
  const params = {
    pageNo: tableConfigVideo.value.pagination.pageNo,
    pageSize: tableConfigVideo.value.pagination.pageSize,
  };

  const res = await TinTucService.GetAllVideo(params);
  if (res) {
    tableConfigVideo.value.data = res.data;
    tableConfigVideo.value.pagination = {
      ...tableConfigVideo.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  color: var(--primary-blue-005-baa, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 40px;
}
</style>
