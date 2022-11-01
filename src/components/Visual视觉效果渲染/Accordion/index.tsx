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
            console.log(item)
            return <AccordionItem label={item.props.label} index={item.props.index}>
                {item.props.children}
            </AccordionItem>
        })}
    </div>
}