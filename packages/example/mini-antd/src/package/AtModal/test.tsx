import React, { useState } from 'react'
import { AtModal } from '.'

export const Test = () => {
    const [show, setShow] = useState(false)
    const [isBatchDelete, setIsBatchDelete] = useState(true);
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];
    return (
        <div>
            <AtModal
                isBatchDelete={isBatchDelete}
                failDeleteNum={5}
                succDeleteNum={4}
                failDisableNum={3}
                succDisNum={2}
                dataSource={dataSource}
                show={show}
                onOk={() => setShow(false)}
                onCancel={() => setShow(false)}
            />

            <button onClick={() => {
                setShow(true)
                setIsBatchDelete(true)
            }}>批量删除</button>
            <button onClick={() => {
                setShow(true)
                setIsBatchDelete(false)
            }}>批量停用</button>
        </div>
    )
}
