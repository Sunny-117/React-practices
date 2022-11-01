import React, { useEffect, useState } from 'react'

export function Carousel({ carouselItems }) {
    let [i, setI] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setI((i + 1) % carouselItems.length)
        }, 500)
    })
    return (
        <div>
            {i}
            {carouselItems[i]}
        </div>
    )
}
