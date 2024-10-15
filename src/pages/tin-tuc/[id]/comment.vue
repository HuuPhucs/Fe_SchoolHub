<script lang="ts" setup>
import TinTucService from "@/services/tinTuc.service";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

import { useToast } from "vue-toastification";
const toast = useToast();

const route = useRoute();
const id = route.params.id;

const comments = ref("");
onBeforeMount(() => {
  getCommentById(Number(id));
});

watch(route, async (value) => {
  if (value.params.id) {
    await getCommentById(Number(route.params.id));
  }
});

const dataComment = ref();
const getCommentById = async (id: number) => {
  const res = await TinTucService.GetPagedBinhLuanActive(id);
  if (res) {
    dataComment.value = res.data;
  }
};

const nameAvatar = (name: string) => {
  const res = name
    .split(" ")
    .map((i) => i[0])
    .join("")
    .toLocaleUpperCase();
  return res.slice(res.length - 2, res.length);
};

const dateCommentToString = (dateComment: string) => {
  const now = new Date().getTime();
  const date = new Date(dateComment).getTime();
  const sub = Math.ceil((now - date) / 24 / 60 / 60 / 1000);
  return `${sub} Days Ago`;
};

const stringToHSL = (name: string, background: boolean) => {
  const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const hRange = [0, 260];
  const sRange = [50, 0];
  const lRange = background ? [50, 0] : [25, 0];

  const generateHSL = (name: string) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
  };

  const HSLtoString = (hsl: any) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  return HSLtoString(generateHSL(name));
};

const GuiBinhLuan = async () => {
  const params = {
    taiKhoanId: Number(JSON.parse(localStorage.getItem("userData"))?.id),
    tinTucId: +id,
    noiDung: comments.value,
    isActive: false,
    trangThai: 0,
  };
  console.log(params);
  
  await TinTucService.ThemBinhLuan(params);
  comments.value = "";
  toast.success("Chờ phê duyệt");
  await getCommentById(id);
};
</script>

<template>
  <div class="list-comment-block">
    <div class="d-flex">
      <div class="title">Bình luận</div>
      <VSpacer />
      <div class="auth-block">
        <RouterLink to="/dang-nhap">
          <div class="auth">Đăng nhập</div>
        </RouterLink>
        <div class="auth">|</div>
        <RouterLink to="/dang-ky">
          <div class="auth">Đăng ký</div>
        </RouterLink>
        <div class="auth-text">để gửi bình luận</div>
      </div>
    </div>
    <AppTextarea
      v-model="comments"
      class="text-area"
      placeholder="Nhập bình luận tại đây..."
    />
    <div class="comment-action">
      <!-- <div class="d-sm-flex d-sm-inline mt-1"> -->
      <div style="margin-top: 10px">Ý kiến của bạn sẽ được xét duyệt</div>
      <VSpacer />
      <div class="btn-submit-block">
        <VBtn @click="GuiBinhLuan" class="btn-submit" color="#005BAA">
          gửi bình luận
        </VBtn>
      </div>
    </div>

    <v-list lines="three" item-props class="list-comment" :items="dataComment">
      <div class="text-center bg-warning pa-2 rounded" v-if="!dataComment">
        Chưa có bình luận cho bài viết này
      </div>
      <v-list-item v-for="(item, index) in dataComment" :key="index">
        <template v-slot:prepend>
          <v-avatar :color="stringToHSL(item.hoTen, true)" size="large">
            <span
              class="text-h5"
              :style="'color:' + stringToHSL(item.hoTen, false)"
              >{{ nameAvatar(item.hoTen) }}</span
            >
          </v-avatar>
        </template>

        <v-list-item-title>
          {{ item.hoTen }}
          <span class="date">{{
            dateCommentToString(item.thoiGianBinhLuan)
          }}</span>
        </v-list-item-title>

        <v-list-item-subtitle class="wrap-text">
          {{ item.noiDung }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.comment-action {
  display: flex;
}
.wrap-text {
  -webkit-line-clamp: unset !important;
}
.date {
  color: var(--gray-6-d-768-f, #6d768f);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 18px */
  letter-spacing: 0.075px;
}
.text-area {
  border-radius: 8px;
  background: #f9f9f9;
}
.auth-block {
  display: flex;
  margin-top: 40px;
}
.auth {
  color: var(--primary-blue, #005baa);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  margin-right: 5px;
}
.auth-text {
  color: var(--gray-6-d-768-f, #6d768f);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
}
.btn-submit {
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  text-transform: uppercase;
  margin-top: 10px;
}
.title {
  color: var(--primary-text-st, #191b25);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 36.4px */
  margin: 22px 0;
}
.list-comment-block {
  background-color: #fff;
  padding: 0 36px;
  border-radius: 10px;
  border: 1px solid #c2c2c2;
}

.list-comment {
  margin-bottom: 20px;
}
:deep(.v-list-item) {
  margin-top: 16px;
  text-align: justify;
  padding: 0 !important;
}

:deep(.v-list-item-title) {
  color: var(--light-text-color-title, #11142d);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 21.6px */
  letter-spacing: 0.09px;
  margin-bottom: 10px;
}
:deep(.v-list-item-subtitle) {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 20px */
  letter-spacing: 0.08px;
}
@media only screen and (max-width: 500px) {
  .list-comment-block {
    padding: 10px;
  }
  .comment-action {
    display: inline;
  }
  .btn-submit-block {
    display: flex;
    justify-content: center;
  }
  .auth-text {
    display: none;
  }

  /* :deep(.v-list-item){
    text-align: unset;
  } */
  :deep(.v-list-item) {
    text-align: unset;
  }
}
</style>
