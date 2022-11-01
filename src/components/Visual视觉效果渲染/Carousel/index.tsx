import React, { useEffect, useState } from 'react'

export function Carousel({ carouselItems }) {
    let [i, setI] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setI((i + 1) % carouselItems.length)
        }, 1000)
    }, [i])

    return (
        <div>
            {i}
            {carouselItems[i]}
        </div>
    )
}
