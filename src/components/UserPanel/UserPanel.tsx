import { LayoutContext, LayoutState } from '../../../presentation/providers/LayoutStateProvider'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserPanel.css'
import { useResource } from '../../../presentation/hooks/useResource'
import { useOutsideClick } from '../../../presentation/hooks/useOutsideClick'
import { useToggle } from '../../../presentation/hooks/useToggle'
import { OrganizationSelector } from '../OrganizationSelector/OrganizationSelector'
import React, { useContext, useRef } from 'react'
import { ProjectDependenciesContext } from '../../../presentation/providers/ProjectDependenciesProvider'

export interface UserPanelProps {
  username: string
  doLogout: () => void
}

export const UserPanel = (props: UserPanelProps): JSX.Element => {
  const [showOrganizationSelector, toggle] = useToggle(false)
  const { layoutState, setLayoutState } = useContext(LayoutContext)
  const { dependencies } = useContext(ProjectDependenciesContext)
  const { t } = useResource('lib')
  const userPanelRef = useOutsideClick(closeUserPanel, ['navbar-user'])
  const layoutStateRef = useRef<LayoutState>()
  layoutStateRef.current = layoutState

  function closeUserPanel (): void {
    if (layoutStateRef?.current?.isUserPanelOpen) {
      setLayoutState({ ...layoutStateRef.current, isUserPanelOpen: false })
    }
  }

  return (
    <div className={`fs-userpanel ${layoutState.isUserPanelOpen ? 'fs-userpanel-open' : ''}`} ref={userPanelRef}>
      <div className="fs-userinfo">
        <span className="fs-usericon-large">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span className="fs-username">
          {props.username}
        </span>
      </div>

      {
        dependencies.useOrganizationSelector &&
        <>
          <button className="btn btn-light p-3 m-1" onClick={() => toggle()}>{t('user-panel.select-organization')}</button>
          {showOrganizationSelector && <OrganizationSelector onClose={toggle} />}
        </>
      }

      <div className="filler"></div>

      <button className="fs-userpanel-logout" onClick={props.doLogout}>{t('user-panel.logout')}</button>
    </div>
  )
}