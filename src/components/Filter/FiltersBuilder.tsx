import { ColumnFieldBuilder } from '../../../domain/models/filters'
import * as React from 'react'
import {FilterSection} from '../Filter/FilterSection'

export const FiltersBuilder = {
  Generate (
    columnsData: ColumnFieldBuilder[],
    selectedColumns: string[],
    setSelectedColumns: (columns: string[]) => void,
    onSearch: (searchField: string, sortDirection: string) => void,
    filterRow?: () => JSX.Element
  ): JSX.Element {
    return <FilterSection
            columnsData={columnsData}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            onSearch={onSearch}
            filterRow={filterRow}
        />
  }
}