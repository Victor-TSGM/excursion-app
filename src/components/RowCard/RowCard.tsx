import React from "react";
import './RowCard.css'

export interface RowCardProps {
    children?: React.ReactNode
}

export const RowCard: React.FC<RowCardProps> = (props) => {
    return (
        <>
            <div className='follow-up-text follow-up-overview-section'>
                <div className='data-wrapper'>
                    {props.children}
                </div>
            </div>
        </>
    )
}