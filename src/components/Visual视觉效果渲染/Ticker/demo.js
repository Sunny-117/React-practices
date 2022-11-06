let a = 2;
const test = () => {
    a = 1
    console.log(a)
}
test()
console.log(a)

    // TODO： 函数组件里面


    ```js
import React, { useEffect, useState } from 'react'

export default function Tickers({ times, interval }) {
    let [n, setN] = useState(0)
    let timer: any = null;
    let a = 1;
    const start = () => {
        a = 2
        console.log(a)
        timer = setInterval(() => {
            setN((n) => n + 1)
        }, interval);
    }
    console.log(a)
    return (
        <div>
            <button onClick={() => {
                start()
            }}>start</button>
            <button onClick={() => {
                setN(0)
                clearInterval(timer)
            }}>reset</button>
            <p>
                {n}
            </p>
        </div>
    )
}

```


// const demo = () => {
//     pp()
// }
// const pp = () => {
//     console.log('pp')
// }

// demo()