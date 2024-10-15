import axios from "@axios";

const CONTROLLER_NAME = "Page";

const getById = async (id: number) => {
    const res =  await axios.get(`${CONTROLLER_NAME}/Get/${id}`);
    return res.data;
}

const DieuKhoanService = {
    getById
};

export default DieuKhoanService;