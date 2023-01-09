import React, { useRef, useState } from 'react'
import { getRandom } from '../../utils/getRandom'

export const AtSliderVerification = () => {

    const [kouLeft, setKouLeft] = useState(getRandom(210, 420))
    const [shouLeft, setShouLeft] = useState(getRandom(0, 210));
    return (
        <div style={{
            position: 'relative',
            width: '500px',
            height: '500px',
            border: '1px solid',
        }}>
            <div style={{
                position: 'absolute',
                left: kouLeft,
                top: '100px',
                width: '80px',
                height: '80px',
                background: 'grey',
                cursor: 'pointer'
            }}>


            </div>
            <div
                style={{
                    position: 'absolute',
                    left: shouLeft,
                    top: '100px',
                    width: '80px',
                    height: '80px',
                    background: 'green',
                    cursor: 'pointer'
                }}>手</div>
        </div>
    )
}
