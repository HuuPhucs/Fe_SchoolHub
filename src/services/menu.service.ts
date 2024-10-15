import type IMenuTab from '@/components/pageContent/models/menuTab.interface'
import axios from '@axios'

const CONTROLLER_NAME = 'MenuConfig'
const router = useRouter()
let menuConfig = null
let nestedMenuConfig = null

const flatMenuConfig: any = (x: any) => {
  if (x.children && x.children.length)
    return [x, ...x.children.flatMap(flatMenuConfig)]
  else
    return x
}

const GetAll = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAllMenuActive`)

  menuConfig = res.data.flatMap(flatMenuConfig)
  nestedMenuConfig = res.data

  return res.data
}

const GetMenuConfig = async () => {
  if (menuConfig === null)
    await GetAll()

  return menuConfig
}

const GetNestedMenuConfig = async () => {
  if (nestedMenuConfig === null)
    await GetAll()

  return nestedMenuConfig
}

const getTabList = async (currentRouterValue: string): Promise<IMenuTab[]> => {
  const config = await GetMenuConfig()
  const nestedConfig = await GetNestedMenuConfig()

  const currentMenu = config.find(f => f.url === currentRouterValue)
  let targetParentId = null
  if (currentMenu && currentMenu.parentId && currentMenu.parentId > 0) {
    const parentMenu = config.find(f => f.id === currentMenu.parentId)
    if (parentMenu && parentMenu.parentId && parentMenu.parentId > 0)
      targetParentId = parentMenu.parentId
    else
      targetParentId = currentMenu.parentId
  }

  if (!targetParentId)
    return null

  const rootNode = nestedConfig.find(root =>
    root.children.some(child => child.id === targetParentId) || root.id === targetParentId,
  )

  return rootNode.children.map(child => {
    return {
      title: child.name,
      path: child.url || child.children[0].url || '/',
      isActive: child.url === currentRouterValue || child.children.some(leaf => leaf.url === currentRouterValue),
    }
  })
}

const MenuService = {
  GetAll,
  GetMenuConfig,
  getTabList,
  GetNestedMenuConfig,
}

export default MenuService
