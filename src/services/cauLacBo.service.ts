import axios from "@axios";
const CONTROLLER_NAME = "CauLacBo";

const getAll = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAll`);
  return res.data;
};
const getById = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetById/${id}`);
  return res.data;
};
const CauLacBoService = {
  getAll,
  getById,
};

export default CauLacBoService;
