import { useState } from "react"

interface IProps {
    datadata: any
}
export const TT = ({ datadata }: IProps) => {
    const [show, setShow] = useState(true)
    return (
        <div>
            {datadata.map((ele: any) => {
                return <div key={ele.label} onClick={(e) => {
                    setShow(!show)
                }}>
                    {ele.label}
                    <div>
                        {ele.children && <div style={{ color: 'green', marginLeft: '20px', display: show ? 'block' : 'none' }}>
                            <TT datadata={ele.children} />
                        </div>}
                    </div>
                </div>
            })}
        </div>
    )
}
