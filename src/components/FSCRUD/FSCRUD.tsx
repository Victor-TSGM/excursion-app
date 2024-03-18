import * as React from 'react'
import "./FSCRUD.css"
import { FSCRUDIndexBar } from './FSCRUDIndexBar'
import { If } from '../If/If'
import { ToastType, useDialog, useResource, useToast } from '../../../presentation/hooks'
import { FSSortDirection, FSTable, FSTableColumn, FSTableParamChangeEvent } from '../FSTable/FSTable'
import { LayoutContext } from '../../../presentation/providers'

export interface FSCRUDDataSource<T> {
    data: T[]
    total: number
}

export interface FSCRUDProps<T, TId> {
    title: string
    columns: FSTableColumn<T>[]

    initialPage?: number
    initialPageSize?: number
    initialSortColumn: keyof T
    initialSortDirection: FSSortDirection
    allowedPageSizes?: number[]

    idField: keyof T

    detailTemplate?: (row: T) => JSX.Element

    loadEditor: (id: TId | null, onClose: () => void) => JSX.Element
    loadCustomTable?: (dataSource: FSCRUDDataSource<T>, onRowSelected: (id: TId) => void) => JSX.Element
    readData: (page: number, pageSize: number, sortColumn: keyof T, sortDirection: FSSortDirection) => Promise<FSCRUDDataSource<T>>

    onWordExport?: () => void
    onExcelExport?: () => void
    onPdfExport?: () => void
    onDelete?: (id: TId) => Promise<void>

    hideNewButton?: boolean
    hideEditButton?: boolean
    hideDeleteButton?: boolean

    hideWordButton?: boolean
    hideExcelButton?: boolean
    hidePDFButton?: boolean

    additionalIndexBarLeftItems?: () => JSX.Element
    additionalIndexBarRightItems?: () => JSX.Element

    hideTopBar?: boolean
    filterSection?: (onSearch?: () => void) => JSX.Element
    height?: string
}

export const FSCRUD = <T, TId = number>(props: FSCRUDProps<T, TId>): JSX.Element => {
    const dialog = useDialog()
    const toast = useToast()
    const { t } = useResource()
    const { layoutState, setLayoutState } = React.useContext(LayoutContext)

    const [isNew, setIsNew] = React.useState<boolean>(false)
    const [isEditorOpen, setIsEditorOpen] = React.useState<boolean>(false)
    const [selectedEntityId, setSelectedEntityId] = React.useState<TId>()

    const [page, setPage] = React.useState(props.initialPage || 1)
    const [pageSize, setPageSize] = React.useState(props.initialPageSize || 5)
    const [sortColumn, setSortColumn] = React.useState<keyof T>(props.initialSortColumn)
    const [sortDirection, setSortDirection] = React.useState<FSSortDirection>(props.initialSortDirection)

    const [entities, setEntities] = React.useState<FSCRUDDataSource<T>>({
        data: [],
        total: 0
    })

    const readData = (): void => {
        props.readData(page, pageSize, sortColumn, sortDirection)
            .then((data: FSCRUDDataSource<T>) => {
                setEntities(data)
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    React.useEffect(() => {
        readData()
    }, [page, pageSize, sortColumn, sortDirection])


    React.useEffect(() => {
        if (props.title) {
            setLayoutState({ ...layoutState, title: props.title })
        }
    }, [props.title])

    return <div className='fs-crud-container' style={{ height: props.height }}>
        {
            props.hideTopBar
                ? <></>
                : <FSCRUDIndexBar
                    onNew={() => {
                        setIsNew(true)
                        setIsEditorOpen(true)
                    }}
                    onEdit={() => {
                        if (!selectedEntityId || selectedEntityId === 0) {
                            toast.showToast(ToastType.Info, 'Selecione um item para editar', '')
                            return
                        }

                        setIsEditorOpen(true)
                    }}
                    onDelete={() => {
                        if (selectedEntityId) {
                            dialog.showDialog(
                                t('lib:crud.confirm-delete'),
                                () => {
                                    props.onDelete?.(selectedEntityId)
                                        .then(() => {
                                            toast.showToast(ToastType.Success, t('lib:toast.delete-success'), '')
                                        })
                                        .catch((err) => {
                                            toast.showToast(ToastType.Error, err.response.data, '')
                                        })
                                        .finally(() => {
                                            readData()
                                        })
                                },
                                () => {
                                    toast.showToast(ToastType.Info, t('lib:toast.delete-cancel'), '')
                                }
                            )
                        }
                        else {
                            toast.showToast(ToastType.Info, t('lib:toast.delete-cancel'), '')
                        }
                    }}

                    onExcelExport={props.onExcelExport}
                    onWordExport={props.onWordExport}
                    onPdfExport={props.onPdfExport}

                    hideNewButton={props.hideNewButton}
                    hideEditButton={props.hideEditButton}
                    hideDeleteButton={props.hideDeleteButton}

                    hideWordButton={props.hideWordButton}
                    hideExcelButton={props.hideExcelButton}
                    hidePDFButton={props.hidePDFButton}

                    additionalLeftItems={props.additionalIndexBarLeftItems}
                    additionalRightItems={props.additionalIndexBarRightItems}
                />
        }

        {
            props.filterSection ? <div className='row g-0'>
                {props.filterSection?.(readData)}
            </div> : <></>
        }

        <div className={`p-2 row g-0 fs-crud-table ${(props.filterSection ? 'pt-0' : '')}`}>
            {
                props.loadCustomTable ? props.loadCustomTable?.(entities, setSelectedEntityId) : <FSTable<T>
                    columns={props.columns}

                    data={entities.data}
                    total={entities.total}

                    page={page}
                    pageSize={pageSize}
                    allowedPageSizes={props.allowedPageSizes}

                    initialSortColumn={props.initialSortColumn}
                    initialSortDirection={props.initialSortDirection}

                    onParamsChange={(event: FSTableParamChangeEvent<T>) => {
                        setPage(event.page)
                        setPageSize(event.pageSize)
                        setSortColumn(event.sortColumn)
                        setSortDirection(event.sortDirection === 'none' ? props.initialSortDirection : event.sortDirection)
                    }}

                    detailTemplate={props.detailTemplate}

                    onSelectedIndexChange={(index: number | null) => {
                        if (index === null) {
                            setSelectedEntityId(null)
                            return
                        }

                        setSelectedEntityId(entities.data[index][props.idField] as TId)
                    }}
                />
            }
        </div>

        <If condition={isEditorOpen}>
            <div className='fs-crud-editor'>
                {
                    props.loadEditor(isNew ? null : selectedEntityId, () => {
                        setIsEditorOpen(false)
                        setIsNew(false)
                    })
                }
            </div>
        </If>
    </div>
}