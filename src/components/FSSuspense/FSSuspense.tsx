import React from 'react'
import { Loading } from '../Loading/Loading'

interface FSSuspenseProps {
    fallback?: React.ReactNode
}

export const FSSuspense = (props: React.PropsWithChildren<FSSuspenseProps>): JSX.Element => {
    return <>
        <React.Suspense fallback={props.fallback || <Loading />}>
            {props.children || <></>}
        </React.Suspense>
    </>
}