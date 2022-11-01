import React, { useEffect, useState } from 'react'

export function Carousel(props) {
    let [i, setI] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            const { carouselItems } = props;
            setI((i + 1) % carouselItems.length)
        }, 500)
    }, [])


    return (
        <div>
            {i}
            {carouselItems[i]}
        </div>
    )
}
