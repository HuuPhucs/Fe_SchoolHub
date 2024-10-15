import axios from '@axios'
import { IPhongBanResModel } from '../models/responseModels/phongBan.model'

const CONTROLLER_NAME = 'PhongBan'

const getAll = async (): Promise<IPhongBanResModel[]> => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAll`)

  return res.data
}

const getAllCoTheLienLac = async (): Promise<IPhongBanResModel[]> => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAllPhongBanCoTheLienLac`)

  return res.data
}

const PhongBanService = {
  getAll,
  getAllCoTheLienLac,
}

export default PhongBanService
