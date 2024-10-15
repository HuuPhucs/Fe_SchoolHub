<script setup lang="ts">
import { formatDate } from "@/@core/utils/formatters";
import BanTruSerivce from "@/services/banTru.service";
import imgHeader from "@images/logo/NSPS-logo-02.png";
import svgIcon from "@images/svg/Background.svg";
import svgIconMobile from "@images/svg/BackgroundMobile.svg";
import moment from "moment";
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ThucDonItem from "../components/ThucDonItem.vue";

const route = useRoute();
const idPage = ref();
const loading = ref(false);
const workingItem = ref({});
const relatedItem = ref({});
const icon = ref(svgIcon);

const convertLi = (data: any) => {
  const temp = 11 - [...data.matchAll("<li>")].length;

  const rep = Array(temp)
    .fill(0)
    .map(
      (_, index) =>
        `<li style="padding-top:${
          !index ? "25px" : "20px"
        }!important;list-style:none"></li>`
    )
    .join("");

  return data.replace("</ul>", `${rep.toString()}</ul>`);
};

const formatDateToString = (date: string) => {
  if (!date) return undefined;

  const [datePart] = date.split("T");

  return datePart;
};

// Ham
const loadChiTiet = async (id: number) => {
  loading.value = true;

  const res = await BanTruSerivce.GetChiTiet(id);

  if (res) {
    workingItem.value = {
      ...res,
      thuHai: convertLi(res.thuHai),
      thuBa: convertLi(res.thuBa),
      thuTu: convertLi(res.thuTu),
      thuNam: convertLi(res.thuNam),
      thuSau: convertLi(res.thuSau),
      anSang: convertLi(res.anSang),
    };
  }

  const resRelated = await BanTruSerivce.GetRelatedPage(
    formatDateToString(workingItem.value.tuNgay)
  );

  relatedItem.value = resRelated;
  loading.value = false;
};

onBeforeMount(async () => {
  idPage.value = route.params.id;
  await loadChiTiet(idPage.value);

  if (window.innerWidth < 1000) icon.value = svgIconMobile;
});

watch(route, async () => {
  await loadChiTiet(route?.params?.id);
});
</script>

