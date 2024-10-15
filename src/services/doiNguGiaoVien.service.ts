import axios from '@axios'

// import fakedata from '@/pages/fake-data/fakedata'

const CONTROLLER_NAME = 'NhanVien'

const GetNhanVienPagination = async (params: any) => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetPagedNhanVien`, { params })

    return res.data
  }
  catch {
    // return fakedata.teacher
  }
}

const DoiNguGiaoVien = {
  GetNhanVienPagination,
}

export default DoiNguGiaoVien
