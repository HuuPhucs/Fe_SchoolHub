import { DanhSachTrangTinh } from '@/Constants/enums';
import axios from '@axios';

const CONTROLLER_NAME = 'Page';

const getPageCoSoVatChat = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/Get/${DanhSachTrangTinh.CoSoVatChat}`)

  return res.data
}

const CoSoVatChatService = {
  getPageCoSoVatChat,
}

export default CoSoVatChatService
