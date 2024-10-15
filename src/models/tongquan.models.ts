export interface TongQuanModel {
  caiDatTongThe: CaiDatTongThe[]
  id: number
  tenTrang: string
}

export interface CaiDatTongThe {
  caiDatChiTiet: CaiDatChiTiet[]
  fileId: number
  id: number
  link: string
  linkAnh: string
  mota: string
  motaTiengAnh: string
  tieuDe: string
  tieuDeTiengAnh: string
  trang: Trang[]
  trangId: number
}

export interface CaiDatChiTiet {
  caiDatTongThe: any
  caiDatTongTheId: number
  icon: string
  id: number
  link: string
  linkAnh: string
  moTa: string
  moTaTiengAnh: string
  tieuDe: string
  tieuDeTiengAnh: string
}

export interface Trang {
  caiDatTongThe: any
  id: number
  isDeleted: boolean
  tenTrang: string
}
