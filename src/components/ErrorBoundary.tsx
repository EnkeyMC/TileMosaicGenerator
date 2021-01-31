import React, {ReactNode} from "react";
import bem from "bem-ts";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

const blk = bem('error-boundary');

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={blk()}>
                    <div className={blk('content')}>
                        <h2 className="title is-3 has-text-danger">Error occurred</h2>
                        <p>Error occurred during render of this component.</p>
                    </div>
                </div>
            )
        }

        return this.props.children ?? null;
    }
}
