import { useState } from "react";

export function Ticker(props) {
    // 当前 ticker ，默认 0
    const [ticker, setTicker] = useState(0);
    let interval = null;

    // 开始计时
    const tick = () => {
        reset();
        interval = setInterval(() => {
            if (ticker < props.times) setTicker(ticker + 1);
            else clearInterval(interval);
        }, props.interval);
    };

    // 重置为0，并清除计时器
    const reset = () => {
        setTicker(0);
        clearInterval(interval);
    };

    return (
        <div>
            <span style={{ fontSize: 100 }}>{ticker}</span>
            <button onClick={tick}>Tick!</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}