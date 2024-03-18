import React from "react";
import './RowCardHeader.css'

export interface RowCardHeaderProps {
    children?: React.ReactNode
}

export const RowCardHeader: React.FC<RowCardHeaderProps> = (props) => {
    return (
        <>
            <div className='row-card-header'>
                {props.children}
            </div>
        </>
    )
}