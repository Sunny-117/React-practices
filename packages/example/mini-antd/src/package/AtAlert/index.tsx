import React, { useState } from 'react'

export const AtAlert = ({ message, closable }: any) => {
    const [show, setShow] = useState(true)
    return (
        <div>
            {show && <div style={{
                display: 'flex'
            }}>
                <div
                    style={{
                        border: '1px solid'
                    }}
                >{message}</div>

                {closable && <span onClick={() => {
                    setShow(false)
                }}>x</span>}
            </div>}
        </div>

    )
}
