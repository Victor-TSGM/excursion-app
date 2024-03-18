import * as React from 'react'
import { faArrowDown, faArrowUp, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FSTableColumn, FSSortDirection } from './FSTable'
import { If } from '../If/If'

export interface FSTableRowProps<T> {
    tableId: string
    rowNumber: number
    data: T

    openDetailIndex: number[]
    onOpenDetailIndexChange: (newDetailList: number[]) => void

    columns: FSTableColumn<T>[]
    detailTemplate?: (rowData: T) => JSX.Element

    sortByColumn: keyof T
    sortDirection: FSSortDirection

    onSortColumnTrigger: (column: keyof T) => void

    selected: boolean
    setAsSelected: () => void
}

export const FSTableRow = <T,>(props: FSTableRowProps<T>): JSX.Element => {
    const isDetailVisible = props.openDetailIndex.includes(props.rowNumber)
    const hasDetailTemplate: boolean = !!props.detailTemplate
    const defaultWidth = `calc((100% - ${(hasDetailTemplate ? '50px' : '0px')} - ${(props.columns.map(s => s.width || '0px').join(' - '))}) / ${(props.columns.filter(s => !s.width).length || 1)})`

    const [drag, setDrag] = React.useState(null)

    const handleStart = (e) => {
        let iniMouse = e.clientX;
        let iniSize = e.target.parentElement.offsetWidth;

        setDrag({
            iniMouse: iniMouse,
            iniSize: iniSize
        })
    }

    const handleMove = (e: any, columnIndex: number) => {
        if (e.clientX) {
            let iniMouse = drag.iniMouse;
            let iniSize = drag.iniSize;
            let endMouse = e.clientX;

            let endSize = iniSize + (endMouse - iniMouse);

            setColumnSizeByIndex(props.tableId, columnIndex, `${endSize}px`)
        }
    }

    const renderColumnResizer = (column: FSTableColumn<T>, columnNumber: number, width: string): JSX.Element => {
        if (column.disableResize) {
            return <></>
        }

        return <ColumnResizer
            onDragStart={handleStart}
            onDragMove={(e) => handleMove(e, columnNumber)}
            onDoubleClick={() => setColumnSizeByIndex(props.tableId, columnNumber, width)}
        />
    }

    const canSortColumn = (column: FSTableColumn<T>): boolean => {
        return !(column.header === '' || column.header === ' ' || column.header === null || column.disableSort)
    }

    const renderHeader = (): JSX.Element => {
        if (props.rowNumber !== 0) {
            return <></>
        }

        return <div className={`${props.tableId}_row_-1 fs-table-row fs-table-row-header`}>
            {
                hasDetailTemplate ? <div className={`fs-table-column ${props.tableId}_col_-1`} style={{ width: "30px", cursor: 'none' }}>
                    <div className='fs-table-header'></div>
                </div> : <></>
            }

            {props.columns.map((column: FSTableColumn<T>, columnNumber: number) => {
                let width = column.width || defaultWidth
                let columnId = `${props.tableId}_col_${columnNumber}`

                return <div
                    onClick={() => {
                        if (!canSortColumn(column)) {
                            return
                        }

                        props.onSortColumnTrigger(column.field)
                    }}
                    className={`fs-table-column ${columnId}`}
                    style={{ width: width, textAlign: column.textAlign || 'left' }}
                    key={columnId}
                >
                    <div className='fs-table-header'>
                        <div style={{ flex: 1 }}>
                            {typeof column.header === 'string' ? column.header : column.header()}
                        </div>

                        <If condition={column.field === props.sortByColumn && canSortColumn(column)}>
                            {
                                props.sortDirection == 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUp} className='ms-3' />
                                    : (props.sortDirection == 'desc' ? <FontAwesomeIcon icon={faArrowDown} className='ms-3' /> : <></>)
                            }
                        </If>
                    </div>

                    {renderColumnResizer(column, columnNumber, width)}
                </div>
            })}
        </div>
    }

    return <>
        {renderHeader()}

        {
            props.data === null ? <></> : <>
                <div
                    className={`${props.tableId}_row_${props.rowNumber} fs-table-row ${(props.selected ? 'selected' : '')}`}
                    onClick={() => props.setAsSelected()}
                >
                    {
                        hasDetailTemplate ? <div className={`fs-table-column ${props.tableId}_col_-1`} style={{ width: "30px" }}>
                            <div className='p-2 fs-table-column-action' style={{ cursor: 'pointer', width: '100%' }} onClick={() => {
                                if (isDetailVisible) {
                                    props.onOpenDetailIndexChange(props.openDetailIndex.filter((s: number) => s !== props.rowNumber))
                                    return
                                }

                                props.onOpenDetailIndexChange([...props.openDetailIndex, props.rowNumber])
                            }}>
                                {
                                    isDetailVisible ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />
                                }
                            </div>
                        </div> : <></>
                    }

                    {props.columns.map((column: FSTableColumn<T>, columnNumber: number) => {
                        let width = column.width || defaultWidth
                        let columnValue = column.template ? column.template(props.data) : props.data[column.field].toString()
                        let columnId = `${props.tableId}_col_${columnNumber}`

                        return <div className={`fs-table-column ${columnId}`} key={columnId} style={{ width: width, textAlign: column.textAlign || 'left' }}>
                            <div className='p-2 fs-table-column-value'>
                                {columnValue}
                            </div>

                            {renderColumnResizer(column, columnNumber, width)}
                        </div>
                    })}

                    {
                        hasDetailTemplate && isDetailVisible ? <div className='fs-table-row-detail'>
                            {props.detailTemplate?.(props.data)}
                        </div> : <></>
                    }
                </div>
            </>
        }
    </>
}

interface ColumnResizerProps {
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
    onDragMove: (e: React.DragEvent<HTMLDivElement>) => void
    onDoubleClick: () => void
}

const ColumnResizer = (props: ColumnResizerProps) => {
    return <div
        className='fs-table-resizer'
        draggable={true}
        onDragStart={props.onDragStart}
        onDrag={props.onDragMove}
        onDoubleClick={props.onDoubleClick}
    >
    </div>
}

const setColumnSizeByIndex = (tableId: string, columnNumber: number, size: string): void => {
    Array.from(
        document.getElementsByClassName(`${tableId}_col_${columnNumber}`)
    )
        .forEach((col: HTMLElement, rowIndex: number) => {
            col.style.width = size
        })
}