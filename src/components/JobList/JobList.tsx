import * as React from 'react'
import './JobList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faDownload, faExclamationTriangle, faAlignJustify, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { JobViewModel } from '../../../domain/models/job'
import { useAccountManager } from '../../../main/hooks/useAccountManager'
import { JobService } from '../../../data/services/JobService'
import { useResource } from '../../../presentation/hooks/useResource'
import { useOutsideClick } from '../../../presentation/hooks/useOutsideClick'
import { apiUrl } from '../../../infra/http/PublicSettings'

const service = new JobService()

export const JobList = (): JSX.Element => {
  const { t } = useResource('lib')

  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [jobs, setJobs] = useState<JobViewModel[]>([])
  const [isNew, setIsNew] = useState<boolean>(false)
  const [connection, setConnection] = useState<HubConnection | null>(null)

  const userId = useAccountManager().accountService.getLoggedUserId()
  const jobsContainerRef = useOutsideClick(() => setOpenInfo(false))

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}/hub`)
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!')

          connection.on('StartJob', () => {
            console.log('job started')
            setIsNew(true)
            void ReadJobs()
          })

          connection.on('EndJob', () => {
            console.log('job ended')
            setIsNew(true)
            void ReadJobs()
          })
        })
        .catch(e => console.log('Connection failed: ', e))
    }
  }, [connection])

  useEffect(() => { void ReadJobs() }, [])

  useEffect(() => {
    const isAnyLoading = jobs.length > 0 && jobs.filter(s => s.status === 0).length > 0

    setIsLoading(isAnyLoading)
  }, [jobs])

  const ReadJobs = async (): Promise<void> => {
    if (userId === 0) return
    const resJobs = await service.Read(userId)
    if (resJobs && resJobs.length > 0) setJobs(resJobs)
  }

  const JobCard = (job: JobViewModel): JSX.Element => (
    <div key={job.id} className={['jobCard', job.status === 1 ? 'success' : job.status === 2 ? 'error' : ''].join(' ')}>
      <div>
        <h5>{job.name}</h5>
        <div className="hourString">{t('job-alert.start')} {new Date(job.start)}</div>
        {job.status > 0 ? <div className="hourString">{t('job-alert.finish')} {new Date(job.end)}</div> : ''}
      </div>

      {job.status === 0 ? <span className="fs-load-bar"></span> : ''}
      {job.status === 1 ? <a className="btn" href={`${apiUrl}/api/job/DownloadJobFile?id=${job.id}`} target="_blank" download rel="noreferrer"><FontAwesomeIcon icon={faDownload} /></a> : ''}
      {job.status === 2 ? <button className="btn"><FontAwesomeIcon icon={faExclamationTriangle} /></button> : ''}
    </div>
  )

  const EmptyList = (): JSX.Element => (
    <div className="empty-list">
      <FontAwesomeIcon icon={faAlignJustify} />
      <div className="empty-list-text">
        <h4>{t('job-alert.no-jobs')}</h4>
      </div>
    </div>
  )

  const JobsList = (): JSX.Element => (
    <div className="jobList">
      {jobs.length > 0 ? jobs.map(e => JobCard(e)) : EmptyList()}
    </div>
  )

  return (
    <span ref={jobsContainerRef} className="fs-navbar-tasks-container d-none d-lg-block">
      <span className="fs-navbar-tasks" onClick={() => { setOpenInfo(!openInfo); setIsNew(false) }}>
        <FontAwesomeIcon icon={faTasks} />
        {isLoading ? <span className="fs-load-bar"></span> : ''}
        {isNew ? <span className="fs-new-job"><FontAwesomeIcon icon={faExclamationCircle} /></span> : ''}
      </span>

      {openInfo ? JobsList() : ''}
    </span>
  )
}