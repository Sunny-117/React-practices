import React, { useReducer, useState } from 'react'
import useSyncCallback from './useSync'

function fetchData() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                a: 2
            }
        ])
    })
}
export default function Comp() {
    const [arr, setArr] = useState([{
        a: 1
    }])
    const func = useSyncCallback(() => {
        console.log('[ arr ] >', arr)
    })
    return (
        <div>
            <button onClick={async () => {
                const res = await fetchData()

                setArr([...arr, ...res])
                // useSyncCallback
                func()
            }}>点击</button>
            {arr.map((item: any) => {
                return <li>{item.a}</li>
            })}
        </div>
    )
}
