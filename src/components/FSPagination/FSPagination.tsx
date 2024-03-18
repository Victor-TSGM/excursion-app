import * as React from 'react'
import "./FSPagination.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faChevronLeft, faChevronRight, faDiagramNext, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FSDropDownList } from '../FSDropDownList/FSDropDownList';

export interface FSPaginationProps {
    page: number
    onPageChange: (newPage: number) => void

    pageSize: number
    total: number

    onPageSizeChange?: (newPageSize: number) => void
    allowedPageSizes?: number[]

    activeButtonColor?: string
    activeButtonForeColor?: string

    disableChangePageSize?: boolean
    hidePageInfo?: boolean
}

export const FSPagination = (props: FSPaginationProps): JSX.Element => {
    const totalPages: number = props.pageSize > 0 && props.total > 0 ? Math.ceil(props.total / props.pageSize) : 1

    const handleNext = () => {
        props.onPageChange(props.page + 1);
    }

    const handleFirst = () => {
        props.onPageChange(1);
    }

    const handleLast = () => {
        props.onPageChange(totalPages);
    }

    const handlePrevious = () => {
        props.onPageChange(props.page - 1);
    }

    return <div className='fs-pagination-container'>
        <div className="d-inline-flex align-items-center justify-content-center pb-2 pt-3">
            <PageButton isNavigationButton onClick={handleFirst} disabled={props.page <= 1}><FontAwesomeIcon icon={faBackwardStep} /></PageButton>
            <PageButton isNavigationButton onClick={handlePrevious} disabled={props.page <= 1}><FontAwesomeIcon icon={faChevronLeft} /></PageButton>

            {totalPages - props.page < 1 && props.page - 4 > 0 && <PageButton onClick={() => props.onPageChange(props.page - 4)}>{props.page - 4}</PageButton>}
            {totalPages - props.page < 2 && props.page - 3 > 0 && <PageButton onClick={() => props.onPageChange(props.page - 3)}>{props.page - 3}</PageButton>}
            {totalPages && props.page - 2 > 0 && <PageButton onClick={() => props.onPageChange(props.page - 2)}>{props.page - 2}</PageButton>}
            {totalPages && props.page - 1 > 0 && <PageButton onClick={() => props.onPageChange(props.page - 1)}>{props.page - 1}</PageButton>}

            <PageButton backgroundColor={props.activeButtonColor || '#222425'} foreColor={props.activeButtonForeColor || "white"}>{props.page}</PageButton>

            {props.page + 1 <= totalPages && <PageButton onClick={() => props.onPageChange(props.page + 1)}>{props.page + 1}</PageButton>}
            {props.page + 2 <= totalPages && <PageButton onClick={() => props.onPageChange(props.page + 2)}>{props.page + 2}</PageButton>}
            {props.page + 3 <= totalPages && props.page < 3 && <PageButton onClick={() => props.onPageChange(props.page + 3)}>{props.page + 3}</PageButton>}
            {props.page + 4 <= totalPages && props.page < 2 && <PageButton onClick={() => props.onPageChange(props.page + 4)}>{props.page + 4}</PageButton>}

            <PageButton isNavigationButton onClick={handleNext} disabled={!(props.page < totalPages)}><FontAwesomeIcon icon={faChevronRight} /></PageButton>
            <PageButton isNavigationButton onClick={handleLast} disabled={props.page >= totalPages}><FontAwesomeIcon icon={faForwardStep} /></PageButton>

            {
                !props.disableChangePageSize ? <FSDropDownList
                    width='50px'
                    placeholder={'Itens por página'}
                    value={{ qty: props.pageSize }}
                    dataSource={
                        [...(props.allowedPageSizes?.length > 0 ? props.allowedPageSizes : [5, 10, 15, 25, 50])].map(item => ({ qty: item }))
                    }
                    textField={'qty'}
                    valueField={'qty'}
                    onChange={(value: { qty: number }) => props.onPageSizeChange(value.qty)}
                /> : <></>
            }
        </div>

        <div className="d-inline-flex align-items-center justify-content-center pagination-info">
            {
                props.hidePageInfo ? <></> : <>
                    Página {props.page} de {totalPages} ({props.pageSize} itens)
                </>
            }
        </div>
    </div>
}

interface PageButtonProps {
    backgroundColor?: string
    foreColor?: string
    isNavigationButton?: boolean
    onClick?: () => void
    disabled?: boolean
}

const PageButton = (props: React.PropsWithChildren<PageButtonProps>): JSX.Element => {
    return (
        <button
            className={`fs-page-button ${props.isNavigationButton ? "nav" : ""}`}
            onClick={props.onClick}
            disabled={props.disabled}
            style={{ background: props.backgroundColor || "transparent", color: props.foreColor || "black" }}
        >
            {props.children}
        </button>
    );
};