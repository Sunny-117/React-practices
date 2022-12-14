import { useState } from "react";

function Star({ marked, starId }) {
    return (
        <span star-id={starId} style={{ color: "#ff9933" }} role="button">
            {/* 空星，实星 */}
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
}
export function StarRating(props) {
    // rating: 实际得分
    const [rating, setRating] = useState(props.rating);
    // selection: hover时候的分数
    const [selection, setSelection] = useState(0);
    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute("star-id")) {
            val = event.target.getAttribute("star-id");
        }
        setSelection(val);
    };

    // 学到的TS知识
    type NewType = React.MouseEvent<HTMLElement>

    return (
        <div
            onMouseOut={() => hoverOver(null)}
            // 点击选中分数
            onClick={(event: NewType) => {
                //  这里的类型错误
                setRating((event.target as HTMLInputElement).getAttribute("star-id") || rating)
            }
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