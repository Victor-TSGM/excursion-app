import * as React from 'react'
import "./SectionCard.css"
import { SectionTitle } from '../SectionTitle/SectionTitle'

export interface SectionCardProps {
    header: string | (() => JSX.Element)
    headerClassName?: string
    cardClassName?: string
}

export const SectionCard = (props: React.PropsWithChildren<SectionCardProps>): JSX.Element => {
    return <div className={`row g-0 ${props.cardClassName}`} style={{ border: '1px solid lightgrey', borderRadius: '10px', overflow: 'hidden' }}>
        <SectionTitle disableBorderRadius className={props.headerClassName}>
            {typeof props.header === 'string' ? props.header : props.header()}
        </SectionTitle>

        <div className='p-3'>
            {props.children}
        </div>
    </div>
}