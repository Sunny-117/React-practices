
import React from 'react'

export function AccordionItem({ label, index, children, isCollapsed }) {

    return (
        <div>
            {children}
        </div>
    )
}
export function Accordion({ defaultIndex, onItemClick, children }) {
    return (
        <div>
            {children}
        </div>
    )
}
