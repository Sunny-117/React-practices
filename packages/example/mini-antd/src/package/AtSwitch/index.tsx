
import { useRef, useState } from 'react'
import './index.css'
interface IProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    checkedChildren?: string;
    unCheckedChildren?: string
    className?: string;
    onChange: (checked: boolean, event: Event) => void;
    // checked: 要变成什么样子
}
export const AtSwitch = ({ onChange, disabled, defaultChecked, className, checkedChildren, unCheckedChildren }: IProps) => {
    const [swChecked, setSwChecked] = useState(defaultChecked)
    const [positionX, setPositionX] = useState(swChecked ? '50px' : '0px')
    const refConent = useRef()

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: '100px',
                height: '50px',
                border: '2px solid',
                borderRadius: '30px'
            }}>
            {/* @ts-ignore */}
            <div ref={refConent} style={{
                position: 'absolute',
                left: positionX,
                width: '50px',
                height: '50px',
                border: '1px solid',
                borderRadius: '50%',
                background: swChecked ? 'green' : 'red',
                cursor: disabled ? "not-allowed" : 'pointer',
                transition: 'all .4s'
            }}
                onClick={(e: any) => {
                    if (disabled) {
                        return
                    }
                    const div = refConent.current;
                    if (div) {
                        const { left } = getComputedStyle(div)
                        const res = parseInt(left)
                        if (res === 0) {
                            setPositionX('50px')
                            setSwChecked(true)
                            onChange(true, e)
                        } else {
                            setPositionX('0')
                            setSwChecked(false)
                            onChange(false, e)
                        }
                    }
                }}>
                {swChecked ? checkedChildren : unCheckedChildren}
            </div>

        </div >
    )
}