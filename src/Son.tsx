import React, { useState } from 'react'

export default function Son({ fatherSetValue }: any) {
    const [value, setValue] = useState('')
    return (
        <div>
            <input type="text" value={value} onChange={e => {
                setValue(e.target.value)
                fatherSetValue(e.target.value)
            }} />
        </div>
    )
}