<template>
  <PageContent
    style="background-color: #fff"
    class="pb-15"
  >
    <ContentContainer>
      <div v-if="workingItem" class="container-block">
        <header class="header">
          <h2>
            {{ $t('Bán trú.Thực đơn tuần') }}

            {{ formatDate(workingItem.tuNgay, { day: "numeric" }) }} -
            {{ moment(new Date(workingItem.denNgay)).format("DD/MM/YYYY") }}
          </h2>
        </header>

        <div class="content">
          <img :src="icon" alt="" />
          <div class="content-title">
            <div class="content-title-body">
              <div class="content-title-body-img">
                <img :src="imgHeader" alt="Logo" />
              </div>
              <div class="content-title-body_detail">
                <h2>{{ $t('Bán trú.Trường tiểu học Nguyễn Siêu') }}</h2>
                <h2>
                  {{ $t('Bán trú.Thực đơn tuần') }}
                  {{
                    workingItem &&
                    formatDate(workingItem.tuNgay, { day: "numeric" })
                  }}
                  -
                  {{
                    workingItem &&
                    moment(new Date(workingItem.denNgay)).format("DD/MM/YYYY")
                  }}
                </h2>
              </div>
            </div>
          </div>
          <div class="content-body">
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauThuHai }"
              >
                <h2>{{$t('Bán trú.Thứ 2')}}</h2>
                <div class="detail-list" v-html="workingItem?.thuHai" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="77"
                  viewBox="0 0 46 77"
                  fill="none"
                >
                  <path
                    d="M3.26635 14.7437C2.84213 9.88881 7.60277 6.96643 11.6564 5.36384C13.966 4.46828 16.6056 3.73768 19.7165 3.14849C20.2585 3.05422 20.8006 3.00709 21.2955 3.07779C26.6218 3.59628 29.497 12.057 31.0996 16.7941L31.1939 17.1005C35.3653 29.3792 37.8399 37.6278 39.8903 44.7216C42.4827 53.6301 44.3917 62.8215 40.9272 69.5146C39.4425 72.3663 37.1093 73.0498 35.4124 73.1205C35.0589 73.144 34.7054 73.1205 34.3519 73.0969C31.4531 72.8141 28.4836 70.9994 26.881 68.407C24.1943 64.0705 21.5312 56.2226 19.9286 50.3542C18.7973 46.1828 17.6897 42.5298 16.6056 38.9711C15.4979 35.3182 14.3431 31.5238 13.1883 27.2345C13.0469 26.7631 12.9055 26.2682 12.7641 25.7733C11.8214 22.5446 10.8551 19.198 12.7169 16.8884C14.1545 15.1208 15.6393 14.2959 17.1476 14.4373C17.2183 14.4373 17.289 14.4609 17.3597 14.4609C19.8107 14.838 22.0968 17.6425 23.1102 20.1878C26.1504 27.918 28.3893 36.0016 30.7225 43.991C31.8066 47.6911 32.8672 51.3912 33.9041 55.0913C34.2812 56.364 34.7054 58.815 35.8131 59.687C38.2877 61.6195 38.1463 58.7207 37.6985 56.906C36.8029 53.3473 35.6953 49.8122 34.6819 46.2771C32.0423 37.1564 29.5441 27.8944 26.0561 19.0566C24.7128 15.6628 21.6726 11.9628 17.8782 11.3736C17.7368 11.35 17.619 11.3264 17.4776 11.3264C15.5922 11.1379 12.9526 11.7035 10.313 14.9323C7.41423 18.5145 8.71045 23.0395 9.77098 26.6689C9.91239 27.1638 10.0538 27.6351 10.1716 28.0829C11.35 32.4194 12.5048 36.2373 13.6361 39.9374C14.7202 43.4725 15.8278 47.1019 16.9355 51.2262C17.7368 54.1957 20.6356 64.2826 24.2414 70.1274C26.3625 73.5683 30.1805 75.9014 34.0691 76.2785C34.564 76.3257 35.0589 76.3492 35.5538 76.3256C39.1361 76.1842 42.0349 74.3224 43.7318 71.023C47.7147 63.3635 45.6879 53.4652 42.9305 43.9203C40.8801 36.8029 38.382 28.5072 34.1869 16.1813L34.0927 15.875C32.3722 10.7844 28.9549 0.721036 21.6962 0.0375782C20.8949 -0.0331244 20.0464 -0.0095497 19.1509 0.155423C15.8278 0.791746 12.9997 1.56948 10.5251 2.53575C3.26635 5.38742 -0.315912 9.74739 0.155438 15.0972C0.556086 20.1878 6.09445 38.8297 11.2086 55.7276C12.6698 59.0035 14.838 57.8487 14.3902 55.4448C9.44104 39.0418 3.64343 19.5751 3.26635 14.7437Z"
                    fill="#DB9188"
                  />
                </svg>
              </div>
            </div>
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauThuBa }"
              >
              <h2>{{$t('Bán trú.Thứ 3')}}</h2>

                <div class="detail-list" v-html="workingItem?.thuBa" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="78"
                  viewBox="0 0 44 78"
                  fill="none"
                >
                  <path
                    d="M27.5035 70.5255C25.1938 74.7913 19.6319 74.6263 15.3662 73.7072C12.9623 73.1887 10.3463 72.3638 7.42396 71.1147C6.90548 70.9026 6.45765 70.6198 6.05701 70.3134C1.90912 66.9668 4.17163 58.3411 5.42071 53.5334L5.49141 53.227C8.76729 40.7362 11.2419 32.5111 13.4337 25.488C16.191 16.6502 19.6319 7.97733 26.1837 4.32437C28.9882 2.76891 31.2978 3.47594 32.7355 4.34794C33.0418 4.53648 33.3246 4.72502 33.6074 4.9607C35.8699 6.7754 37.3311 9.93344 37.2369 12.9501C37.0955 18.0407 34.9979 26.0065 33.1125 31.7805C31.7692 35.8577 30.6851 39.5342 29.6245 43.0694C28.5404 46.7223 27.4327 50.5167 26.0187 54.7117C25.8773 55.1831 25.7123 55.678 25.5709 56.1729C24.5811 59.3781 23.5441 62.6775 20.7396 63.5731C18.5714 64.2566 16.8745 64.1152 15.7197 63.1725C15.6726 63.1253 15.6018 63.0782 15.5547 63.0311C13.74 61.3813 13.3629 57.7991 13.9285 55.1124C15.649 47.0052 18.2414 39.0629 20.6689 31.1442C21.8001 27.4677 22.9549 23.8147 24.1097 20.1617C24.5104 18.8891 25.5002 16.6266 25.0524 15.3068C24.039 12.3373 22.5778 14.8119 21.9651 16.603C20.7631 20.0675 19.7262 23.6026 18.642 27.0906C15.8375 36.117 12.8209 45.214 10.8648 54.476C10.1106 58.0347 10.6056 62.7954 13.4572 65.3642C13.5515 65.4585 13.6694 65.5528 13.7636 65.6235C15.2248 66.8019 17.723 67.8153 21.7059 66.5662C26.0894 65.1757 27.4799 60.6979 28.6111 57.1156C28.7525 56.6443 28.9175 56.1729 29.0589 55.7251C30.473 51.4594 31.6042 47.665 32.6883 43.9885C33.7253 40.4769 34.8094 36.824 36.1292 32.7939C37.0954 29.8951 40.2299 19.9025 40.4185 13.0679C40.5363 9.03787 38.6509 4.98426 35.6343 2.5568C35.2572 2.25042 34.8565 1.96761 34.4323 1.70837C31.3921 -0.153464 27.9513 -0.177033 24.7225 1.6141C17.2045 5.80912 13.4337 15.1419 10.5113 24.5924C8.31952 31.6391 5.82135 39.9113 2.54547 52.4492L2.47477 52.7556C1.10785 57.9405 -1.57884 68.1688 4.10093 72.7409C4.71369 73.2594 5.44426 73.6836 6.2927 74.0371C9.40361 75.3333 12.1846 76.2289 14.777 76.7945C22.3893 78.3971 27.7391 76.7709 30.308 72.0574C32.7826 67.6032 38.3917 49.0555 43.4115 32.2047C44.0007 28.6932 41.5733 28.4575 40.607 30.6964C35.7049 46.9344 29.8366 66.307 27.5035 70.5255Z"
                    fill="#AA9AC6"
                  />
                </svg>
              </div>
            </div>
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauThuTu }"
              >
              <h2>{{$t('Bán trú.Thứ 4')}}</h2>

                <div class="detail-list" v-html="workingItem?.thuTu" />
              </div>
            </div>
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauThuNam }"
              >
              <h2>{{$t('Bán trú.Thứ 5')}}</h2>

                <div class="detail-list" v-html="workingItem?.thuNam" />
              </div>
            </div>
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauThuSau }"
              >
              <h2>{{$t('Bán trú.Thứ 6')}}</h2>
                <div class="detail-list" v-html="workingItem?.thuSau" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="91"
                  height="45"
                  viewBox="0 0 91 45"
                  fill="none"
                >
                  <path
                    d="M9.13675 32.1738C3.89543 30.1239 3.3246 23.6891 3.7657 18.6554C4.02517 15.8012 4.62195 12.6875 5.60794 9.15871C5.78957 8.53598 6.02309 7.96516 6.33446 7.47216C9.60379 2.2049 19.8529 3.60604 25.5872 4.38445L25.9505 4.43632C40.7922 6.43425 50.6002 8.14678 59.0071 9.65171C69.5675 11.5718 80.0501 14.3221 85.1877 21.3538C87.3932 24.3637 86.8742 27.1141 86.0699 28.9044C85.9142 29.2677 85.7066 29.6309 85.499 29.9682C83.7087 32.8224 80.3096 34.9501 76.8068 35.2874C70.9168 35.8323 61.4461 34.5609 54.5442 33.1857C49.6402 32.1997 45.281 31.4732 41.0517 30.7726C36.6926 30.0461 32.1778 29.2936 27.144 28.2557C26.5732 28.1519 26.0024 28.0482 25.4056 27.9444C21.5654 27.2438 17.6214 26.5432 16.1944 23.4036C15.1046 20.9906 15.0267 19.0445 15.9349 17.5655C15.9868 17.4877 16.0387 17.4358 16.0646 17.358C17.6993 15.0228 21.773 14.0886 24.9645 14.374C34.5389 15.2043 44.0615 17.0725 53.5063 18.7591C57.8913 19.5375 62.2764 20.3419 66.6355 21.1722C68.1404 21.4576 70.9168 22.262 72.3698 21.5614C75.6391 19.9786 72.5774 18.6553 70.4497 18.1882C66.2982 17.2801 62.0688 16.6055 57.8913 15.853C47.0973 13.881 36.2255 11.7015 25.2758 10.7414C21.0724 10.3782 15.6754 11.6237 13.1067 15.2563C13.0029 15.386 12.925 15.5157 12.8472 15.6455C11.7055 17.4877 10.9011 20.5236 12.8731 24.9086C15.0786 29.7607 20.4237 30.7467 24.7309 31.5251C25.3018 31.6289 25.8726 31.7327 26.3916 31.8364C31.4772 32.8743 36.0439 33.6268 40.4289 34.3533C44.6324 35.0539 48.9655 35.7804 53.8176 36.7405C57.2945 37.441 69.2561 39.6465 77.1441 38.8941C81.7886 38.4789 86.1996 35.7285 88.5867 31.8883C88.8981 31.3953 89.1576 30.9023 89.3911 30.3834C91.1036 26.6211 90.6366 22.6512 88.1197 19.2002C82.2297 11.1307 70.9687 8.12082 59.6557 6.071C51.2229 4.54012 41.363 2.82756 26.4435 0.829636L26.0802 0.777771C19.9307 -0.0525361 7.76155 -1.7131 3.29865 5.44829C2.80565 6.22671 2.41645 7.1348 2.10509 8.14673C1.04125 11.9091 0.392577 15.2303 0.133106 18.318C-0.645307 27.2957 2.00129 33.2376 7.7875 35.521C13.2623 37.7265 35.4212 41.5926 55.5301 44.9916C59.6557 45.1733 59.6038 42.345 56.8794 41.5406C37.471 38.2972 14.3262 34.2755 9.13675 32.1738Z"
                    fill="#74B8D6"
                  />
                </svg>
              </div>
            </div>
            <div class="content-body-item">
              <div
                class="detail"
                :style="{ backgroundColor: workingItem.mauAnSang }"
              >
                <h2>
                  {{$t('Bán trú.Ăn sáng')}}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 0L6.17557 3.38197L9.75528 3.45492L6.90211 5.61803L7.93893 9.04508L5 7L2.06107 9.04508L3.09789 5.61803L0.244718 3.45492L3.82443 3.38197L5 0Z"
                      fill="#F05A22"
                    />
                  </svg>
                </h2>

                <div class="detail-list" v-html="workingItem?.anSang" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="79"
                  height="39"
                  viewBox="0 0 79 39"
                  fill="none"
                  class="svg-lastchild"
                >
                  <path
                    d="M71.0162 27.8839C75.5961 26.1074 76.0949 20.5305 75.7095 16.168C75.4828 13.6944 74.9613 10.9958 74.0997 7.93755C73.941 7.39785 73.7369 6.90314 73.4649 6.47588C70.6081 1.91092 61.6523 3.12524 56.6415 3.79986L56.3241 3.84481C43.3552 5.57635 34.7848 7.06054 27.4388 8.36481C18.2109 10.0289 9.05106 12.4125 4.56182 18.5066C2.63462 21.1152 3.08808 23.4988 3.79095 25.0505C3.92699 25.3653 4.10837 25.6801 4.28975 25.9725C5.85418 28.4461 8.82433 30.2901 11.8852 30.5825C17.0319 31.0547 25.3076 29.9527 31.3386 28.7609C35.6237 27.9064 39.4328 27.2767 43.1285 26.6696C46.9375 26.0399 50.8826 25.3878 55.2812 24.4883C55.78 24.3983 56.2788 24.3084 56.8003 24.2185C60.1558 23.6113 63.6021 23.0041 64.8491 20.2831C65.8014 18.1918 65.8694 16.5053 65.0759 15.2235C65.0305 15.156 64.9852 15.1111 64.9625 15.0436C63.5341 13.0197 59.9745 12.2101 57.1857 12.4575C48.8194 13.1771 40.4984 14.7962 32.2455 16.2579C28.4137 16.9325 24.582 17.6297 20.773 18.3493C19.4579 18.5966 17.0319 19.2937 15.7623 18.6866C12.9055 17.3148 15.5809 16.1679 17.44 15.7631C21.0677 14.9761 24.7634 14.3914 28.4137 13.7393C37.8457 12.0302 47.3456 10.1413 56.9136 9.30925C60.5866 8.99443 65.3026 10.0739 67.5472 13.2221C67.6379 13.3346 67.7059 13.447 67.774 13.5594C68.7716 15.156 69.4744 17.7871 67.7513 21.5875C65.8241 25.7926 61.1535 26.6471 57.3898 27.3217C56.8909 27.4117 56.3921 27.5016 55.9387 27.5916C51.4948 28.4911 47.5044 29.1432 43.6726 29.7729C39.9996 30.38 36.2132 31.0097 31.9734 31.8417C28.9352 32.4489 18.483 34.3603 11.5904 33.7082C7.53198 33.3484 3.67758 30.9647 1.59167 27.6365C1.3196 27.2093 1.09286 26.782 0.888809 26.3323C-0.607605 23.0716 -0.199486 19.631 1.99979 16.6402C7.14655 9.64659 16.9866 7.03804 26.872 5.26153C34.2407 3.93477 42.8564 2.45055 55.8933 0.719018L56.2108 0.674068C61.5842 -0.0455312 72.2179 -1.48469 76.1176 4.72186C76.5484 5.39648 76.8885 6.18349 77.1605 7.0605C78.0901 10.3212 78.657 13.1996 78.8837 15.8756C79.5639 23.6563 77.2512 28.8059 72.1952 30.7848C67.4112 32.6963 48.0485 36.0469 30.477 38.9927C26.872 39.1502 26.9173 36.699 29.298 36.0019C46.2573 33.1909 66.4816 29.7054 71.0162 27.8839Z"
                    fill="#D6B39F"
                  />
                </svg>
                <div class="bonus-extra">
                  <p>
                    {{ $t('Bán trú.Ghi chú thực đơn') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="relatedItem.length > 0" class="footer">
          <header class="header">
            <h2>{{$t('Bài viết liên quan')}}</h2>
          </header>

          <VRow style="margin-top: 40px">
            <VCol
              v-for="item in relatedItem"
              :key="item.id"
              sm="12"
              cols="12"
              md="6"
            >
              <RouterLink :to="`${item.id}`">
                <ThucDonItem :data="item" />
              </RouterLink>
            </VCol>
          </VRow>
        </div>
      </div>
    </ContentContainer>
  </PageContent>
</template>

<style lang="scss" scoped>
.detail-list {
  :deep(ul) {
    li {
      margin-block-start: 5px;
    }

    li::after {
      display: block;
      border-block-end: 1px solid rgba(147, 147, 147, 50%);
      content: " ";
      inline-size: 260px;
      margin-block-start: -5px !important;
      margin-inline-start: -15px !important;
    }

    div {
      margin-block-start: 5px;
    }

    div::after {
      display: block;
      border-block-end: 1px solid rgba(147, 147, 147, 50%);
      content: " fsfs";
      inline-size: 260px;
      margin-block-start: -5px !important;
      margin-inline-start: -15px !important;
    }
  }

  :deep(ol) {
    li {
      margin-block-start: 5px;
    }

    li::after {
      display: block;
      border-block-end: 1px solid rgba(147, 147, 147, 50%);
      content: " ";
      inline-size: 260px;
      margin-block-start: -5px !important;
      margin-inline-start: -15px !important;
    }

    div {
      margin-block-start: 5px;
    }

    div::after {
      display: block;
      border-block-end: 1px solid rgba(147, 147, 147, 50%);
      content: " fsfs";
      inline-size: 260px;
      margin-block-start: -5px !important;
      margin-inline-start: -15px !important;
    }
  }
}

.container-block {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-block-start: 30px;
}

.header h2 {
  color: #0635aa;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
}

/* content */
.container-block .content {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: auto;
  block-size: max-content;

  /* width: 1016px; */
  min-block-size: 1378px;
}

.content-title {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  margin: auto;
  gap: 10px;
  inline-size: 480px;
  inset-block-start: 25px;
  inset-inline-start: 267px;
}

.content-title-body {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.content-title-body-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  block-size: 60px;
  inline-size: 60px;
}

.content-title-body-img img {
  block-size: 90%;
  inline-size: 90%;
}

.content-title-body_detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.content-title-body_detail h2:first-child {
  color: #3253a3;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
}
.content-title-body_detail h2:last-child {
  color: var(--primary-orange-f-05-a-22, #f05a22);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
}
.content-title-body_detail p {
  margin: 0 !important;
  color: var(--primary-orange, #f05a22);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
}

.content-body {
  position: absolute;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  inset-block-start: 170px;
}

.content-body-item .detail {
  position: relative;
  border-radius: 10%;
  block-size: 365.887px;
  padding-block: 0 9px;
  padding-inline: 10px;
}

.content-body-item:last-child .detail {
  position: relative;
}

.content-body-item .detail h2 {
  position: relative;
  color: var(--primary-text-st, #191b25);
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-block: 16px;
  padding-inline: 0;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(-0.323deg);
}

.content-body-item .detail h2 svg {
  position: absolute;
  inset-block-start: 20px;
  inset-inline-start: 50px;
}

.content-body-item .detail .divider {
  position: absolute;
  z-index: 1000;
  flex-shrink: 0;
  margin-block-start: 6px;
}

.content-body-item .detail .divider .divider-list {
  flex-shrink: 0;
  background-color: red;
  background-color: rgba(147, 147, 147, 30%);
  block-size: 1.487px;
  inline-size: 263.593px;
  margin-block-start: 25px;
  margin-inline-start: 25px;
  stroke-width: 1px;
}

.content-body-item .detail-list {
  flex-grow: 1;
  padding: 0;
  padding: 8px 0 0 43px !important;
  border: 1px solid #000;
  border-radius: 10%;
  margin: auto;
  background-color: #fffdf4;
  block-size: max-content;
  color: var(--primary-text-st, #191b25);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  inline-size: 320px;
  line-height: 150%;
  min-block-size: 295px;
  opacity: 0.699999988079071;
  overflow-y: auto;
}

.content-body-item:last-child .detail .bonus-extra {
  position: absolute;
  z-index: 1001;
  flex-shrink: 0;
  margin: 0 !important;
  background-color: #fff;
  font-style: normal;
  font-weight: 500;
  inline-size: 264px;
  inset-block-start: 230px;
  inset-block-start: 285px;
  inset-inline-start: 36px;
  inset-inline-start: 40px;
  line-height: normal;
}

.content-body-item:last-child .detail .bonus-extra p {
  margin: 0 !important;
  font-size: 13px !important;
}

.content-body-item:first-child svg {
  position: absolute;
  inset-block-start: -30px;
  inset-inline-start: 15px;
}

.content-body-item:nth-child(2) svg {
  position: absolute;
  inset-block-start: -30px;
  inset-inline-end: 0;
}

.content-body-item:nth-child(5) svg {
  position: absolute;
  inset-block-start: -10px;
  inset-inline-start: 0;
}

.content-body-item:last-child .svg-lastchild {
  position: absolute;
  inset-block-start: -10px;
  inset-inline-end: 0;
}

/* footer */
.footer {
  display: block;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.footer-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.footer-body .footer-item {
  display: flex;
  border: 1px solid var(--funtion-border-89-a-4-e-9, #89a4e9);
  border-radius: 6px;
  gap: 15px;
  padding-block: 16px;
  padding-inline: 24px;
}

.footer-body .footer-item .img-plate {
  margin: auto;
  block-size: 50.392px;
  inline-size: 44px;
}

.footer-body .footer-item .footer-item-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.footer-body .footer-item .footer-item-body p {
  margin: 0;
}

.footer-body .footer-item .footer-item-body .title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-block: 0;
  padding-inline: 20px;
}

.footer-body .footer-item .footer-item-body .title p {
  color: var(--text-color-141414, #141414);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  text-transform: uppercase;
}

.footer-body .footer-item .footer-item-body .title::after {
  display: block;
  background: var(--funtion-border-89-a-4-e-9, #89a4e9);
  block-size: 2px;
  content: "";
  inline-size: 60px;
}

.footer-item-body-date {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding-block: 0;
  padding-inline: 20px;
}

.footer-item-body-date .img-clock {
  block-size: 20px;
  inline-size: 20px;
}

.footer-item:hover {
  background-color: var(--primary-blue, #005baa) !important;
  cursor: pointer;
}

.footer-item:hover .title-item,
.footer-item:hover .date {
  color: var(--primary-ffffff, #fff) !important;
}

@media (max-width: 1200px) {
  #main {
    inline-size: 100%;
  }
}

@media (max-width: 1000px) {
  .path_tintuc-header,
  .path_tintuc-guide,
  .path_tintuc-content {
    font-size: 15px;
  }

  .v-row {
    display: block;
  }

  .header h2 {
    font-size: 20px;
  }

  .content-title {
    block-size: 30px;
    inline-size: 100%;
    inset-block-start: 48px;
    inset-inline-start: 0;
  }

  .content-title-body {
    gap: 8px;
  }

  .content-title-body-img {
    block-size: 30px;
    inline-size: 30px;
  }

  .content-title-body_detail {
    gap: 0;
  }

  .content-title-body_detail h2 {
    color: var(--primary-blue, #005baa);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-transform: uppercase;
  }

  .content-title-body_detail p {
    color: var(--primary-orange, #f05a22);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }

  .content-body {
    position: absolute;
    grid-template-columns: 1fr;
    inset-block-start: 115px;
  }

  .content-body-item-detail {
    block-size: 320px;
    inline-size: 290px;
    margin-block: 0;
    margin-inline: auto;
  }

  .content-body-item-detail .header {
    padding: 10px;
    font-size: 17px;
  }

  .content-body-item .detail {
    block-size: 320px;
    inline-size: 290px;
    margin-block: 0;
    margin-inline: auto;
  }

  .content-body-item .detail h2 {
    font-size: 17px;
    padding-block: 10px;
    padding-inline: 0;
  }

  .content-body-item .detail .divider {
    margin-block-start: 2px;
  }

  .content-body-item .detail .divider .divider-list {
    inline-size: 220px;
    margin-block-start: 23px;
  }

  .content-body-item .detail .detail-list {
    overflow: hidden;
    font-size: 16px;
    inline-size: 270px;
    min-block-size: 270px;
  }

  .content-body-item:last-child .detail .bonus-extra {
    inline-size: 245px;
    inset-block-start: 240px;
    inset-inline-start: 24px;
  }

  .content-body-item .detail-list ul {
    font-size: 16px;
    margin-inline-start: 35px;
  }

  .content-body-item:first-child svg,
  .content-body-item:nth-child(2) svg,
  .content-body-item:nth-child(5) svg,
  .content-body-item:last-child .svg-lastchild {
    block-size: 50px;
    inline-size: 50px;
  }

  .content-body-item:first-child svg {
    inset-block-start: -22px;
    inset-inline-start: 0;
  }

  .content-body-item:nth-child(2) svg {
    inset-block-start: -15px;
    inset-inline-end: 0;
  }

  .content-body-item:nth-child(5) svg {
    inset-block-start: -25px;
  }

  .content-body-item:last-child .svg-lastchild {
    inset-block-start: -25px;
  }

  .content-body-item:last-child .detail h2 svg {
    inset-block-start: 10px;
  }

  .footer-body .footer-item {
    padding-block: 12px;
    padding-inline: 20px;
  }

  .footer-body .footer-item .img-plate {
    inline-size: 40px;
  }

  .footer-body .footer-item .footer-item-body .title p {
    font-size: 12px;
  }

  .footer-body .footer-item .footer-item-body .footer-item-body-date p {
    font-size: 12px;
  }

  .detail-list {
    :deep(ul) {
      li::after {
        display: block;
        content: "";
        inline-size: 210px;
      }
    }
  }
}
</style>
