import React, { useState } from 'react'
import AtTypography from '.';
import ClipboardJS from 'clipboard'


export const Test = () => {
    const [editableStr, setEditableStr] = useState('This is an editable text.');
    const [isSuccess, setIsSuccess] = useState(false)
    const res = new ClipboardJS('.btn', {
        // @ts-ignore
        text: function (trigger) {
            console.info(trigger, '成功');
            if (trigger) {
                setIsSuccess(true)
            }
            return trigger.getAttribute('data-clipboard-text');
        },
    });
    console.log(res, 'asmdl')
    return (
        <div>
            <button
                className="btn"
                data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
            >
                Copy to clipboard
                {isSuccess && '队'}
            </button>
            {/* <AtTypography
                editable={{
                    onChange: setEditableStr,
                }}
            >
                {editableStr}
            </AtTypography> */}
            {/* <AtTypography.Title
                level={1}
            >
                h1. Ant Design
            </AtTypography.Title>
            <AtTypography.Title
                level={2}
            >
                h1. Ant Design
            </AtTypography.Title>
            <AtTypography.Title
                level={3}
            >
                h1. Ant Design
            </AtTypography.Title>
            <AtTypography.Title
                level={4}
            >
                h1. Ant Design
            </AtTypography.Title> */}

        </div>
    )
}
