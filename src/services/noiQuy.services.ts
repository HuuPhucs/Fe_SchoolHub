import axios from "@axios";

const CONTROLLER_NAME = 'Page'
const PageNoiQuyId = 9

   const getPageNoiQuy = async () => {
    const res = await axios.get(`${CONTROLLER_NAME}/Get/`+PageNoiQuyId)
    return res.data
  }
  
  const ChuongTrinhHocService = {
    getPageNoiQuy,
  }
  export default ChuongTrinhHocService
  