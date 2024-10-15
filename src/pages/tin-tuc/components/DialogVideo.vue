<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps<{
  videoLink: string,
  showDialog: boolean,
  setDialog: Function,
}>()

onUpdated(() => {
  showDialog.value = props.showDialog
})

const showDialog = ref(props.showDialog)

const onCloseDialogIconClicked = () => {
  props.setDialog()
}
</script>

<template>
  <div>
    <VDialog
      v-model="props.showDialog"
      width="800"
    >
      <DialogCloseBtn @click="onCloseDialogIconClicked" />
      <VCard>
        <iframe
          class="video"
          :src="props.videoLink"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.video {
  aspect-ratio: 16/9;
}
</style>
