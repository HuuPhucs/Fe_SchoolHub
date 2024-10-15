import { HttpStatusCode } from 'axios'
import { DanhSachTrangTinh } from '@/Constants/enums'
import type { GocTruyenThongModel } from '@/models/gioithieu.models'
import axios from '@axios'

const CONTROLLER_NAME = 'GocTruyenThong'
const CONTROLLER_NAME_PAGE = 'Page'

const GetAll = async (): Promise<GocTruyenThongModel[]> => {
  let data: GocTruyenThongModel[] = []
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetAll`)
    if (res.status === HttpStatusCode.Ok)
      data = res.data

    else
      throw new Error('Không tìm thấy dữ liệu')
  }
  catch (error) {
    console.error('Không tìm thấy dữ liệu', error)
  }
  finally {
    // eslint-disable-next-line no-unsafe-finally
    return data
  }
}

const GetTinTucSuKien = async () => {
  const res = await axios.get(`${CONTROLLER_NAME_PAGE}/Get/${DanhSachTrangTinh.TinTucSuKien}`)

  return res.data
}

const GetSuKienTruyenThongNoiBat = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetSuKienTruyenThongNoiBat`)
  return res.data
}

const GocTruyenThongService = {
  GetAll,
  GetTinTucSuKien,
  GetSuKienTruyenThongNoiBat,
}

export default GocTruyenThongService
