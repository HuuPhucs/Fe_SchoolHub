import axios from '@axios'

const CONTROLLER_NAME = 'Page'

const getTrang = async (id:number) => {
  const res = await axios.get(`${CONTROLLER_NAME}/Get/${id}`)
  return res.data
}

const QuyDinhNhapHoc = {
  getTrang,
}

export default QuyDinhNhapHoc
