import axios from '@axios'

const CONTROLLER_NAME = 'TinTuc'

const GetAllTinTuc = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetPagedTinTuc`)

  return res.data
}

const AddTinTuc = async (data: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/AddTinTuc`, data)
}

const GetById = async id => {
  const res = await axios.get(`${CONTROLLER_NAME}/getById/${id}`)

  return res.data
}

const CONTROLLER_NAME2 = 'BinhLuan'

const GetAllBinhLuan = async (params: any) => {
  const res = await axios.get(`${CONTROLLER_NAME2}/GetPagedBinhLuan`, { params })

  return res.data
}

const GetCommentById = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME2}/GetById/${id}`)

  return res.data
}

const TinTucService = {
  GetAllTinTuc,
  GetById,
  AddTinTuc,
  GetAllBinhLuan,
  GetCommentById,
}

export default TinTucService
