<template>
  <div class="new-relate">
    <div class="new-relate-title">tin liên quan</div>
    <VRow>
      <VCol
        v-for="item in props.listRelatedNews"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <VCard class="new-1 h-100">
          <VImg style="height: 230px;" :src="item.anhDaiDien" cover />
          <div class="pa-4">
            <RouterLink :to="`/tin-tuc/${item.id}`">
              <h5 class="limited-lines" :title="item.tieuDe">
                {{ item.tieuDe }}
              </h5>
              <div class="date">
                <span>{{ getDay(item.ngayDang) }}</span>
                <span>Th{{ getMonth(item.ngayDang) }}</span>
              </div>
            </RouterLink>

            <div class="limited-lines content-new">
              {{ item.noiDungTomTat }}
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  listRelatedNews: any;
}>();

const getDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.getDate();
};

const getMonth = (monthStr: string) => {
  const date = new Date(monthStr);
  return date.getMonth() + 1;
};

</script>
<style scoped>
.new-relate {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.new-relate-title {
  color: var(--primary-blue-005-baa, #005baa);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.new-1 {
  border-radius: 10px;
  background-color: #eef5ff;
}
.limited-lines {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 3 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.date {
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 68px;
  padding: 2px 12px 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  border: 1px solid rgb(var(--v-theme-primary));
  background: #fff;
  position: absolute;
  left: 10px;
  top: 10px;

  span {
    color: rgb(var(--v-theme-primary));
  }
}
.content-new {
  font-size: 14px;
  padding-top: 16px;
  line-height: 140%;
  color: var(--text-color-141414, #141414);
}
</style>
