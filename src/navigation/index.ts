import MenuService from "@/services/menu.service";
import LocalStorageContants from "@/Constants/localStorage.contants";

export default async () => {
  const res = await MenuService.GetAll();
  if (res) {
    localStorage.setItem(LocalStorageContants.MENU_CONFIGS, JSON.stringify(res.flatMap(flatMenuConfig)));
    return res.map(convertMenuToNavObject);
  }
  return [];
};

const flatMenuConfig:any = (x: any) => {
  if(x.children && x.children.length)
    return [x, ...x.children.flatMap(flatMenuConfig)];
  else
    return x;
}

const convertMenuToNavObject = (x: any) => {
  let item = {} as any;
  item.title = x.name;
  if (x.url) {
    item.to = {path: x.url}
  }

  if (x.children && x.children.length) {
    item.children = x.children.map((c: any) => convertMenuToNavObject(c));
  }
  return item;
}
