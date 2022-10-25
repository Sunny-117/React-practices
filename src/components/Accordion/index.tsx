import React, { useState } from 'react'

export default function Accordion() {
    const [display1, setDisplay1] = useState(true)
    const [display2, setDisplay2] = useState(true)
    const [display3, setDisplay3] = useState(true)
    return (
        <div>
            <div className="one">
                <button onClick={() => {
                    setDisplay1(!display1)
                }}>run1</button>
                <div className="content" style={{
                    display: display1 ? 'block' : 'none'
                }}>
                    content1
                </div>
            </div>
            <div className="two">
                <button onClick={() => {
                    setDisplay2(!display2)
                }}>run2</button>
                <div className="content" style={{
                    display: display2 ? 'block' : 'none'
                }}>
                    content2
                </div>
            </div>
            <div className="three">
                <button onClick={() => {
                    setDisplay3(!display3)
                }}>run3</button>
                <div className="content" style={{
                    display: display3 ? 'block' : 'none'
                }}>
                    content3
                </div>
            </div>
        </div>
    )
}
