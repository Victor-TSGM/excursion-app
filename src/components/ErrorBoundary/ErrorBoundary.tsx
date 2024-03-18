import React from "react";

interface ErrorBoundaryState {
    hasError: boolean
    retryKey: number
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
    retryKey: number = 0;

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false, retryKey: this.retryKey };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, retryKey: 0 };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        this.retryKey += 1;
        console.log('ErrorBoundary caught error ' + this.retryKey.toString() + ' time' + (this.retryKey > 1 ? 's' : ''));
        this.setState({
            hasError: false,
            retryKey: this.retryKey
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <></>;
        }

        return <React.Fragment key={this.state.retryKey}>
            {this.props.children}
        </React.Fragment>;
    }
}