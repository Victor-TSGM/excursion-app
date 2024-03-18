import { MenuCategory } from '../../../domain/models'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react'
import './Sidebar.css'
import { SideBarButton } from './SideBarButton'
import { SideBarOverlay } from './SideBarOverlay'
import { useEffect, useRef, useState } from 'react'
import { useAccountManager } from '../../../main/hooks/useAccountManager'
import { useFavoritesManager } from '../../../main/hooks/useFavoritesManager'
import { useLocation, useNavigate } from 'react-router-dom'
import { useResource } from '../../../presentation/hooks/useResource'
import { ProjectDependenciesContext } from '../../../presentation/providers/ProjectDependenciesProvider'

export interface SidebarProps {
  menuItems: MenuCategory[]
  hideForbiddenItems?: boolean
  isSidebarOpen: boolean
  setSidebarOpen: any,
  useOrganization: boolean
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null)
  const accountManager = useAccountManager()
  const userId = accountManager.accountService.getLoggedUserId()
  const userPrivileges = useRef(accountManager.accountService.getLoggedUserPrivileges(props.useOrganization))
  const lastCategoryId = useRef(0)
  const [activeMenuId, setActiveMenuId] = useState<number>(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useResource('lib')
  const { dependencies } = React.useContext(ProjectDependenciesContext)

  function disableForbiddenMenuItems (allMenuItems: MenuCategory[]): MenuCategory[] {
    const newMenu = allMenuItems?.map(menuItem => {
      return {
        ...menuItem,
        allowed: isMenuItemAllowed(menuItem.privilegeId),
        items: menuItem.items?.map(item => {
          return {
            ...item,
            allowed: isMenuItemAllowed(item.privilegeId),
            categoryId: menuItem.id
          }
        })
      }
    })

    if (!props.hideForbiddenItems) return newMenu

    return newMenu?.filter(mc => mc.allowed)?.map(mc => { return { ...mc, items: mc.items.filter(i => i.allowed) } }) || []
  }

  function isMenuItemAllowed (privilegeId = 0): boolean {
    return accountManager.isUserAdmin() || privilegeId === 0 || userPrivileges.current.includes(privilegeId)
  }

  const [menuItems, setMenuItems] = useState<MenuCategory[] | null>(props.menuItems)
  const { favoritesIds, loadFavorites, favService } = useFavoritesManager(userId, setMenuItems)
  const selectedMenu = menuItems.find((m: MenuCategory) => m.id === selectedMenuId)

  useEffect(() => {
    const activeMenu = menuItems.find(m => m.id > 0 && (m.items?.map(i => i.url).includes(location.pathname) || m.url === location.pathname))
    setActiveMenuId(activeMenu?.id || 0)
    lastCategoryId.current = activeMenu?.id || 0
  }, [])

  useEffect(() => {
    if (!accountManager.username || accountManager.username.length <= 0) return
    const allowedMenus = disableForbiddenMenuItems(menuItems)
    setMenuItems(allowedMenus)
    if (dependencies.useFavoritesMenu) void loadFavorites(allowedMenus)
  }, [accountManager.username])

  const onClick = (id: number): void => {
    if (id === 0) return props.setSidebarOpen(!props.isSidebarOpen)
    if (id === selectedMenuId) {
      setActiveMenuId(lastCategoryId.current)
      return setSelectedMenuId(null)
    }

    setSelectedMenuId(id)
    setActiveMenuId(id)
  }

  const onClose = (): void => {
    setSelectedMenuId(null)
    props.setSidebarOpen(false)
    setActiveMenuId(lastCategoryId.current)
  }

  const onNavigate = (categoryId: number = selectedMenuId): void => {
    setSelectedMenuId(null)
    props.setSidebarOpen(false)
    setActiveMenuId(categoryId)
    lastCategoryId.current = categoryId
  }

  return <>
    {selectedMenuId !== null &&
      <SideBarOverlay isOpen={props.isSidebarOpen} title={t(selectedMenu.text)}
        items={props.hideForbiddenItems ? selectedMenu.items?.filter((item: any) => item.allowed) : selectedMenu.items}
        itemGroups={selectedMenu.itemGroups || []}
        onClose={onClose} onNavigate={onNavigate}
        refreshFavorites={async () => dependencies.useFavoritesMenu && await loadFavorites(menuItems)}
        favIdArray={favoritesIds} useFavorite={dependencies.useFavoritesMenu}
        favService={favService}
      />
    }

    <div className={['fs-side-bar', props.isSidebarOpen ? 'fs-sidebar-open' : ''].join(' ')}>
      <SideBarButton
        key={'side-bar-hamburger'}
        onClick={onClick}
        category={{
          id: 0,
          icon: faBars,
          text: t('common.menu'),
          allowed: true
        }}
        isSelected={false}
        isOpen={props.isSidebarOpen}
        onNavigate={onNavigate}
        isActive={false}
      />

      {menuItems?.map((category: MenuCategory): JSX.Element => <SideBarButton
        key={'side-bar-' + category.id.toString()}
        onClick={onClick}
        category={category}
        isSelected={category.id === selectedMenuId}
        isOpen={props.isSidebarOpen}
        onNavigate={onNavigate}
        isActive={activeMenuId === category.id}
      />)}
    </div>
  </>
}