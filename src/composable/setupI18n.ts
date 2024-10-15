import { getPropertyName } from "@/@core/utils/formatters";
import { ICaiDatChiTiet, ICaiDatTongThe, IPageSetup } from "@/models/responseModels/pageSetup.model";
import { v4 as uuidv4 } from 'uuid';
export const useSetupLocalI18n = (scope: string) => {
  
  const messages = {
    vi: {},
    en: {},
  };
  
  const i18n = useI18n({
    useScope: scope || 'local',
    messages: messages
  });
  
  const setupMessageForRegularPageConfig = (config: IPageSetup) => {
    config.caiDatTongThe.forEach((parent: ICaiDatTongThe) => {
      setMessage(parent, getPropertyName(() => parent.tieuDe), getPropertyName(() => parent.tieuDeTiengAnh))
      setMessage(parent, getPropertyName(() => parent.mota), getPropertyName(() => parent.motaTiengAnh))
      if (parent.caiDatChiTiet) {
        parent.caiDatChiTiet.forEach((child: ICaiDatChiTiet) => {
          setMessage(child, getPropertyName(() => child.tieuDe), getPropertyName(() => child.tieuDeTiengAnh))
          setMessage(child, getPropertyName(() => child.moTa), getPropertyName(() => child.moTaTiengAnh))
        })
      }
    })
  }

  const setMessage = (parent: any, propertyViName: string, propertyEnName: string): void => {
    const id = uuidv4()
    if (parent[propertyViName] || parent[propertyEnName]) {
      messages.vi[id] = parent[propertyViName] || null
      messages.en[id] = parent[propertyEnName] || null
      parent[propertyViName] = id
    }
  }
  
  const setMessageI18n = (tiengViet: string, tiengAnh: string): string => {
    const id = uuidv4()
    messages.vi[id] = tiengViet || null;
    messages.en[id] = tiengAnh || null;
    return id
  }
  
  return { 
    ...i18n,
    // messages, 
    setMessageI18n, 
    setupMessageForRegularPageConfig,
  }
  
}
