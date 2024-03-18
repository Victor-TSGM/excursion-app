import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown'
import './FilterSection.css'
import { ColumnField, ColumnFieldBuilder } from '../../../domain/models/filters'
import { useResource } from '../../../presentation/hooks/useResource'

export interface FilterSectionProps {
  columnsData: ColumnFieldBuilder[]
  selectedColumns: string[]
  setSelectedColumns: (columns: string[]) => void
  onSearch: (searchField: string, sortDirection: string) => any
  filterRow?: () => JSX.Element
}

export const FilterSection = (props: FilterSectionProps): JSX.Element => {
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false)
  const [columns, setColumns] = React.useState<ColumnField[]>()
  const [lastSort, setLastSort] = React.useState<string>('id')
  const [lastSortDirection, setLastSortDirection] = React.useState<boolean>(true)
  const { t } = useResource()

  React.useEffect(() => {
    setColumns(props.columnsData.map(s => s.Build()))
  }, [props.columnsData])

  const onSearch = (sortField: string = '', sortAsc: boolean = false): void => {
    if (sortField !== '') {
      setLastSort(sortField)
      setLastSortDirection(sortAsc)

      props.onSearch(sortField, !sortAsc ? 'desc' : 'asc')
    }
  }

  const processSortSelect = (sort: string): void => {
    let sortDirection = true

    if (sort === lastSort) {
      sortDirection = !lastSortDirection
    }

    onSearch(sort, sortDirection)
  }

  const captureEnterKey = (e: any): void => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onSearch()
    }
  }

  return <div className="row no-gutters filters-section" onKeyUp={captureEnterKey}>
    <div className="col-12 col-lg-2 p-0">
      <button onClick={() => setShowAdvanced(e => !e)} className={['btn col-12', showAdvanced ? 'btn-secondary' : 'btn-outline-secondary'].join(' ')} style={{ height: '95%' }}>
        <FontAwesomeIcon icon={faFilter} className="me-2" />{t('lib:filters.advanced-options')}
      </button>
    </div>

    <div className="col-12 p-1">
      {props.filterRow?.()}
    </div>

    {
      showAdvanced
        ? <>
          <div className="col-12 mt-4 mb-2 p-0">
            <h5>{t('lib:filters.ordering')}</h5>
            <div className="row g-0">
              {
                columns.filter(s => s.canSort).map((item, index) => <div key={index} className="col-4 col-lg-2 p-1">
                  <button onClick={() => processSortSelect(item.fieldName)} className={['btn col-12', item.fieldName === lastSort ? 'btn-dark' : 'btn-outline-dark'].join(' ')}>
                    {
                      item.fieldName === lastSort
                        ? <>
                          {
                            lastSortDirection
                              ? <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                              : <FontAwesomeIcon icon={faArrowDown} className="me-2" />
                          }
                        </>
                        : <></>
                    }

                    {item.name}
                  </button>
                </div>)
              }
            </div>
          </div>

          {
            columns.filter(s => s.canShowInGrid).length > 1
              ? <div className="col-12 mt-2 p-0">
                <h5>{t('lib:filters.columns')}</h5>
                <div className="row g-0">
                  {
                    columns.filter(s => s.canShowInGrid).map((item, index) => <div key={index} className="col-4 col-lg-2 p-1">
                      <button onClick={() => {
                        let columns = props.selectedColumns

                        if (columns.includes(item.fieldName)) {
                          const newColumns = columns.filter(s => s !== item.fieldName)

                          if (newColumns.filter(s => s !== 'id').length > 0) {
                            columns = newColumns
                          }
                        } else {
                          columns.push(item.fieldName)
                        }

                        props.setSelectedColumns([...columns])
                      }} className={['btn col-12', props.selectedColumns.includes(item.fieldName) ? 'btn-dark' : 'btn-outline-dark'].join(' ')}>
                        {item.name}
                      </button>
                    </div>)
                  }
                </div>
              </div>
              : <></>
          }
        </>
        : <></>
    }
  </div>
}