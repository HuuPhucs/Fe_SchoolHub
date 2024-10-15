import { TrangThaiBaiViet } from '@/Constants/tinTuc.constants'
import { TrangThaiTinTuc } from '@/Constants/tinTuc.constants'
import axios from '@axios'

const CONTROLLER_NAME = 'Page'
const CONTROLLER_NAME_TINTUC = 'TinTuc'
const CONTROLLER_NAME_BINHLUAN = 'BinhLuan'

const GetAll = async (params: any) => {
  params.TrangThai = TrangThaiTinTuc.DaDang

  const res = await axios.get(`${CONTROLLER_NAME_TINTUC}/GetPagedTinTuc`, { params })

  return res.data
}
const GetTinTucActive = async (params: any) => {
  params.TrangThai = TrangThaiTinTuc.DaDang

  const res = await axios.get(`${CONTROLLER_NAME_TINTUC}/GetPagedTinTucActive`, { params })

  return res.data
}

const GetAllTinTuyenThong = async (params: any) => {
  params.trangThai = TrangThaiBaiViet.DaDang

  const res = await axios.get(`${CONTROLLER_NAME_TINTUC}/GetPagedTinTruyenThong`, { params })

  return res.data
}

const GetAllVideo = async (params: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/Video`, { params })

  return res.data
}

const GetCommentById = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME_BINHLUAN}/GetPagedBinhLuan/`, { params: { TinTucId: id } })

  return res.data
}

const GetPagedBinhLuanActive = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME_BINHLUAN}/GetPagedBinhLuanActive?TinTucId=${id}`)

  return res.data
}

const ThemBinhLuan = async (data: any) => {
  const res = await axios.post(`${CONTROLLER_NAME_BINHLUAN}/AddBinhLuan`,  data )

  return res.data
}

const TinTucService = {
  GetTinTucActive,
  GetAllVideo,
  GetCommentById,
  GetAllTinTuyenThong,
  ThemBinhLuan,
  GetPagedBinhLuanActive,
  GetAll,
}

export default TinTucService
