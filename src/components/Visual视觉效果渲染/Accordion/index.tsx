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
    const items = props.children
    console.log(items)

    return <div>
        {items.map(item => {
            return <AccordionItem label={item.label} index={item.index}>
                {item.children}
            </AccordionItem>
        })}
    </div>
}