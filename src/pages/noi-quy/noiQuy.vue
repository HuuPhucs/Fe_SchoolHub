<script setup lang="ts">

import {useSetupLocalI18n} from "@/composable/setupI18n";

const props = defineProps({
  noiQuyData: Object,
  note: Object,
  check: Boolean,
});

const { t } = useSetupLocalI18n('parent');

onBeforeMount(() => {
  noiQuyData.value = props.noiQuyData;
  checkValue.value = props.check;
  note.value = props.note;
  caiDatChiTietDatas.value = noiQuyData.value.caiDatChiTiet;
  
  caiDatChiTietNote.value = note.value.caiDatChiTiet;
});
const checkValue = ref();
const noiQuyData = ref();
const note = ref();
const caiDatChiTietDatas = ref();
const caiDatChiTietNote = ref();
const setBorderTable = (index) => {
  if (caiDatChiTietDatas.value.length == 1) {
    return 'border-radius: 6px 6px 10px 10px'
  } else if (index == 0) {
    return 'border-radius: 6px 6px 0 0'
  } else if (index == caiDatChiTietDatas.value.length - 1) {
    return 'border-radius: 0 0 10px 10px'
  } else {
    return 'border-radius: 0'
  }
}


</script>

<template>
  <VRow>
    <VCol>
      <div class="noi-quy-table">
        <VCard
          v-for="(item, index) in caiDatChiTietDatas"
          :key="item.id"
          :style="setBorderTable(index)"
        >
          <div class="bg-primary-color">
            <VCardTitle
              class="text-center text-white"
              style="text-transform: uppercase;"
              v-html="t(item.tieuDe)"
            />
          </div>
          <VCardText>
            <CkContent :data="t(item.moTa)"/>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
  <VRow class="mb-4 justify-center">  
      <VCard class="footer" v-show="!checkValue">
        <VCardText class="pa-0" >
          <v-icon alt="" aria-hidden="false" color="#f05a22" class="pr-1" v-html="note.caiDatChiTiet[0].icon"/>
          {{ t(note.caiDatChiTiet[0].moTa) }}
        </VCardText>
      </VCard>
      <VCard class="footer" v-show="checkValue">
        <VCardText class="pa-0" style="text-align: center;">
          <CkContent :data="t(note.caiDatChiTiet[1].moTa)"></CkContent>
          
          <VCardText class="pa-0" v-show="item.icon && key !=0 "  v-for="(item,key) in note.caiDatChiTiet">
            <v-icon alt="" aria-hidden="false" color="#f05a22" class="pr-1" v-html="item.icon"/>
            {{t(item.moTa)}}
          </VCardText>
          
        </VCardText>
      </VCard>
  </VRow>
</template>

<style scoped lang="scss">
.bg-primary-color {
  background-color: #f05a22;
}

.noi-quy-table {
  border: 1px solid #f05a22;
  border-radius: 10px;
}

.footer {
  display: flex;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 10px;
  background: #FBEFEC;
}

</style>  
