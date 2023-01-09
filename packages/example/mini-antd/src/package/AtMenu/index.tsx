import React, { ReactNode } from 'react'
import './index.css'
interface ItemsProps {
    key: string;
    label: string;
    children?: ItemsProps;
}
interface IProps {
    items: ItemsProps[]
    children: IProps[]
}

export const AtMenu = ({ items }: IProps) => {
    return (
        <div className='ant-menu'>
            <ul>
                {items.map(ele => {
                    return <li key={ele.key}>{ele.label}
                        <h2>
                            {/* @ts-ignore */}
                            {ele.children && <AtMenu items={ele.children} />}
                        </h2>
                    </li>
                })}
            </ul>
        </div>
    )
}
