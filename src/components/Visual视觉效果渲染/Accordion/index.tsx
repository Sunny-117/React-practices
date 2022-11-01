export function AccordionItem(props) {

    return <div className="item">
        <button>{props.label}</button>
        {props.children}
    </div>
}

export function Accordion(props) {

    return <div>
        {props.children}
    </div>
}