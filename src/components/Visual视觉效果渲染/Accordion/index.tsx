import { useState } from "react"

export function AccordionItem(props) {

    return <div className="item">
        <button>{props.label}</button>
        <div style={{
            display: props.isCollapsed ? 'block' : 'none'
        }}>
            {props.children}
        </div>
    </div>
}

export function Accordion(props) {
    const [i, setI] = useState(props.defaultIndex)
    const items = props.children
    console.log(props)
    return <div>
        {items.map(item => {
            return <AccordionItem
                isCollapsed={item.props.index === i ? true : false}
                label={item.props.label} index={item.props.index}>
                {item.props.children}
            </AccordionItem>
        })}
    </div>
}