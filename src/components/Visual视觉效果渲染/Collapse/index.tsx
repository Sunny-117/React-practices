import { useState } from "react";

export function Collapse({ collapsed, children }) {

    const [isCollapsed, setIsCollapsed] = useState(collapsed);


    return (
        <div>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? "显示" : "隐藏"} 内容
            </button>
            <div

            >
                {children}
            </div>
        </div>
    );
}