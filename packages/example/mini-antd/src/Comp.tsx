import React, { useState } from 'react'

export const Comp = () => {
    const [value, setValue] = useState('')
    return (
        <div>
            <input type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }} />
        </div>
    )
}
