<script setup lang="ts">
import { formatDate } from "@/@core/utils/formatters";
import moment from "moment";

const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <VCard class="content-item">
    <div class="content-item-detail">
      <VIcon class="img-plate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="51"
          viewBox="0 0 44 51"
          fill="none"
        >
          <path
            d="M35.7191 11.6191C35.7191 7.40042 33.2849 1.01172 29.6159 1.01172C25.9468 1.01172 23.5127 7.39329 23.5127 11.6191C23.5127 15.7022 25.7255 19.0928 28.6165 19.7424L27.1032 48.0455C27.0961 48.1311 27.0961 48.2239 27.1032 48.3167C27.1746 49.7015 28.3596 50.7651 29.7444 50.6937C31.1292 50.6224 32.1928 49.4374 32.1214 48.0526L30.6081 19.7495C33.5062 19.0928 35.7191 15.7022 35.7191 11.6191Z"
            fill="#F05A22"
          />
          <path
            d="M17.8021 0.304688C17.4166 0.304688 17.1025 0.618772 17.1025 1.00424V10.7693V12.5182C17.1025 12.7966 16.8741 13.0179 16.6029 13.0179C16.3245 13.0179 16.1032 12.7966 16.1032 12.5182V1.00424C16.1032 0.618772 15.7891 0.304688 15.4036 0.304688C15.0182 0.304688 14.7041 0.618772 14.7041 1.00424V12.5182C14.7041 12.7966 14.4828 13.0179 14.2044 13.0179C13.926 13.0179 13.7048 12.7966 13.7048 12.5182V1.00424C13.7048 0.618772 13.3907 0.304688 13.0052 0.304688C12.6197 0.304688 12.3057 0.618772 12.3057 1.00424V12.5182C12.3057 12.7966 12.0844 13.0179 11.806 13.0179C11.5276 13.0179 11.3063 12.7966 11.3063 12.5182V10.2625V1.00424C11.3063 0.618772 10.9922 0.304688 10.6068 0.304688C10.2213 0.304688 9.90723 0.618772 9.90723 1.00424V10.2625V12.511V14.417C9.90723 16.9867 11.3206 19.1353 13.2122 19.6992L11.6846 48.038C11.6775 48.1236 11.6775 48.2164 11.6846 48.3092C11.756 49.694 12.941 50.7576 14.3258 50.6863C15.7106 50.6149 16.7742 49.4299 16.7028 48.0451L15.1752 19.7064C17.0669 19.1425 18.4802 16.9867 18.4802 14.4241V12.5182V10.7693V1.00424C18.5016 0.618772 18.1876 0.304688 17.8021 0.304688Z"
            fill="#F05A22"
          />
          <path
            d="M5.48929 45.0314C5.28942 45.0314 5.0967 44.9457 4.96107 44.7815C1.76315 40.8698 0 35.9301 0 30.8691C0 25.8081 1.76315 20.8685 4.96107 16.9496C5.19663 16.6569 5.63206 16.6141 5.91759 16.8568C6.21026 17.0924 6.25309 17.5278 6.01039 17.8133C3.01234 21.4824 1.35626 26.1222 1.35626 30.8691C1.35626 35.616 3.0052 40.2559 6.01039 43.9178C6.24595 44.2105 6.20312 44.6388 5.91759 44.8743C5.79624 44.9814 5.64634 45.0314 5.48929 45.0314Z"
            fill="#FAC95C"
          />
          <path
            d="M38.5107 45.0255C38.3608 45.0255 38.2038 44.9755 38.0824 44.8684C37.7897 44.6329 37.7469 44.1975 37.9896 43.9119C40.9877 40.25 42.6366 35.6173 42.6366 30.8704C42.6366 26.1235 40.9877 21.4908 37.9896 17.8217C37.754 17.5291 37.7969 17.1008 38.0895 16.8652C38.3822 16.6296 38.8105 16.6725 39.0461 16.958C42.244 20.8697 44 25.8094 44 30.8704C44 35.9314 42.2369 40.871 39.0461 44.7756C38.9033 44.9398 38.7034 45.0255 38.5107 45.0255Z"
            fill="#FAC95C"
          />
        </svg>
      </VIcon>
      <div class="content-item-body">
        <div class="title">
          <p class="title-item">
            {{ $t('Bán trú.Thực đơn tuần') }}
            {{ $d(props.data.tuNgay, { day: "numeric" }) }}
            - {{ moment(new Date(props.data.denNgay)).format("DD/MM/YYYY") }}
          </p>
        </div>
        <div class="content-item-body-date">
          <VIcon class="img-clock">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M10.417 6.54102C10.417 6.37526 10.3511 6.21628 10.2339 6.09907C10.1167 5.98186 9.95775 5.91602 9.79199 5.91602C9.62623 5.91602 9.46726 5.98186 9.35005 6.09907C9.23284 6.21628 9.16699 6.37526 9.16699 6.54102V11.1243C9.16699 11.3493 9.28699 11.556 9.48199 11.6668L12.3987 13.3335C12.5422 13.4111 12.7105 13.4295 12.8674 13.3847C13.0243 13.3399 13.1575 13.2355 13.2385 13.0938C13.3194 12.9521 13.3418 12.7843 13.3007 12.6264C13.2596 12.4684 13.1584 12.3328 13.0187 12.2485L10.417 10.7618V6.54102Z"
                fill="#8D8D8D"
              />
              <path
                d="M9.99967 1.33398C15.0622 1.33398 19.1663 5.43815 19.1663 10.5007C19.1663 15.5632 15.0622 19.6673 9.99967 19.6673C4.93717 19.6673 0.833008 15.5632 0.833008 10.5007C0.833008 5.43815 4.93717 1.33398 9.99967 1.33398ZM2.08301 10.5007C2.08301 12.6003 2.91708 14.6139 4.40175 16.0986C5.88641 17.5832 7.90004 18.4173 9.99967 18.4173C12.0993 18.4173 14.1129 17.5832 15.5976 16.0986C17.0823 14.6139 17.9163 12.6003 17.9163 10.5007C17.9163 8.40102 17.0823 6.38739 15.5976 4.90272C14.1129 3.41806 12.0993 2.58398 9.99967 2.58398C7.90004 2.58398 5.88641 3.41806 4.40175 4.90272C2.91708 6.38739 2.08301 8.40102 2.08301 10.5007Z"
                fill="#8D8D8D"
              />
            </svg>
          </VIcon>
          <p class="date">
            {{ moment(new Date(props.data.ngayTao)).format("DD/MM/YYYY") }}
          </p>
        </div>
      </div>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}

