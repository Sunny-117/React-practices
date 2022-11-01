import { useState } from "react";

export function Collapse({ collapsed }) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);


    return (
        <div>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? "显示" : "隐藏"} 内容
            </button>
            <div
                className="collapse-content"
                // 决定显示和折叠
                style={isCollapsed ? style.collapsed : style.expanded}
                // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
                aria-expanded={isCollapsed}
            >
                {props.children}
            </div>
        </div>
    );
}