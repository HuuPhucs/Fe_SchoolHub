import type { DanhSachTrangTinh } from '@/Constants/enums'
import axios from '@axios'
import {IPageSetup} from "@/models/responseModels/pageSetup.model";

const CONTROLLER_NAME = 'Page'
const getPageConfig = async (pageId: DanhSachTrangTinh): Promise<IPageSetup> => {
  let res = await axios.get(`${CONTROLLER_NAME}/Get/${pageId}`)
  return res.data
}

const PageConfigService = {
  getPageConfig,
}

export default PageConfigService
