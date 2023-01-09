import { Button } from 'antd'
import React, { useState } from 'react'
import AtDrawer from '.'

export default function Test() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const closeDrawer = () => {
        setOpen(false)
    }

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Button type="primary" onClick={closeDrawer}>
                close
            </Button>
            <AtDrawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </AtDrawer>
        </div>
    )
}
