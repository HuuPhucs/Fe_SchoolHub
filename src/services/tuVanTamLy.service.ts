import { DanhSachTrangTinh } from '@/Constants/enums'
import axios from '@axios'
const CONTROLLER_NAME_PAGE = 'Page'

const GetAll = async () => {
    const res = await axios.get(`${CONTROLLER_NAME_PAGE}/Get/${DanhSachTrangTinh.TuVanTamLy}`)
    return res.data
}
const TuVanTamLyService = {
    GetAll
};

export default TuVanTamLyService