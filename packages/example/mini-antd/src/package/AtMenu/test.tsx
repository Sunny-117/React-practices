import React, { useState } from 'react'
import { AtMenu } from '.'
import './test.css'

export const Test = () => {
    const [show, setShow] = useState(true)
    const [changeFoo, setChangeFoo] = useState('black')
    return (
        <div>
            <AtMenu
                items={[
                    {
                        key: '1',
                        label: 'option1',
                        // @ts-ignore
                        children: [
                            {
                                label: 'Option1-1',
                                key: 'setting:3',
                            },
                            {
                                label: 'Option1-2',
                                key: 'setting:4',
                            },
                        ],
                    },
                    {
                        key: '2',
                        label: 'option2',
                        // @ts-ignore
                        children: [
                            {
                                label: 'Option',
                                key: 'setting2-1',
                            },
                            {
                                label: 'Option2-2',
                                key: 'setting:4',
                            },
                        ],
                    },
                ]}
            />
            <h1>

                <div className='father' onClick={() => {
                    setShow(!show)
                }}>负极</div>
                <div className={show ? 'son-wrapper son-wrapper-show' : 'son-wrapper son-wrapper-hidden'} >
                    <div className='son'>1</div>
                    <div className='son'>2</div>
                </div>
                <div className={changeFoo === 'black' ? 'black-change ani' : 'ani red-change'}>受控对象</div>
                <button onClick={() => {
                    if (changeFoo === 'black') {
                        setChangeFoo('red')
                    } else {
                        setChangeFoo('black')
                    }
                }}>换肤</button>
            </h1>
        </div>
    )
}
