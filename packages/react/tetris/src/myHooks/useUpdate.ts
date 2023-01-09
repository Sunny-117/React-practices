import React from 'react'

export default function useUpdate(func: Function, listeners: any[]) {
    const isInitialMount = React.useRef(true);
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            func();
        }
    }, listeners)
}
