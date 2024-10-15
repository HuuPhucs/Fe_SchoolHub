import axios from "@axios";

const CONTROLLER_NAME = "HocPhi";

const getHocPhiByNamHoc = async () => {
    const res =  await axios.get(`${CONTROLLER_NAME}/GetByNamHocId/1`); 
    return res.data;
}

const HocPhiService = {
    getHocPhiByNamHoc,
};

export default HocPhiService;