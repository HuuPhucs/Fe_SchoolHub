<script setup lang="ts">
import { getPropertyName } from "@/@core/utils/formatters";
import { useSetupLocalI18n } from '@/composable/setupI18n';
import CauLacBoService from "@/services/cauLacBo.service";
import { getCurrentInstance } from "vue";
import PopupCauLacBo from "./PopupCauLacBo.vue";

const { t } = useSetupLocalI18n('parent');
const { t: t1, setMessageI18n} = useSetupLocalI18n();
const props = defineProps<{
  cauLacBoData: any;
}>();
const workingItem = ref([]);
const listCLB = ref([]);
const instance: any = getCurrentInstance();
onBeforeMount(async () => {
  await loadData();
});
const loadData = async () => {
  const res = await CauLacBoService.getAll();
  if (res) {
    res.forEach(item => {
      item.tenCauLacBo = setMessageI18n(item.tenCauLacBo, item.tenCauLacBoTiengAnh)
      item.moTa = setMessageI18n(item.moTa, item.moTaTiengAnh)
    })
    workingItem.value = res;
    listCLB.value = res;
  }
};
const onShowPopupCauLacBo = (item: any, params: any) => {
  instance?.refs.popupCauLacBo.show(item, params);
};
</script>

<template>
  <div>
    <div class="cau-lac-bo pt-12">
      <ContentContainer>
        <div class="pb-12">
          <PageTitle :title="t(props.cauLacBoData.tieuDe || '')" />

          <VRow justify="center">
            <VCol
              v-for="item in workingItem"
              :key="item.id"
              cols="6"
              sm="4"
              md="3"
              class="pb-6 px-3"
            >
              <VCard
                class="cau-lac-bo__item pa-6 py-8"
                @click="onShowPopupCauLacBo(item, listCLB)"
              >
                <VRow
                  justify="center"
                  class="cau-lac-bo__item-container text-center"
                >
                  <VCol cols="12" align-self="center">
                    <VIcon class="cau-lac-bo__icon pa-0">
                      <div v-html="item.icon" />
                    </VIcon>
                  </VCol>
                  <VCol cols="12">
                    <h5 class="cau-lac-bo__title">
                      {{ t1(item.tenCauLacBo || '') }}
                    </h5>
                  </VCol>
                </VRow>
              </VCard>
            </VCol>
          </VRow>
          <VRow justify="center" v-if="props.cauLacBoData.link > 1">
            <VBtn text="ĐĂNG KÝ NGAY" :href="props.cauLacBoData.link" />
          </VRow>
        </div>
      </ContentContainer>
    </div>
  </div>
  <PopupCauLacBo ref="popupCauLacBo" />
</template>

<style lang="scss">
.cau-lac-bo {
  background: #fff;
}

.cau-lac-bo__item {
  border: 1px solid rgba(var(--v-theme-primary), 0.7);
  border-radius: 12px;
  block-size: 160px;

  .cau-lac-bo__icon {
    svg {
      block-size: 40px !important;
      inline-size: 40px !important;

      path {
        fill: rgb(var(--v-theme-primary)) !important;
      }
    }
  }

  .cau-lac-bo__title {
    color: #000;
    text-align: center;
    text-transform: uppercase;
  }

  &:hover {
    background-color: rgb(var(--v-theme-primary));

    .cau-lac-bo__icon svg path {
      fill: #fff !important;
    }

    svg {
      stroke: rgb(var(--v-theme-primary)) !important;
    }

    .cau-lac-bo__title {
      color: #fff !important;
    }
  }
}
</style>
