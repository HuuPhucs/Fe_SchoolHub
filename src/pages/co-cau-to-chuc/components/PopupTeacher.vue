<script setup lang="ts">
import { onBeforeMount } from "vue";

onBeforeMount(async () => {});

const workingItem = ref();

const show = async (item) => {
  showPopup.value = true;
  workingItem.value = item;
};

const showPopup = ref(false);

defineExpose({
  show,
});

const onCloseDialogIconClicked = () => {
  showPopup.value = false;
};
</script>

<template>
  <VDialog
    v-model="showPopup"
    persistent
    transition="dialog-top-transition"
    width="700"
  >
    <DialogCloseBtn class="closeBtn" @click="onCloseDialogIconClicked" />
    <v-row>
      <v-col cols="12">
      <VCard>
        <VRow class="card-teacher">
          <VCol cols="4">
            <VRow>
              <img class="image-teacher" :src="workingItem.linkAnh" />
            </VRow>
            <VRow class="card-popup" v-if="workingItem.chamNgon">
              <div>
                <p>
                  {{ workingItem.chamNgon }}
                </p>
              </div>
            </VRow>
          </VCol>
          <VCol cols="8">
            <div>
              <p class="name">
                {{ workingItem.hoTen }}
              </p>
            </div>
            <div>
              <p class="thanh-ngang" />
            </div>
            <div>
              <p class="desc">
                {{$t('Cơ cấu tổ chức.Chức vụ')}}:
                <span>{{ workingItem.chucVu }}</span>
              </p>
            </div>
            <div>
              <p class="desc" v-if="workingItem.phongBan">
                {{$t('Cơ cấu tổ chức.Phòng ban')}}:
                <span>{{ workingItem.phongBan }}</span>
              </p>
            </div>
            <div>
              <p class="desc" v-if="workingItem.thongTinLienLac">
                {{$t('Cơ cấu tổ chức.Thông tin liên lạc')}}:
                <span>{{ workingItem.thongTinLienLac }}</span>
              </p>
            </div>
            <div>
              <p class="desc" v-if="workingItem.hocVan">
                {{$t('Cơ cấu tổ chức.Học vấn')}}:
                &nbsp;<span>{{ workingItem.hocVan }}</span>
              </p>
            </div>
            <div>
              <p class="desc" v-if="workingItem.quaTrinhLamViec">
                {{$t('Cơ cấu tổ chức.Quá trình làm việc')}}:
                &nbsp;<span>{{
                  workingItem.quaTrinhLamViec
                }}</span>
              </p>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </v-col>
    </v-row>
  </VDialog>
</template>

<style lang="scss" scoped>
.card-teacher {
  background: #fff;
  border-radius: 8px;
}

.image-teacher {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.v-col-4 {
  padding: 40px 40px;
}

.v-col-8 {
  padding: 25px 25px;
}

.card-popup {
  border-radius: 10px;
  background: rgba(192, 212, 243, 0.6);
  padding: 16px;
}

.desc {
  overflow: hidden;
  color: #191b25;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
}

.name {
  color: #141414;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
}

.thanh-ngang {
  width: 60px;
  height: 2px;
  background: #6d768f;
}

.v-row + .v-row {
  margin-top: 20px;
}
.v-dialog .v-dialog-close-btn {
  color: white !important;
}
.closeBtn {
  background: var(--linear, linear-gradient(90deg, #f69622 0%, #fec707 100%));
}
</style>
