import type { LoaiPhongBan } from "@/Constants/enums";
import axios from "@axios";

const CONTROLLER_NAME = "NhanVien";

const getNhanVienByLoaiPhongBan = async (loaiPhongBan: LoaiPhongBan) => {
  const res = await axios.get(
    `${CONTROLLER_NAME}/GetNhanVienByLoaiPhongBan/${loaiPhongBan}`
  );
  return res.data;
};
const getChuyenVienTamLy = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetChuyenVienTamLy?isDisplay=true`);
  return res.data;
};

const getNhanVienByLoaiPhongBanActive = async (loaiPhongBan: LoaiPhongBan) => {
  const res = await axios.get(
    `${CONTROLLER_NAME}/GetNhanVienByLoaiPhongBanActive/${loaiPhongBan}`
  );
  return res.data;
};
const NhanVienService = {
  getNhanVienByLoaiPhongBan,
  getChuyenVienTamLy,
  getNhanVienByLoaiPhongBanActive
};

export default NhanVienService;
