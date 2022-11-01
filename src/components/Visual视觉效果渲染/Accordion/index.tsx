export function AccordionItem(props) {
    return <div className="item">
        <button>{props.label}</button>
        <div >
            {props.children}
        </div>
    </div>
}

export function Accordion(props) {

    return <div>
        {props.children}
    </div>
}