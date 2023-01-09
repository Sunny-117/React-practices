import React, { useState } from 'react'
interface TreeProps {
    id: string;
    name: string;
    children?: TreeProps[];
}
interface IProps {
    list: TreeProps[]
}
// https://juejin.cn/post/6967156733412114445
export const AtTree = ({ list }: IProps) => {
    const [unfolded, setUnfolded] = useState(false);//默认收起来
    return (
        <ul>

            {list.map((item, index) => {
                return <div key={index} >
                    <li onClick={() => {
                        setUnfolded(!unfolded)
                    }}>{item.name}</li>
                    {item?.children?.length && unfolded && <AtTree list={item.children} />}
                </div>
            }


            )}

        </ul>
    )
}
