import React from "react";
import './DataCard.css'

export interface DataCardProps {
    label: string,
    text: string,
    secondaryText?: string
}

export const DataCard: React.FC<DataCardProps> = (props) => {

    return (
        <>
            <div className='follow-up-text follow-up-overview-section'>
                <div className='data-wrapper'>
                    <div className='mt-1'>
                        <span className='title-text'>{props.label || ""}</span>
                        <span className='date-text float-end'>{props.secondaryText || ""}</span>
                    </div>
                    <div className='mt-2 mb-1'>
                        <span className='title-value-text'>{props.text || <br />}</span>
                    </div>
                </div>
            </div>
        </>
    )
}