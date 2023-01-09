import React, { useState } from 'react'

export const AtSee = () => {
    const [value, setValue] = useState('')
    const [see, setSee] = useState(true)
    const [str, setStr] = useState('*'.repeat(value.length))
    return (
        <div>
            <input type="text" value={see ? value : str} onChange={(e) => {
                setValue(e.target.value)
                setStr('*'.repeat(e.target.value.length))
            }} />
            {see ? <span onClick={() => {
                setSee(false)
            }}>'see'</span> : <span onClick={() => {
                setSee(true)
            }}>'saw'</span>}
        </div>
    )
}
