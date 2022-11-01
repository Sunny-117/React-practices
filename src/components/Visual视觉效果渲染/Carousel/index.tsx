import React, { useState } from 'react'

export function Carousel({ carouselItems }) {
    const [i, setI] = useState(0)

    return (
        <div>
            {carouselItems[0]}
        </div>
    )
}
