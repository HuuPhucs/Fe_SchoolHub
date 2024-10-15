<script setup lang="ts">
import { DanhSachTrangTinh, LoaiPhongBan } from '@/Constants/enums'
import { useSetupLocalI18n } from '@/composable/setupI18n'
import PersonCard from '@/pages/co-cau-to-chuc/components/PersonCard.vue'
import type { PersonInfo } from '@/pages/co-cau-to-chuc/components/PersonInfo'
import PopupTeacher from '@/pages/co-cau-to-chuc/components/PopupTeacher.vue'
import NhanVienService from '@/services/nhanVien.service'
import PageConfigService from '@/services/pageConfig.service'

const {t, setupMessageForRegularPageConfig } = useSetupLocalI18n();

const props = defineProps<{
  pageId: number | string | DanhSachTrangTinh
}>()

const instance = getCurrentInstance()
const levelList = ref<PersonInfo[][]>()

const caiDatTongThe = ref({})
interface NhanVienInfoLite {
  level: number
  members: PersonInfo[]
}

const nhanVienData = ref<NhanVienInfoLite[]>([])

onMounted(async () => {
  try {
    const res = await PageConfigService.getPageConfig(props.pageId)
    setupMessageForRegularPageConfig(res)
    const loaiPhongBan = props.pageId === DanhSachTrangTinh.HoiDongTruong ? LoaiPhongBan.HoiDongTruong : props.pageId === DanhSachTrangTinh.BanGiamHieu ? LoaiPhongBan.BanGiamHieu : LoaiPhongBan.PhongBanKhac
    const nhanVien = await NhanVienService.getNhanVienByLoaiPhongBanActive(loaiPhongBan)
    
    nhanVien.forEach(item => {
      const member = {
        anhDaiDien: item.linkAnh,
        chucDanh: item.chucVu,
        hocHamHocVi: item.hocVan,
        hoTen: item.hoTen,
        linkAnh: item.linkAnh,
        chamNgon: item.chamNgon,
        chucVu: item.chucVu,
        phongBan: item.phongBan,
        thongTinLienLac: item.thongTinLienLac,
        hocVan: item.hocVan,
        quaTrinhLamViec: item.quaTrinhLamViec,
      }

      if (!nhanVienData.value?.some(f => f.level === item.hang)) {
        nhanVienData.value?.push({
          level: item.hang,
          members: [member],
        })
      }
      else {
        const record = nhanVienData.value.find(f => f.level === item.hang)
        if (record)
          record.members.push(member)
      }
    })

    caiDatTongThe.value = res.caiDatTongThe[0]
  }
  catch (e) {
    console.error(e)
  }
})

const onClickPopup = async item => {
  instance?.refs.popup.show(item)
}
</script>

<template>
  <PageContent
    :title="t(caiDatTongThe.tieuDe || '')"
    class="pb-10"
  >
    <ContentContainer>
      <div class="text-justify mb-8">
        <CkContent :data="t(caiDatTongThe.mota || '')" />
      </div>

      <VRow justify="center">
        <VCol
          cols="12"
          md="10"
        >
          <VRow
            v-for="(level, index) in nhanVienData"
            justify="center"
          >
            <VCol
              v-for="member in level.members"
              class="personal-card"
              cols="12"
              sm="4"
            >
              <PersonCard
                :color="index === 0 ? 'xanh' : 'vang'"
                :data="member"
                @click="onClickPopup(member)"
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <PopupTeacher ref="popup" />
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
.personal-card {
  & :hover {
    cursor: pointer;
  }
}
</style>
