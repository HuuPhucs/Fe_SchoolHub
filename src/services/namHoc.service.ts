import axios from "@axios";

const CONTROLLER_NAME = "NamHoc";

const getNamHocById = async (id: number) => {
    const res =  await axios.get(`${CONTROLLER_NAME}/GetNamHocById?id=${id}`); 
    return res.data;
}

const NamHocService = {
    getNamHocById,
};

export default NamHocService;