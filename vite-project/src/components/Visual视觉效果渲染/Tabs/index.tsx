import { useState } from "react";
import styles from "./Tabs.css";

export function TabItem(props) {
    return <div {...props} />;
}

export function Tabs(props) {
    const [bindIndex, setBindIndex] = useState(props.defaultIndex);
    const changeTab = newIndex => {
        if (typeof props.onTabClick === "function") props.onTabClick(newIndex);
        setBindIndex(newIndex);
    };
    const items = props.children.filter(item => item.type.name === TabItem.name);

    return (
        <div className={styles["wrapper"]}>
            <div className={styles["tab-menu"]}>
                {items.map(({ props: { index, label } }) => (
                    <button
                        onClick={() => changeTab(index)}
                        key={index}
                        className={bindIndex === index ? styles["focus"] : ""}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className={styles["tab-view"]}>
                {items.map(({ props }) => (
                    <div
                        {...props}
                        className={styles["tab-view_item"]}
                        key={props.index}
                        style={{ display: bindIndex === props.index ? "block" : "none" }}
                    />
                ))}
            </div>
        </div>
    );
}