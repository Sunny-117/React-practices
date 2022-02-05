import React from 'react';
import { Button, Switch } from 'antd';
// import 'antd/dist/antd.min.css';
import './dd.css';
import { useBoolean } from '@huse/boolean';
console.log(useBoolean)
// 
export default function Comp() {
    const [value, { on, off, toggle }] = useBoolean();
    return (
        <>
            <div>
                <Button className='button1' type="primary" onClick={on}>Switch On</Button>
                <Button className='button2' danger onClick={off}>Switch Off</Button>
                <Button className='button3' onClick={toggle}>Toggle Value</Button>
            </div>
            <div className='switch'>
                <p>Current value: <Switch checked={value} /></p>
            </div>

        </>
    )
}