.content-item {
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  border: 1px solid var(--funtion-border-89-a-4-e-9, #89a4e9);

  .content-item-detail {
    display: flex;
    align-items: center;
    align-content: center;
    gap: 15px;

    .img-plate {
      width: 44px;
      height: 51px;
    }

    .content-item-body {
      .title {
        display: flex;
        padding: 0px 20px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        .title-item {
          color: var(--text-color-141414, #141414);
          font-size: 15px;
          font-style: normal;
          font-weight: 600;
          line-height: 140%;
          text-transform: uppercase;
        }
      }

      .title:after {
        content: "";
        display: block;
        width: 60px;
        height: 2px;
        background: var(--funtion-border-89-a-4-e-9, #89a4e9);
      }

      .content-item-body-date {
        display: flex;
        padding: 0px 20px;
        align-items: flex-start;
        gap: 10px;
        margin-top: 15px;

        .img-clock {
          width: 15px;
          height: 15px;
        }

        .date {
          color: #8d8d8d;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 140%;
          /* 21px */
          text-transform: uppercase;
        }
      }
    }
  }
}

.content-item:hover {
  background-color: var(--primary-blue, #005baa) !important;
  cursor: pointer;

  svg path {
    fill: white;
    fill-opacity: 1;
  }
  .title {
    .title-item {
      color: var(--primary-ffffff, #fff) !important;
    }
  }
}
.v-pagination__item .v-pagination__item--is-active {
  background-color: red !important;
}

.content-item:hover .date {
  color: var(--primary-ffffff, #fff) !important;
}
</style>
