<script setup lang="ts">
import type { HocPhi } from './hocphi.type'

const props = defineProps<{
  data: HocPhi[]
}>()
</script>

<template>
  <table class="thoi-gian-bieu">
    <thead>
      <tr>
        <th>Mô hình lớp</th>
        <th>Lớp</th>
        <th>Học phí/Chương trình học (VNĐ)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item) in props.data"
        :key="item.MoHinhLop"
      >
        <td class="time">
          {{ item.MoHinhLop }}
        </td>

        <td>
          <span>{{ item.Lop }}</span>
        </td>

        <td><span>{{ item.HocPhi }}’</span></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
$border-color: rgb(255, 159, 67);
$border-color-in-table: #DBDADE;
$border-radius: 8px;

table.thoi-gian-bieu {
  border-spacing: 0 0;
  width: 100%;

  // setting border
  thead, tbody {
    tr {

      /** set border cho tbody **/
      &:first-child td {
        border-top: 1px solid $border-color;
      }

      &:last-child td, .ca-hoc {
        border-bottom: 1px solid $border-color;
      }

      td:first-child {
        border-left: 1px solid $border-color;
        padding: 7px 20px;
      }

      td:last-child {
        border-right: 1px solid $border-color;
      }

      .ca-hoc {
        border-left: 1px solid $border-color;
      }

      /** set border-radius **/
      &:first-child {
        th, td {
          &:first-child {
            border-top-left-radius: $border-radius;
          }

          &:last-child {
            border-top-right-radius: $border-radius;
          }

          &.ca-hoc {
            border-bottom-left-radius: $border-radius;
          }
        }
      }

      &:last-child {
        th, td {

          &:last-child {
            border-bottom-right-radius: $border-radius;
          }
        }
      }
    }
  }

  // style cho tung cot
  .ca-hoc {
    width: 60px;
  }

  thead {
    th {
      padding: 16px 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: left;
      color: #fff !important;
      background: rgb(255, 159, 67);
    }
  }

  tbody {
    td {
      padding: 7px 0;
      border-bottom: 1px solid $border-color-in-table;

      &.ca-hoc {
        border-right: 1px solid $border-color-in-table;
        background: #EEF5FF;

        span {
          display: block;
          color: #6D768F !important;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          text-align: center;
          padding: 0 15px !important;
        }

      }

      > span {
        display: block;
        padding: 7px 20px;
      }

      &.tiet-nghi > span {
        border-radius: 6px;
        background: #FBEFEC;
      }
    }
  }

  tbody:before {
    content: "-";
    display: block;
    line-height: 10px;
    color: transparent;
  }
}

.dash {
  margin: 0 2px;
}

@media only screen and (max-width: 500px) {
  .dash {
    display: none;
  }
}
</style>
