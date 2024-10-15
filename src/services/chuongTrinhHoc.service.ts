import { DanhSachTrangTinh } from '@/Constants/enums'
import axios from '@axios'

const CONTROLLER_NAME = 'Page'
const PageChuongTrinhHocId = DanhSachTrangTinh.ChuongTrinhHoc
const PageCauLacBoId = 8

const getPageChuongTrinhHoc = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/Get/${PageChuongTrinhHocId}`)

  return res.data
}

const getPageCauLacBo = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/Get/${DanhSachTrangTinh.CauLacBo}`)

  return res.data
}

const ChuongTrinhHocService = {
  getPageChuongTrinhHoc,
  getPageCauLacBo,
}

export default ChuongTrinhHocService
