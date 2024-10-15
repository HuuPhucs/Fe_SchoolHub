<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ListTinTuc from './tinTucLienQuan.vue'
import BinhLuan from "./comment.vue"
import TinTucService from '@/services/TinTucBinhLuanCMS'

const route = useRoute()
const id = route.params.id
const itemId = ref()
const dataTinTucById = ref({} as any)
const listRelatedNews = ref([] as any)
const isShowRelatedNews = ref(false)

const breakcrumsItemsDefault = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Tin tức & sự kiện',
    disabled: false,
    href: '/tin-tuc',
  },
])

const breakcrumsItems = ref([] as any)

onMounted(() => {
  getDataTinTuc(id)
  itemId.value = id
  window.scroll(0, 0)
  const TIN_TUC_ROUTE = '/tin-tuc'
  isShowRelatedNews.value = route.path.startsWith(TIN_TUC_ROUTE)
})

watch(route, async value => {
  if (value.params.id) {
    await getDataTinTuc(route.params.id)
    itemId.value = id
    window.scroll(0, 0)
  }
})

const getDataTinTuc = async(id: Number)  => {
  const detail = await TinTucService.GetById(id)
  if (detail) {
    dataTinTucById.value = detail

    const dataBreakScrum = {
      title: detail.tieuDe,
      disabled: true,
    }

    breakcrumsItems.value = [...breakcrumsItemsDefault.value, { ...dataBreakScrum }]

    const listNews = await TinTucService.GetAllTinTuc()
    const relatedNews = listNews.data.filter((item: any) => item.chuyenMucId == detail.chuyenMucId)

    listRelatedNews.value = window.innerWidth > 959 ? relatedNews.slice(0, 3) : relatedNews.slice(0, 4)
  }
}
</script>

<template>
  <PageContent
    id="main-bai-viet"
    v-model:banner-data="dataTinTucById.anhDaiDien"
    :breadcrumbs-items="breakcrumsItems"
    style="background-color: #fff;"
    class="pb-10"
  >
    <ContentContainer>
      <h1 class="mb-2 text-uppercase">
        {{ dataTinTucById.tieuDe }}
      </h1>
      <!--
        <div class="time">
        <VIcon size="small" icon="tabler-clock-hour-2" class="mr-1"/>
        {{
        new Date()
        .toLocaleString("en-US", {hour: "numeric", hour12: true})
        .split(" ")
        .join(":")
        }}
        <VIcon size="x-small" icon="tabler-point-filled"/>
        {{ new Date().toLocaleDateString() }}
        </div>
      -->
      <CkContent :data="dataTinTucById.noiDungChiTiet" /> 
<!--      <BinhLuan></BinhLuan>-->
      <!-- <Comment class="mt-10" :itemId="itemId" /> -->
      <ListTinTuc
        v-if="listRelatedNews.length > 0 && isShowRelatedNews"
        class="mt-10"
        :list-related-news="listRelatedNews"
      />
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
.title {
  color: var(--primary-text-st, #191b25);
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 36.4px */
  margin-block: 0;
  text-align: start;
}

.time {
  display: flex;
  align-items: center;
  color: var(--gray-6-d-768-f, #6d768f);
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-block: 20px;
  margin-inline: 10px;
}
</style>

<route lang="yaml">
alias: '/bai-viet/:id'
</route>
