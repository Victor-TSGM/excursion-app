import React from "react";
import './RowCardData.css'

export interface RowCardDataProps {
    children?: React.ReactNode
}

export const RowCardData: React.FC<RowCardDataProps> = (props) => {
    return (
        <>
            <div className='row-card-data'>
                {props.children}
            </div>
        </>
    )
}