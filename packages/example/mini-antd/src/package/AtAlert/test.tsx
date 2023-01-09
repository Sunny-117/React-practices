import React from 'react'
import { AtAlert } from '.'

export const Test = () => {
    return (
        <div>
            <AtAlert message="Success Text" closable type="success" />;
            <AtAlert message="Success Text" type="success" />;
            <AtAlert message="Success Text" type="success" />;
            <AtAlert message="Success Text" type="success" />;
        </div>
    )
}
