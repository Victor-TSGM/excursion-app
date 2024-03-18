import { LayoutContext } from '../../../presentation/providers/LayoutStateProvider'
import * as React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import {JobList} from '../JobList/JobList'
import {LanguageSelector} from '../LanguageSelector/LanguageSelector'
import { useContext } from 'react'
import { ProjectDependenciesContext } from '../../../presentation/providers/ProjectDependenciesProvider'
import { useOrganizationManager } from '../../../main/hooks/useOrganizationManager'

export interface NavbarProps {
  username: string
  setSidebarOpen: (arg: boolean) => void
}

export const Navbar = (props: React.PropsWithChildren<NavbarProps>): JSX.Element => {
  const { layoutState, setLayoutState } = useContext(LayoutContext)
  const { dependencies } = useContext(ProjectDependenciesContext)
  const { organizationName } = useOrganizationManager()

  return <div className='fs-nav-bar'>
    <div className='d-flex h-100'>
      <button className="fs-navbar-menubutton" onClick={l => props.setSidebarOpen(true)}><FontAwesomeIcon icon={faBars} /></button>
      {props.children}
      <div className=''>
        {
          layoutState.title &&
          <div className="fs-page-title d-none d-lg-inline-flex">
            {layoutState.title}
            <span className='fs-page-title-bar' />
          </div>
        }
      </div>
    </div>

    <div className='d-flex h-100'>
      {dependencies.useJobs && <JobList />}
      {dependencies.useLanguageSelector && <LanguageSelector />}
      <button id='navbar-user' className={'fs-navbar-user fs-navbar-item'} onClick={l => setLayoutState({ ...layoutState, isUserPanelOpen: !layoutState.isUserPanelOpen })}>
        <div className='fs-navbar-username'>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}>{props.username}</span>
          {dependencies.useOrganizationSelector && <span style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'var(--secondary-color)'
          }}>{organizationName}</span>}
        </div>

        <FontAwesomeIcon icon={faUser} />
      </button>
    </div>
  </div>
}