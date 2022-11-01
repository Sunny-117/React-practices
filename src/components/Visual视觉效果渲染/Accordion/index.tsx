
import React from 'react'

export function AccordionItem({ label, index, children }) {

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
