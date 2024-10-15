import axios from '@axios'

const CONTROLLER_NAME = 'Page'

const getAll = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/Get/1`)

  return res.data
}

const tongQuan = {
  getAll,
}

export default tongQuan
