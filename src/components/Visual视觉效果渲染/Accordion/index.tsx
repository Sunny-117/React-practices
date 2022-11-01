import { useState } from "react"

export function AccordionItem(props) {

    return <div className="item">
        <button onClick={() => {
            props.handleClick()
        }}>{props.label}</button>
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
    const changeItem = (index) => {

    }
    return <div>
        {items.map(item => {
            return <AccordionItem
                handleClick={() => {
                    changeItem(item.props.index)
                }}
                isCollapsed={item.props.index === i ? true : false}
                label={item.props.label} index={item.props.index}>
                {item.props.children}
            </AccordionItem>
        })}
    </div>
}