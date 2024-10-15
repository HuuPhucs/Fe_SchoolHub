<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, ref } from 'vue'
import { DanhSachTrangTinh } from '@/Constants/enums'
import PopupTeacher from '@/pages/co-cau-to-chuc/components/PopupTeacher.vue'
import DoiNguGiaoVien from '@/services/doiNguGiaoVien.service'
import PageConfigService from '@/services/pageConfig.service'
import PhongBanService from '@/services/phongBan.service'

const menuTabs = ref<IMenuTab[]>([
  {
    title: 'Tổng quan',
    path: '/',
  },
  {
    title: 'Phương thức dạy học',
    path: '/chuong-trinh-hoc',
  },
  {
    title: 'Cơ sở vật chất',
    path: '/chuong-trinh-hoc',
  },
  {
    title: 'Cơ cấu tổ chức',
    path: '/chuong-trinh-hoc',
    isActive: true,
  },
  {
    title: 'Góc truyền thống',
    path: '/chuong-trinh-hoc',
  },
])

const breakcrumsItems = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Góc truyền thống',
    disabled: true,
  },
])

const items = ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4']
const listPhongBan = ref([])
const pageConfig = ref()

const instance = getCurrentInstance()

const onEditIconClicked = item => {
  instance?.refs.dialog.show(item)
}

const teacherConfig: any = ref({
  phongBanId: null,
  keyword: null,
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 8,
    pageSizeOptions: [10, 20, 50, 100],
    totalPages: 1,
    totalItems: 1,
  },
})

const loadTeacher = async () => {
  const params = {
    pageNo: teacherConfig.value.pagination.pageNo,
    pageSize: teacherConfig.value.pagination.pageSize,
    phongBanId: teacherConfig.value.phongBanId,
    keyword: teacherConfig.value.keyword,
  }

  const res = await DoiNguGiaoVien.GetNhanVienPagination(params)
  if (res) {
    teacherConfig.value.data = res.data
    teacherConfig.value.pagination = {
      ...teacherConfig.value.pagination,
      pageNo: res.pageNo === 0 ? 1 : res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    }
  }
}

const loadPhongBan = async () => {
  const res = await PhongBanService.getAll()
  if (res)
    listPhongBan.value = res
}

const loadData = async () => {
  await loadTeacher()
}

const onPageNoChanged = async () => {
  await loadData()
}

onBeforeMount(async () => {
  const config = await PageConfigService.getPageConfig(DanhSachTrangTinh.DoiNguGiaoVien)

  pageConfig.value = {
    ...config.caiDatTongThe[0],
    tieuDe: config.caiDatTongThe[0]?.tieuDe.toUpperCase() || '',
  }
  await loadData()
  await loadPhongBan()
})

const onClickPopup = async item => {
  instance?.refs.popup.show(item)
}

const onPhongBanChanged = event => {
  loadTeacher()
}

const onSearchTextChanged = event => {
  loadTeacher()
}
</script>

<template>
  <PageContent :menu-tabs="menuTabs">
    <ContentContainer>
      <VBreadcrumbs :items="breakcrumsItems">
        <template #prepend>
          <VIcon
            icon="tabler-home"
            size="small"
          />
        </template>
      </VBreadcrumbs>
      <div class="title-home">
        <h2>{{ pageConfig ? pageConfig.tieuDe : '' }}</h2>
        <p>
          {{ pageConfig ? pageConfig.mota : '' }}
        </p>
      </div>
      <div>
        <VRow>
          <VCol offset="">
            <VSelect
              v-model="teacherConfig.phongBanId"
              :items="listPhongBan"
              item-value="id"
              item-title="tenPhongBan"
              label="Phòng ban"
              @update:modelValue="onPhongBanChanged"
            />
          </VCol>
          <VCol offset="6">
            <VTextField
              v-model="teacherConfig.keyword"
              label="Tìm kiếm"
              append-inner-icon="mdi-magnify"
              @change="onSearchTextChanged"
            />
          </VCol>
        </VRow>
      </div>
      <div style="margin-top: 20px;">
        <VRow>
          <VCol
            v-for="item in teacherConfig.data"
            :key="item.id"
            lg="3"
            sm="12"
          >
            <VCard
              color="#EDF2FF"
              style="border-radius: 10px;"
              @click="onClickPopup(item)"
            >
              <img
                class="card-image"
                :src="item.linkAnh"
                alt=""
              >
              <div class="card-desc">
                <p class="desc">
                  {{ item.hoTen }}
                </p>
                <p class="thanh-ngang" />
                <p class="name">
                  <span class="title-teacher">Chức vụ:</span> {{ item.chucVu }}
                </p>
                <p class="name">
                  <span class="title-teacher">Phòng ban:</span> {{ item.phongBan }}
                </p>
              </div>
            </VCard>
          </VCol>
        </VRow>
        <VCardText class="mt-6">
          <VRow>
            <VCol
              style="padding: 12px 0;"
              class="d-flex justify-end"
            >
              <VPagination
                v-model="teacherConfig.pagination.pageNo"
                total-visible="5"
                :length="teacherConfig.pagination.totalPages"
                @update:modelValue="onPageNoChanged"
              />
            </VCol>
          </VRow>
        </VCardText>
      </div>
    </ContentContainer>
    <PopupTeacher ref="popup" />
  </PageContent>
  <!--  <dialog ref="dialog" /> -->
</template>

<style lang="scss" scoped>
.title-home {
  h2 {
    color: #005baa;
    cursor: pointer;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-block: 50px 40px;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    color: #191b25;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-block-end: 40px;
  }
}

.card-desc {
  padding: 20px;
}

.desc {
  color: #191b25;
  color: #005baa;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-weight: 700;
  line-height: 140%;
}

.name {
  overflow: hidden;
  color: #191b25;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-overflow: ellipsis;

  .title-teacher {
    color: #191b25;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
}

.card-image {
  block-size: 100%;
  inline-size: 100%;
}

.thanh-ngang {
  background: #6d768f;
  block-size: 2px;
  inline-size: 60px;
}
</style>
