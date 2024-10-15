import axios from '@axios'

const CONTROLLER_NAME = 'Page'

const getPage = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/ThoiGianBieu`)

  return res.data
}

const ThoiGianBieuService = {
  getPage,
}

export default ThoiGianBieuService
