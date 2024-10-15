import { DanhSachTrangTinh } from '@/Constants/enums';
import axios from '@axios';

const CONTROLLER_NAME = 'Page'
const CONTROLLER_NAME1 = 'CoSoVatChat'

const GetCoSoVatChat = async () => {
  const res = await axios.get((`${CONTROLLER_NAME1}/GetAllLandingPage`))
  return res.data
}

const GetVideoTrangChu = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/Video`)
  return res.data
}

const getTrangchu = async () => {
  let trangChu: any;
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/Get/${DanhSachTrangTinh.TrangChu}`)
    if (res.data && res) {
      trangChu = res.data;
    }
  } catch (e) {
    console.error(
      "An unexpected error occurred attempting to retrieve the Trang Chu data.",
      e
    );
  }
  return trangChu;
}

const CONTROLLER_NAME2 = 'TinTuc'

const GetTinTucById = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME2}/GetById/${id}`)
  return res.data
}

const TrangChuService = {
  GetVideoTrangChu,
  getTrangchu,
  GetTinTucById,
  GetCoSoVatChat,
}
export default TrangChuService
