<script lang="ts" setup>
import moment from 'moment'
import {onBeforeMount, ref} from 'vue'
import type {ILichSuKien} from './types'
import {Calendar} from 'v-calendar';
import {PageAddress} from "v-calendar/dist/types/src/utils/page";
import {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute";
import {ContentConfig, HighlightConfig} from "v-calendar/dist/types/src/utils/glyph";
import {DateRangeSource} from "v-calendar/dist/types/src/utils/date/range";


const props = defineProps<{
  year: number
  month: number
  dataCalender: ILichSuKien[]
}>()

const styleDate = (color: string[]) => ({
  backgroundColor: `${color[0]}!important`,
  borderRadius: '30px',
  color: '#fff!important',
  background: color.length > 1 && `linear-gradient( -45deg, ${color[1]}, ${color[1]} 50.0%, ${color[0]} 50% )`,
})

const initPage = ref<PageAddress>({
  month: props.month,
  year: props.year
})

const suKien = ref<any>()
const listDate = ref<ILichSuKien[]>([])
const suKienChiTiet = ref<any[]>([])

const vcAttribute = ref<AttributeConfig[]>([]);
vcAttribute.value = props.dataCalender.map(x => {
  return {
    popover: {
      visibility: "hover",
      label: x.tenSuKien,
      hideIndicator: true,

    },
    highlight: {
      style: {
        backgroundColor: x.color
      }
    } as HighlightConfig,
    content: {
      style: {
        color: "#fff",
        fontWeight: "500"
      }
    } as ContentConfig,
    dates: {
      start: new Date(x.ngayBatDau),
      end: new Date(x.ngayKetThuc),
    } as DateRangeSource
  } as AttributeConfig
})

const marks = ref({
  title: "MMMM",
  dayPopover: "Ngày DD/MM/YYYY"
});

onBeforeMount(() => {
  listDate.value = props.dataCalender

  const time = new Date(`${props.year}/${props.month}/01`)
  const dateStart = moment(time).subtract(3, 'days')

  suKien.value = listDate.value.filter(item => {
    const monthStart = new Date(item.ngayBatDau).getMonth()
    const monthEnd = new Date(item.ngayKetThuc).getMonth()
    const year = new Date(item.ngayBatDau).getFullYear()

    if ((monthStart === props.month - 1 || monthEnd === props.month - 1) && year === props.year)
      return true
  }).map(i => {
    const dateFirst = moment(i.ngayBatDau, 'YYYY/MM/DD').format('DD/MM')
    const dateEnd = moment(i.ngayKetThuc, 'YYYY/MM/DD').format('DD/MM')

    return {
      ...i,
      ngayBatDau: dateFirst,
      ngayKetThuc: dateEnd,
      ngay: dateFirst === dateEnd && dateFirst,
    }
  })

  for (let i = 0; i < 42; i++) {
    const color: string[] = []
    const result = dateStart.add(1, 'days')
    const isClass = result.date() > i || result.date() < i - 28

    for (const item of listDate.value) {
      const ngayBatDau = moment(new Date(item.ngayBatDau)).diff(result)
      const ngayKetThuc = moment(new Date(item.ngayKetThuc)).diff(result)

      if (ngayBatDau <= 0 && ngayKetThuc >= 0)
        color.push(item.color)
    }

    suKienChiTiet.value.push({
      value: result.format('DD-MM-YYYY'),
      text: result.format('D'),
      style: (!isClass && color.length > 0) ? styleDate(color) : {},
      class: isClass ? ' date-text text-muted' : ' date-text ',
    })
  }
})
</script>

<template>
  <div class="calendar">
    <div class="month-block">
      <div class="month">
        Tháng {{ props.month }}
      </div>
    </div>

    <div class="body">
      <Calendar :attributes='vcAttribute'
                :disable-page-swipe="true"
                :initial-page="initPage"
                :masks="marks"
                expanded
                locale="vi-VN"
      >
      </Calendar>
    </div>

    <div class="content-block" role="button">
      <div class="content-wrapper">
        <div
          v-for="(item, index) in suKien?.slice(0, 3)"
          :key="index"
          class="text-block"
        >
          <p class="label-wrapper">
            <span class="label-date">{{ item.ngay || `${item.ngayBatDau}-${item.ngayKetThuc}` }}: </span>
            <span class="label"> {{ item.tenSuKien }}</span>
          </p>
        </div>
      </div>

      <div v-if="suKien.length > 0" class="content">
        <div class="title">
          Tháng {{ props.month }}
        </div>
        <div class="text-block">
          <div
            v-for="(item, index) in suKien"
            :key="index"
            class=""
          >
            <p class="label-wrapper">
              <span class="label-date">{{ item.ngay || `${item.ngayBatDau}-${item.ngayKetThuc}` }}: </span>
              <span class="label"> {{ item.tenSuKien }}</span>
            </p>
          </div>
        </div>
        <div class="arrow"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.vc-header) {
  display: none;
}

.body {
  border-radius: 6px;
  margin: 5px 0;
}

.calendar {
  width: 285px !important;
}

.month-block {
  padding: 4px;
  border-radius: 6px;
  background-color: #005baa;
}

.month {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  display: block;
}

/* sdad */
.content {
  border-radius: 2px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: 20px;
  left: -10px;
  background: #fff;
  min-height: 100px;
  opacity: 0;
  visibility: hidden;
  min-width: 285px;
  z-index: 1001;

  .title {
    background: #F1F0F2;
    color: rgba(0, 0, 0, 0.85);
    padding: 0 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
  }

  .text-block {
    padding: 0 10px;
    margin: 10px 0;
  }

  .text-block .label-wrapper {
    width: 260px;
    white-space: wrap;
    overflow: unset;
    text-overflow: unset;
    font-size: 12px !important;
    font-family: Roboto;

    .label-date {
      font-size: 12px !important;
    }

    .label {
      font-size: 12px !important;
    }

  }

  .arrow {
    position: absolute;
    padding: 7px;
    left: 230px;
    bottom: -7px;
    width: 0;
    background: #fff;
    rotate: 45deg;
    color: #000000d9;
  }
}

/* sdad */
.content-block {
  height: 62px;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: #eef5ff;
  position: relative;
}

.content-block:hover {

  .content {
    visibility: visible;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }

}

.label-wrapper {
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-block-end: 0;
}

.label-date {
  color: #191b25;
  font-size: 11px;
  line-height: 18px;
  font-weight: 700;
}

.label {
  color: #191b25;
  font-size: 11px;
  line-height: 18px;
}

.text-block {
  margin-top: 0;

}
</style>
