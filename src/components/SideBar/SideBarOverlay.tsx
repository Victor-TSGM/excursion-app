import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBarOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faStar as faFilledStar } from '@fortawesome/free-solid-svg-icons'
import './SideBarButton.css'
import { MenuItem } from '../../../domain/models/menu-item'
import { MenuItemGroup } from '../../../domain/models/menu-item-group'
import { IFavoriteService } from '../../../domain/interfaces/IFavoriteService'
import { FavoriteViewModel } from '../../../domain/models'
import { useAccountManager } from '../../../main/hooks/useAccountManager'
import { faStar } from '@fortawesome/free-regular-svg-icons'
export interface SideBarOverlayProps {
  title: string
  isOpen: boolean
  onNavigate: (categoryId?: number) => void
  onClose: () => void
  items: MenuItem[]
  itemGroups?: MenuItemGroup[]
  refreshFavorites: () => Promise<void>
  favIdArray: number[]
  favService: IFavoriteService
  useFavorite?: boolean
};

export const SideBarOverlay = (props: SideBarOverlayProps): JSX.Element => {
  const [selectedGroup, setSelectedGroup] = React.useState<MenuItemGroup>()
  const [selectedGroupItems, setSelectedGroupItems] = React.useState<MenuItem[]>([])
  const hasItemGroups = props.itemGroups && props.itemGroups.length > 0
  const userId = useAccountManager().accountService.getLoggedUserId()

  const isFavorite = (itemId: number): boolean => {
    return props.favIdArray.find(f => f === itemId) >= 0
  }

  const onGroupSelected = (group: MenuItemGroup): void => {
    setSelectedGroup(group)
    setSelectedGroupItems(props.items.filter(i => i.groupId === group.id))
  }

  const onToggle = async (itemId: number): Promise<void> => {
    const favSelected: FavoriteViewModel = { userId, privilegeId: itemId, id: 0 }
    await props.favService.Toggle(favSelected)
    await props.refreshFavorites()
  }

  const onClickLink = (e: any, item: MenuItem): void => {
    if (!item.allowed) {
      e.preventDefault()
      return
    }
    props.onNavigate(item.categoryId)
  }

  const ItemsTiles = (): JSX.Element => (
    <div className='only-tiles items-section'>
      {(hasItemGroups ? selectedGroupItems : props.items)?.map((l: MenuItem) =>
        <div key={l.privilegeId} className={'fs-sidebar-overlay-tile ' + (l.allowed ? '' : ' fs-sidebar-overlay-disabled-button')} >
          <NavLink className="fs-sidebar-overlay-link" key={l.text} to={l.url} onClick={(e: any) => onClickLink(e, l)}>
            {l.text}
          </NavLink>
          {(props.useFavorite && l.allowed) &&
            <div className={`fs-sidebar-overlay-favbutton ${isFavorite(l.privilegeId) ? 'fs-favselected' : ''}`}>
              <FontAwesomeIcon icon={isFavorite(l.privilegeId) ? faFilledStar : faStar}
                onClick={async () => await onToggle(l.privilegeId)} />
            </div>}
        </div>)}
    </div>
  )

  return (
    <div className={`fs-sidebar-overlay ${props.isOpen ? 'fs-sidebar-overlay-open' : ''}`}>
      <div className={`fs-sidebar-overlay-header ${props.isOpen ? 'fs-sidebar-overlay-header-open' : ''}`}>
        <button className="fs-sidebar-overlay-header-close ml-3" onClick={() => props.onClose()}>
          <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
        </button>
        <div>
          {props.title}
        </div>
      </div>
      {hasItemGroups
        ? <div className='overlay-items'>
          <div className='items-groups-section '>
            {props.itemGroups.map((itemGroup) => (
              <div key={itemGroup.id} className={'item-group' + (selectedGroup?.id === itemGroup.id ? ' group-selected' : '')}
                onClick={() => onGroupSelected(itemGroup)}>
                <span className='group-icon'>
                  <FontAwesomeIcon icon={itemGroup.icon} />
                </span>

                <span>{itemGroup.text}</span>
              </div>
            ))}
          </div>
          {ItemsTiles()}
        </div>
        : <div>
          {ItemsTiles()}
        </div>}
    </div>
  )
}