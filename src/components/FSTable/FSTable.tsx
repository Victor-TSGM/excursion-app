import * as React from 'react'
import "./FSTable.css"
import { FSPagination } from '../FSPagination/FSPagination'
import { If } from '../If/If'
import { FSTableRow } from './FSTableRow'

export interface FSTableColumn<T> {
    field: keyof T,
    header: string | (() => React.ReactNode)
    textAlign?: 'left' | 'center' | 'right'
    template?: (rowItem: T) => React.ReactNode,
    width?: string

    disableResize?: boolean
    disableSort?: boolean
}

export interface FSTableParamChangeEvent<T> {
    page: number,
    pageSize: number,
    sortColumn: keyof T,
    sortDirection: FSSortDirection
}

export type FSSortDirection = 'desc' | 'asc' | 'none'

export interface FSTableProps<T> {
    columns: FSTableColumn<T>[]
    data?: T[]

    maxHeight?: string
    detailTemplate?: (rowData: T) => JSX.Element

    disablePagination?: boolean

    page?: number
    pageSize?: number
    allowedPageSizes?: number[]

    hidePageInfo?: boolean
    total?: number

    disableChangePageSize?: boolean

    initialSortColumn: keyof T
    initialSortDirection: FSSortDirection

    onParamsChange?: (event: FSTableParamChangeEvent<T>) => void
    onSelectedIndexChange?: (index: number) => void
}

const DEFAULT_PAGE_SIZE = 15
const DEFAULT_PAGE = 1

export const FSTable = <T,>(props: FSTableProps<T>): JSX.Element => {
    const tableId = React.useId()

    const [openDetailIndex, setOpenDetailIndex] = React.useState<number[]>([])

    const [page, setPage] = React.useState(props.page || DEFAULT_PAGE)
    const [pageSize, setPageSize] = React.useState(props.pageSize || DEFAULT_PAGE_SIZE)

    const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null)

    const [sortColumn, setSortColumn] = React.useState<keyof T>(props.initialSortColumn)
    const [sortDirection, setSortDirection] = React.useState<FSSortDirection>(props.initialSortDirection)

    const getChangeParams = (): FSTableParamChangeEvent<T> => {
        return {
            page,
            pageSize,
            sortColumn,
            sortDirection
        }
    }

    React.useEffect(() => {
        setPageSize(props.pageSize || DEFAULT_PAGE_SIZE)
    }, [props.pageSize])

    React.useEffect(() => {
        setPage(props.page || DEFAULT_PAGE)
    }, [props.page])

    React.useEffect(() => {
        setSortColumn(props.initialSortColumn)
    }, [props.initialSortColumn])

    React.useEffect(() => {
        setSortDirection(props.initialSortDirection)
    }, [props.initialSortDirection])

    React.useEffect(() => {
        setOpenDetailIndex([])
    }, [props.data])

    React.useEffect(() => {
        props.onParamsChange?.(getChangeParams())
        setSelectedRowIndex(null)
    }, [sortColumn, sortDirection, page, pageSize])

    React.useEffect(() => {
        props.onSelectedIndexChange?.(selectedRowIndex)
    }, [selectedRowIndex])

    const onSortTrigger = (column: keyof T) => {

        // se estou clicando na coluna que já estava sendo ordenada
        if (column === sortColumn) {
            switch (sortDirection) {
                case 'asc':
                    setSortDirection('desc')
                    break;

                case 'desc':
                    setSortColumn(props.initialSortColumn)
                    setSortDirection('none')
                    break;

                case 'none':
                    setSortDirection('asc')
                    break;
            }

            return
        }

        // se estou clicando em uma nova coluna
        setSortColumn(column)
        setSortDirection('asc')
    }

    const renderRow = (row: T, index: number) => {
        return <FSTableRow
            key={`${tableId}_${index}`}
            tableId={tableId}
            columns={props.columns}
            data={row}
            rowNumber={index}

            openDetailIndex={openDetailIndex}
            onOpenDetailIndexChange={setOpenDetailIndex}

            detailTemplate={props.detailTemplate}

            sortByColumn={sortColumn}
            sortDirection={sortDirection}

            onSortColumnTrigger={onSortTrigger}

            selected={index === selectedRowIndex}

            setAsSelected={() => {
                if (index === selectedRowIndex) {
                    setSelectedRowIndex(null)
                    return
                }

                setSelectedRowIndex(index)
            }}
        />
    }

    return <>
        <div className='fs-table-container' style={{ maxHeight: props.maxHeight }}>
            <div className='fs-table' id={`table_${tableId}`}>
                {
                    (!props.data || props.data.length == 0) ? renderRow(null, 0) : props.data.map((row: T, index: number) => renderRow(row, index))            
                }
            </div>
        </div>

        {/* Paginação */}
        <If condition={!props.disablePagination}>
            <div className='fs-table-pagination-section'>
                <FSPagination
                    page={page}
                    pageSize={pageSize}
                    total={props.total}

                    onPageChange={(newPage: number) => {
                        setPage(newPage)
                    }}

                    onPageSizeChange={(newPageSize: number) => {
                        setPageSize(newPageSize)
                        setPage(1)
                    }}

                    allowedPageSizes={props.allowedPageSizes}
                    disableChangePageSize={props.disableChangePageSize}
                    hidePageInfo={props.hidePageInfo}
                />
            </div>
        </If>
    </>
}