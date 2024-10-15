<script lang="ts" setup>
import Banner from '@/components/pageContent/Banner.vue'
import type IMenuTab from '@/components/pageContent/models/menuTab.interface'
import MenuService from '@/services/menu.service'

interface IBreadcrumb {
  title: string
  href: string
  disabled: boolean
}

const props = defineProps<{
  bannerData?: string

  // menuTabs?: IMenuTab[],
  breadcrumbsItems?: any
  title?: string,
  hideBanner: boolean,
}>()

const router = useRouter()
const route = useRoute()
const menuTabs = ref<IMenuTab[]>(null)
const breadcrumbs = ref<IBreadcrumb[]>(null)

const getTabList = async () => {
  const BAN_TRU_ROUTER = '/ban-tru'
  let currentPath = router.currentRoute.value.path
  if (currentPath.startsWith(BAN_TRU_ROUTER) && currentPath.split('/').length > 2) {
    currentPath = BAN_TRU_ROUTER
  }
  const tabList = await MenuService.getTabList(currentPath)

  menuTabs.value = tabList
}

const getBreadcrumb = async () => {
  breadcrumbs.value = []

  const TIN_TUC_ROUTER = '/tin-tuc'
  const BAN_TRU_ROUTER = '/ban-tru'
  const TIN_TUC_BREADCRUM = 'Nội dung tin tức'
  let currentPath = router.currentRoute.value.path
  if (currentPath.startsWith(TIN_TUC_ROUTER) && currentPath.split('/').length > 2) {
    currentPath = TIN_TUC_ROUTER
    breadcrumbs.value = [{
      title: TIN_TUC_BREADCRUM,
      href: '#',
      disabled: true,
    }]
  }
  if (currentPath.startsWith(BAN_TRU_ROUTER) && currentPath.split('/').length > 2) {
    currentPath = BAN_TRU_ROUTER
  }

  const menuConfig = await MenuService.GetMenuConfig()
  let parent = menuConfig.find(f => f.url === currentPath)
  while (parent !== null && parent !== undefined) {
    breadcrumbs.value.unshift({
      title: parent.name,
      href: parent.url || '#',
      disabled: true,
    })
    parent = menuConfig.find(f => f.id === parent.parentId)
  }

  if (breadcrumbs.value.length > 0) {
    breadcrumbs.value.unshift({
      title: 'Trang chủ',
      href: '/',
      disabled: false,
    })
  }
}

watch(() => route.fullPath, async () => {
  await Promise.all([getTabList(), getBreadcrumb()])
})

onMounted(async () => {
  await Promise.all([getTabList(), getBreadcrumb()])
})
//
// onUpdated(() => {
//   window.scroll(0, 0)
// })
</script>

<template>
  <div>

    <!--  Banner -->
    <Banner v-if="!hideBanner" :banner-data="bannerData" />

    <!--  Menu tab -->
    <div
      v-if="menuTabs && menuTabs.length > 0"
      class="menu-tab"
    >
      <ContentContainer>
        <!-- Navigation -->
        <div class="nav-background">
          <nav class="nav container">
            <Component
              :is="item.isActive ? 'a' : 'router-link'"
              v-for="item in menuTabs"
              :class="{ active: item.isActive }"
              :disabled="!item.isActive"
              :to="item.path"
              class="nav-btn"
            >
              {{ item.title }}
            </Component>
          </nav>
        </div>
      </ContentContainer>
    </div>

    <!--  Main content -->
    <div class="mb-10">
      <ContentContainer>
        <VBreadcrumbs
          v-if="breadcrumbs?.length"
          :items="breadcrumbs"
          class="px-0"
        >
          <template #prepend>
            <VIcon
              icon="tabler-home"
              size="small"
            />
          </template>
        </VBreadcrumbs>

        <PageTitle
          v-if="title"
          :title="title"
        />
      </ContentContainer>

      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.v-breadcrumbs__prepend) {
  padding-block-end: 4px;
}

</style>
