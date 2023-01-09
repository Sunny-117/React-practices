import React from 'react'
import { AtSwitch } from '.'

export const Test = () => {
    return (
        <div>
            <AtSwitch
                onChange={(checked, event) => {
                    console.log(checked)
                    console.log(event)
                }}
                className='aa' checkedChildren="开启" unCheckedChildren="关闭" />

        </div>
    )
}
