<script setup lang="ts">
import { useToast } from 'vue-toastification'
import DialogVideo from './DialogVideo.vue'
import PlayVideo from '@images/icons/nsps/Union.svg'

const props = defineProps<{
  data: any
}>()

const toast = useToast()

const getEmbeddedIframe = (youtubeLink: string) => {
  const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]+)/
  const match = youtubeLink.match(regex)
  if (match && match[1]) {
    const videoId = match[1]

    return `https://www.youtube.com/embed/${videoId}`
  }
  else { toast.error('Invalid YouTube link') }
}

const getThumbnailUrl = (youtubeLink: string) => {
  const videoId = extractVideoId(youtubeLink)
  if (videoId)
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  else toast.error('Invalid YouTube link')
}

const extractVideoId = (link: string) => {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/|https?:\/\/(?:www\.)?youtube\.com\/embed\/)([\w-]+)/
  const match = link.match(regex)

  return match ? match[1] : null
}

const showDialog = ref(false)
const videoLink = ref()

const setDialog = () => {
  showDialog.value = false
}

const onDialogVideo = (id: number) => {
  videoLink.value = getEmbeddedIframe(props.data.link)
  showDialog.value = true
}
</script>

<template>
  <VCard
    style="background: #fbefec"
    @click="onDialogVideo(props.data.id)"
  >
    <VImg
      :src="getThumbnailUrl(data.link)"
      alt="YouTube Thumbnail"
      class="imageThumbnail d-flex justify-center"
    >
      <VImg
        class="svg__icon"
        :src="PlayVideo"
      />
    </VImg>

    <div
      style="cursor: pointer;"
      class="pa-4 text-justify"
    >
      <h5>
        {{ data.tieuDe }}
      </h5>
    </div>
  </VCard>
  <DialogVideo
    :show-dialog="showDialog"
    :set-dialog="setDialog"
    :video-link="videoLink"
  />
</template>

<style lang="scss" scoped>
.imageThumbnail{
  position: relative;
  .svg__icon{
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
