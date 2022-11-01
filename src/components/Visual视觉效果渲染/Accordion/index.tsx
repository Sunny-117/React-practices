import { useState } from "react"

export function AccordionItem(props) {

    return <div className="item">
        <button>{props.label}</button>
        <div style={{
            // display: props.index === i ? 'block' : 'none'
        }}>
            {props.children}
        </div>
    </div>
}

export function Accordion(props) {
    const [i, setI] = useState(props.defaultIndex)
    const items = props.children
    return <div>
        {items.map(item => {
            return <AccordionItem label={item.props.label} index={item.props.index}>
                {item.props.children}
            </AccordionItem>
        })}
    </div>
}