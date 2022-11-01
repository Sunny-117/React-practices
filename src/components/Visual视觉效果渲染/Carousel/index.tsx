import React from 'react'

export function Carousel({ carouselItems }) {

    return (
        <div>
            {carouselItems.map((Item, index) => {
                return <Item />
            })}
        </div>
    )
}
