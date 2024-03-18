import * as React from 'react'
import './Loading.css'

export interface LoadingProps {
    notFull?: boolean
}

export const Loading = (props: LoadingProps): JSX.Element => {
    const [containerClass, setContainerClass] = React.useState<string>("loading-container");

    React.useEffect(() => {
        if (!props.notFull) {
            setContainerClass("loading-container full-loading-container");
        } else {
            setContainerClass("loading-container");
        }
    }, [props]);

    return <div className={containerClass}>
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
}