import { useState } from "react";

function Star({ marked, starId }) {
    console.log(starId)
    return (
        <span star-id={starId} style={{ color: "#ff9933" }} role="button">
            {/* 空星，实星 */}
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
}

export function StarRating(props) {
    // 分数显示
    const [rating, setRating] = useState(
        typeof props.rating == "number" ? props.rating : 0
    );
    // 鼠标移入效果
    const [selection, setSelection] = useState(0);
    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute("star-id"))
            val = event.target.getAttribute("star-id");
        setSelection(val);
    };
    return (
        <div
            // 鼠标移入效果
            onMouseOut={() => hoverOver(null)}
            // 点击选中分数
            onClick={(event: any) => {
                // TODO: 这里的类型错误
                setRating(event.target.getAttribute("star-id") || rating)
            }
                // onClick={(event) => {
                //     setRating(event.target.getAttribute("star-id") || rating)
                // }
            }
            onMouseOver={hoverOver}
        >
            {/* 创建5个组件 */}
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1} `}
                    marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
}