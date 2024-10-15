<script setup lang="ts">
import type { IThoiGianBieu } from './types'

const props = defineProps<{
  listRender: {
    tenCa: string
    data: IThoiGianBieu[]
  }[]
}>()
</script>

<template>
  <table class="thoi-gian-bieu">
    <thead>
      <tr>
        <th class="ca-hoc" />
        <th>thời gian</th>
        <th>tiết</th>
        <th>thời lượng</th>
      </tr>
    </thead>
    <!--  </table> -->

    <!--  <table class="thoi-gian-bieu" v-for="(caHoc, index) in props.listRender" :key="index"> -->
    <tbody
      v-for="(caHoc, index) in props.listRender"
      :key="index"
      class="thoi-gian-bieu"
    >
      <tr
        v-for="(item, index) in caHoc.data"
        :key="item.tenTiet"
      >
        <td
          v-if="index === 0"
          :rowspan="caHoc.data.length"
          class="ca-hoc"
        >
          <span>{{ caHoc.tenCa }}</span>
        </td>

        <td class="time" v-if="item.thoiGianBatDau === item.thoiGianKetThuc">
          <span>{{ item.thoiGianBatDau }}</span>
        </td>
        <td class="time" v-else>
          <span>{{ item.thoiGianBatDau }} <span class="dash">-</span> {{ item.thoiGianKetThuc }}</span>
        </td>

        <td :class="item.tenTiet.match('Tiết') ? 'tiet-hoc' : 'tiet-nghi'">
          <span>{{ item.tenTiet }}</span>
        </td>

        <td><span>{{ item.thoiLuong }}’</span></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
$border-color: #005baa;
$border-color-in-table: #dbdade;
$border-radius: 8px;

table.thoi-gian-bieu {
  border-spacing: 0 0;
  inline-size: 100%;

  // setting border
  thead,
  tbody {
    tr {
      /** set border cho tbody **/
      &:first-child td {
        border-block-start: 1px solid $border-color;
      }

      &:last-child td,
      .ca-hoc {
        border-block-end: 1px solid $border-color;
      }

      td:last-child {
        border-inline-end: 1px solid $border-color;
      }

      .ca-hoc {
        border-inline-start: 1px solid $border-color;
      }

      /** set border-radius **/
      &:first-child {
        th,
        td {
          &:first-child {
            border-start-start-radius: $border-radius;
          }

          &:last-child {
            border-start-end-radius: $border-radius;
          }

          &.ca-hoc {
            border-end-start-radius: $border-radius;
          }
        }
      }

      &:last-child {
        th,
        td {
          &:last-child {
            border-end-end-radius: $border-radius;
          }
        }
      }
    }
  }

  // style cho tung cot
  .ca-hoc {
    inline-size: 60px;
  }

  thead {
    th {
      background: #005baa;
      color: #fff !important;
      font-style: normal;
      font-weight: 600;
      letter-spacing: 1px;
      line-height: normal;
      padding-block: 16px;
      padding-inline: 20px;
      text-align: start;
      text-transform: uppercase;
    }
  }

  tbody {
    td {
      border-block-end: 1px solid $border-color-in-table;
      padding-block: 7px;
      padding-inline: 0;

      &.ca-hoc {
        background: #eef5ff;
        border-inline-end: 1px solid $border-color-in-table;

        span {
          display: block;
          color: #6d768f !important;
          font-size: 18px;
          font-weight: 700;
          padding-block: 0 !important;
          padding-inline: 15px !important;
          text-align: center;
          text-transform: uppercase;
          transform: rotate(180deg);
          writing-mode: vertical-lr;
          line-height: 58px;
        }
      }

      > span {
        display: block;
        padding-block: 7px;
        padding-inline: 20px;
      }

      &.tiet-nghi > span {
        border-radius: 6px;
        background: #fbefec;
      }
    }
  }

  tbody::before {
    display: block;
    color: transparent;
    content: "-";
    line-height: 10px;
  }
}

.dash {
  margin-block: 0;
  margin-inline: 2px;
}

@media only screen and (max-width: 500px) {
  .dash {
    display: none;
  }
}
</style>
