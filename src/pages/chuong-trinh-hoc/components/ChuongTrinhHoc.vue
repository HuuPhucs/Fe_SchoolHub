<template>
  <div class="chuong-trinh-hoc py-10">
    <ContentContainer>
      <v-row>
        <v-col v-if="props.imagePosition === 'left'" cols="12" align-self="center"  md="5">
          <img :src="props.data.linkAnh"
               alt=""
               class="chuong-trinh-hoc__image"
          >
        </v-col>
       
       
        <v-col cols="12" md="7" align-self="center">

          <h2 class="text-primary">{{ t(props.data.tieuDe) }}</h2>

          <v-divider class="my-2 titleDivider" />

          <div class="mb-0 mt-5 text-justify" v-html="t(data.moTa)" />
        </v-col>

        <v-col v-if="props.imagePosition === 'right'" 
               cols="12" md="5" 
               align-self="center">
          
          <img :src="props.data.linkAnh"
               alt=""
               class="chuong-trinh-hoc__image"
          >
        </v-col>
      </v-row>
    </ContentContainer>
  </div>
</template>

<script setup lang="ts">
import { useSetupLocalI18n } from '@/composable/setupI18n';

const { t } = useSetupLocalI18n('parent');

const props = defineProps<{
  data: any,
  imagePosition: string
}>();
</script>

<style lang="scss" scoped>
.chuong-trinh-hoc__image {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}
</style>
