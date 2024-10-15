import axios from "@axios";

const CONTROLLER_NAME = "ThongTinTruong";

const getFooter = async () => {
    const res =  await axios.get(`${CONTROLLER_NAME}/GetFooter`); 
    return res.data;
}

const FooterService = {
    getFooter,
};

export default FooterService;