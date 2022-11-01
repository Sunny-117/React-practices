import { useState } from "react"

export function AccordionItem(props) {
    const [i, setI] = useState(props.defaultIndex)
    return <div className="item">
        <button>{props.label}</button>
        <div style={{
            display: props.index === i ? 'block' : 'none'
        }}>
            {props.children}
        </div>
    </div>
}

export function Accordion(props) {

    return <div>
        <AccordionItem />
    </div>
}