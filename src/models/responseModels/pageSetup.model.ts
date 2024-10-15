import {ex} from "@fullcalendar/core/internal-common";

export interface  IPageSetup {
  tenTrang: string,
  caiDatTongThe: ICaiDatTongThe[] 
}

export interface ICaiDatTongThe {
  id: number,
  trangId: number,
  tieuDe?: string,
  tieuDeTiengAnh?: string,
  mota?: string,
  motaTiengAnh?: string,
  link?: string
  fileId?: number,
  caiDatChiTiet?: ICaiDatChiTiet[]
}

export interface ICaiDatChiTiet {
  id: number,
  caiDatTongTheId: number,
  fileId?: number,
  tieuDe?: string,
  tieuDeTiengAnh?: string,
  moTa?: string,
  moTaTiengAnh?: string,
  link?: string,
  icon?: string,
  linkAnh?: string,
  file?: any
}
