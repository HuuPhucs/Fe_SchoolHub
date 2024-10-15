<script setup lang="ts">
import { formatDate } from "@/@core/utils/formatters";

const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <VCard style="background: #eef5ff" class="h-100" >
    <VImg style="height: 230px" :src="props.data.anhDaiDien" cover />
    <div class="pa-4">
      <RouterLink :to="`/tin-tuc/${props.data.id}`">
        <h5 class="limited-lines" :title="props.data.tieuDe">
          {{ props.data.tieuDe }}
        </h5>
        <div class="date">
          <span>{{ formatDate(props.data.ngayDang, { day: "numeric" }) }}</span>
          <span>Th{{ formatDate(props.data.ngayDang, { month: "numeric" }) }}</span>
        </div>
      </RouterLink>

      <div class="limited-lines content-new">
        {{ props.data.noiDungTomTat }}
      </div>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.limited-lines {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 3 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.content-new {
  font-size: 14px;
  padding-top: 16px;
  line-height: 140%;
  color: var(--text-color-141414, #141414);
}

.date {
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 5em;
  padding: 2px 12px 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  border: 1px solid rgb(var(--v-theme-primary));
  background: #fff;
  position: absolute;
  left: 10px;
  top: 10px;

  span {
    color: rgb(var(--v-theme-primary));
  }
}

.date span:first-child {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
}

.date span:last-child {
  font-size: 18px;
  font-weight: 600;
}
</style>
