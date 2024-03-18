import { useResource } from '../../../presentation/hooks/useResource'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { useEffect, useState } from 'react'
import './OrganizationSelector.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { UserOrganizations } from './UserOrganizations'

export const OrganizationSelector = (props: { onClose: () => void }): JSX.Element => {
  const { t } = useResource('lib')
  const [showSplash, setShowSplash] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (showSplash) {
      navigate('/')
      window.location.reload()
    }
  }, [showSplash])

  return <>
    {
      showSplash
        ? <div id={'organization-selector'} className="organizationSelectorSplash">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>

          <span className="mt-3">{t('organizationselector.changing-organization')}</span>
        </div>
        : <>
          <div onClick={() => props.onClose()} className="organizationSelectorOverlay"></div>
          <div id="organizationSelectorContainer" className="organizationSelectorContainer">
            <div className="organization-selector-header">
              <span>
                {t('organizationselector.user-organizations')}
              </span>
              <span className="btn-close-organization-selector-header" onClick={() => props.onClose()}>
                <FontAwesomeIcon icon={faTimes} size='lg' />
              </span>

            </div>
            <UserOrganizations setShowSplash={() => setShowSplash(true)} />
          </div>
        </>
    }
  </>
}