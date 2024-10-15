import axios from '@axios'

const CONTROLLER_NAME = 'BoPhanLienHe'

const getAllAvailable = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAllAvailable`)

  return res.data
}

const BoPhanLienHeService = {
  getAllAvailable,
}

export default BoPhanLienHeService
