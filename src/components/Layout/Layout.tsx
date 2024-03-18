import { MenuCategory } from '../../../domain/models/menu-category'
import * as React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Sidebar } from '../SideBar/Sidebar'
import './Layout.css'
import { LayoutStateProvider } from '../../../presentation/providers/LayoutStateProvider'
import { BrowserRouter, Routes } from 'react-router-dom'
import { UserPanel } from '../UserPanel/UserPanel'
import { FSToastComponent } from '../ToastComponent/FSToastComponent'
import { FSDialogComponent } from '../DialogComponent/FSDialogComponent'
import { routesBasename } from '../../../infra/http/PublicSettings'
import { ProjectDependenciesProvider, ProjectDependencies } from '../../../presentation/providers/ProjectDependenciesProvider'
import { FSSuspense } from '../FSSuspense/FSSuspense'

export interface LayoutProps {
  appHeader: JSX.Element
  loggedUsername: string
  doLogout: () => void
  menuItems: MenuCategory[]
  hideForbiddenItems?: boolean
  useFavoritesMenu?: boolean
  useJobs?: boolean
  useLanguageSelector?: boolean
  useOrganizationSelector?: boolean
}

export const Layout = (props: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)

  const deps = React.useMemo(() => mapPropsToDependencies(), [])

  function mapPropsToDependencies(): ProjectDependencies {
    return {
      useFavoritesMenu: props.useFavoritesMenu,
      useJobs: props.useJobs,
      useLanguageSelector: props.useLanguageSelector,
      useOrganizationSelector: props.useOrganizationSelector
    }
  }

  return <LayoutStateProvider>
    <ProjectDependenciesProvider deps={deps}>
      <BrowserRouter basename={routesBasename}>
        <React.Fragment>
          <div className='fs-layout-container'>
            <Sidebar menuItems={props.menuItems}
              hideForbiddenItems={props.hideForbiddenItems}
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              useOrganization={props.useOrganizationSelector || false} />

            <Navbar username={props.loggedUsername} setSidebarOpen={setSidebarOpen}>
              {props.appHeader}
            </Navbar>

            <UserPanel username={props.loggedUsername} doLogout={props.doLogout} />
            
            <FSToastComponent />
            <FSDialogComponent />

            <div className='fs-layout-content'>
              <FSSuspense>
                <Routes>
                  {props.children}
                </Routes>
              </FSSuspense>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </ProjectDependenciesProvider>
  </LayoutStateProvider>
}