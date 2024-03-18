import { MenuCategory } from '../../../domain/models/menu-category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBarButton.css'

export interface SideBarButtonProps {
  category: MenuCategory
  onClick: (args: number) => void
  onNavigate: (args: number) => void
  isSelected: boolean
  isOpen: boolean
  isActive: boolean
};

export const SideBarButton = (props: SideBarButtonProps): JSX.Element => {
  const category = props.category
  const sidebarBtnClass = 'fs-sidebar-button' + ((props.isSelected || props.isActive) ? ' selected' : '') + (!category.allowed ? ' not-allowed' : '')

  const ButtonContent = (): JSX.Element => {
    let cssClass = ''
    if (props.isOpen) cssClass += ' w-100'
    if (props.isSelected) cssClass += ' menu-item-selected'

    return (<div className={'menu-item' + cssClass}>
      <span className='fs-menu-icon'>
        <FontAwesomeIcon icon={category.icon} />
      </span>
      {props.isOpen && <div className='m-2'> {category.text} </div>}
    </div>)
  }

  return <>
    {
      category.url !== undefined && category.allowed
        ? <button className={sidebarBtnClass} onClick={() => category.allowed && props.onNavigate(category.id)}>
          {props.isActive && <span className='acive-menu-bar' />}
          <NavLink key={category.text}
            to={category.url}
            className={'text-decoration-none w-100 h-100'}
            title={category.text}>
            <ButtonContent />
          </NavLink>
        </button>
        : <button className={sidebarBtnClass}
          onClick={() => category.allowed && props.onClick(category.id)}
          title={category.text}>
          {props.isActive && <span className='acive-menu-bar' />}
          <ButtonContent />
        </button>
    }
  </>
}
