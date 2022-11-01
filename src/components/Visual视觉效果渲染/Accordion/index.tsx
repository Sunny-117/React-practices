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
        if (typeof props.onItemClick === 'function') {
            props.onItemClick(index)
        }
        setI(index)
    }
    return <div>
        {items.map((item, j) => {
            return <AccordionItem
                key={j}
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