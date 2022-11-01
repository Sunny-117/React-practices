import React, { useEffect, useState } from 'react'

export function Carousel({ carouselItems }) {
    const [i, setI] = useState(0)
    useEffect(() => {


    }, [i])

    return (
        <div>
            {carouselItems[0]}
        </div>
    )
}
