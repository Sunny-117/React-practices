import React, { useState } from 'react'
import {
    EditOutlined,
} from '@ant-design/icons';
interface IEdit {
    onChange: (a: string) => void;
}
interface IProps {
    editable: IEdit,
    children: string;
}
const Title = ({ level, children }: any) => {
    const [titleLevel,] = useState(level)
    switch (titleLevel) {
        case 1:
            return <h1>{children}</h1>
        case 2:
            return <h2>{children}</h2>
        // break;
        case 3:
            return <h3>{children}</h3>
        case 4:
            return <h4>{children}</h4>
        // break;
        default:
            return <h1>{children}</h1>
        // break;
    }
}
const AtTypography = ({ editable, children }: IProps) => {
    const [value, setValue] = useState(children)
    const [isEditable, setIsEditable] = useState(false);
    return (
        <div>
            {/* 编辑态 */}
            {/* 阅读态 */}
            {isEditable ? <input
                onBlur={() => {
                    setIsEditable(false);
                }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            // onClick={() => setIsEditable(true)}// 因为input最开始是隐藏的，所以触发不了点击事件
            /> :
                <div onClick={() => setIsEditable(true)}>
                    {value}
                </div>}
            <EditOutlined onClick={() => {
                setIsEditable(true)
            }} />
        </div>
    )
}
AtTypography.Title = Title

export default AtTypography