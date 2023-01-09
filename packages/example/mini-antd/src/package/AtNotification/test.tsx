import React, { useState } from 'react'
import AtNotification from '.'

export const Test = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false)
        }, 1000);
    }
    return (
        <div>
            {show && (
                <AtNotification />
            )}
            {/* @ts-ignore */}
            <button onClick={handleClick}>dianji</button>
        </div>
    )
}
