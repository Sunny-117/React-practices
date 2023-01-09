import { useState } from "react"

export default function AtTag({ children, closable, onClose }: any) {
    const [show, setShow] = useState(true)
    return (
        <div>
            {show && <button>{children} {closable && <span onClick={(e) => {
                setShow(false)
            }}>x</span>}</button>}

        </div>
    )
}
