import React, { useEffect, useState } from 'react'

export function Carousel({ carouselItems }) {
    let [i, setI] = useState(0)
    useEffect(() => {
        setInterval(() => {
            i++
            if (i === 2) {
                i = 0;
            }
            setI(i)
        }, 500)

    }, [])

    return (
        <div>
            {carouselItems[0]}
        </div>
    )
}
