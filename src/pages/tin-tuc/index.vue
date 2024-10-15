<script setup lang="ts">
import { useToast } from 'vue-toastification'
import TinTucItem from './components/TinTucItem.vue'
import VideoItem from './components/VideoItem.vue'
import TinTucService from '@/services/tinTuc.service'

const toast = useToast()

const tableConfigTinTuc = ref({
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 6,
    totalPages: 1,
    totalItems: 1,
  },
})

const tableConfigVideo = ref({
  data: [] as any,
  pagination: {
    pageNo: 1,
    pageSize: 6,
    totalPages: 1,
    totalItems: 1,
  },
})

const menuTabs = ref<any[]>([
  {
    title: 'Cuộc sống học đường',
    path: '/',
    isActive: true,
  },
  {
    title: 'Tin tức',
    path: '/tin-tuc',
  },
])

const loading = ref(false)

onBeforeMount(async () => {
  await Promise.all([loadData(), loadVideo()])
})

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

onMounted(() => {
  scrollToTop()
})

const loadData = async () => {
  loading.value = true

  const params = {
    pageNo: tableConfigTinTuc.value.pagination.pageNo,
    pageSize: tableConfigTinTuc.value.pagination.pageSize,
  }

  const res = await TinTucService.GetAll(params)
  if (res) {
    tableConfigTinTuc.value.data = res.data
    tableConfigTinTuc.value.pagination = {
      ...tableConfigTinTuc.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    }
  }
  loading.value = false
}

const loadVideo = async () => {
  loading.value = true

  const params = {
    pageNo: tableConfigVideo.value.pagination.pageNo,
    pageSize: tableConfigVideo.value.pagination.pageSize,
  }

  const res = await TinTucService.GetAllVideo(params)
  if (res) {
    tableConfigVideo.value.data = res.data
    tableConfigVideo.value.pagination = {
      ...tableConfigVideo.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    }
  }
  loading.value = false
}

const onPageNoChanged = () => {
  loadData()
}

const onPageNoChangedVideo = () => {
  loadVideo()
}

const breadcrumbsItems = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Tin tức và sự kiện',
    disabled: true,
  },
])
</script>

<template>
  <PageContent
    id="news-page"
    :breadcrumbs-items="breadcrumbsItems"
    title="Tin tức & sự kiện"
    class="pb-15"
  >
    <ContentContainer>
      <VRow
        v-if="tableConfigTinTuc.data?.length"
        class="container"
      >
        <VCol>
          <VRow>
            <VCol
              v-for="(item, index) in tableConfigTinTuc.data"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <TinTucItem :data="item" />
            </VCol>
          </VRow>
          <VCardText class="mt-6">
            <VRow>
              <VCol
                style="padding: 12px 0px"
                class="d-flex justify-end"
              >
                <VPagination
                  v-model="tableConfigTinTuc.pagination.pageNo"
                  total-visible="5"
                  :length="tableConfigTinTuc.pagination.totalPages"
                  @update:modelValue="onPageNoChanged"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCol>
      </VRow>

      <VRow
        v-if="tableConfigVideo.data?.length"
        class="container"
      >
        <VCol>
          <PageTitle title="Thư viện video" />
          <VRow>
            <VCol
              v-for="item in tableConfigVideo.data"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
            >
              <VideoItem :data="item" />
            </VCol>
          </VRow>
          <VCardText class="mt-6">
            <VRow>
              <VCol
                style="padding: 12px 0;"
                class="d-flex justify-end pagination"
              >
                <VPagination
                  v-model="tableConfigVideo.pagination.pageNo"
                  total-visible="5"
                  :length="tableConfigVideo.pagination.totalPages"
                  @update:modelValue="onPageNoChangedVideo"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCol>
      </VRow>
    </ContentContainer>
  </PageContent>
</template>
