import { DanhSachTrangTinh } from '@/Constants/enums'
import axios from '@axios'

const CONTROLLER_NAME = 'ThucDon'
const CONTROLLER_NAME_PAGE = 'Page'

const GetTongQuan = async () => {
  const res = await axios.get(`${CONTROLLER_NAME_PAGE}/Get/${DanhSachTrangTinh.ThucDon}`)

  return res.data
}

const GetAll = async (params: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetPagedThucDon`, { params })

  return res.data
}

const GetChiTiet = async (id: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetById?id=${id}`)

  return res.data
}

const GetRelatedPage = async (date: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetRelatedThucDon?startTime=${date}`)

  return res.data
}

const BanTruService = {
  GetAll,
  GetChiTiet,
  GetTongQuan,
  GetRelatedPage,
}

export default BanTruService
