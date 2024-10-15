import { IYeuCauLienHe } from '@/pages/lien-he/types';
import axios from '@axios';

const CONTROLLER_NAME = 'YeuCauLienHe'

const createYeuCauLienHe = async (YeuCauLienHe: IYeuCauLienHe) => {
  await axios.post(`${CONTROLLER_NAME}/Create`, YeuCauLienHe);
}

const YeuCauLienHeService = {
    createYeuCauLienHe,
}

export default YeuCauLienHeService
