
import React from "react";
export function AccordionItem({ label, index, isCollapsed, children }}) {
    return <div>
        <div style={{
            display: isCollapsed ? 'none' : 'block'
        }}>{label}</div>
    </div>
}

export function Accordion(props) {

    return <div>
        <AccordionItem />
    </div>
}