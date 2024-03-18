import React, { FC, useEffect, useState } from 'react'

import { OrganizationViewModel } from '../../../domain/models'
import { useOrganizationManager } from '../../../main/hooks/useOrganizationManager'
import {Loading} from '../Loading/Loading'
import './OrganizationSelector.css'

export const UserOrganizations: FC<{ setShowSplash: () => void }> = ({ setShowSplash }): JSX.Element => {
  const { organizationId, getUserOrganizations, setCurrentOrganization } = useOrganizationManager()
  const [idSelectedOrganization, setSelectedOrganization] = useState<number>(organizationId)
  const [organizations, setOrganizations] = useState<OrganizationViewModel[]>([])

  useEffect(() => {
    getUserOrganizations()
      .then((result) => {
        setOrganizations(result)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const organization = organizations.find(s => s.id === idSelectedOrganization)

    if (!organization) return

    setCurrentOrganization(organization)
    setShowSplash()
  }, [idSelectedOrganization])

  if (!organizations?.length) return <Loading/>

  return <div className="organization-list">
    {
      organizations?.map(s =>
        <button
          key={s.id}
          className={['btn-organization btn col-12 p-3 mt-1', s.id === idSelectedOrganization ? 'btn-dark' : 'btn-light'].join(' ')}
          onClick={() => setSelectedOrganization(s.id)}
        >
          {s.name}
        </button>
      )
    }
  </div>
}