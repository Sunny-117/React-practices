import { useEffect } from "react";
import styles from "./Modal.css";

export function Modal({ isVisible = false, title, content, footer, onClose }) {
    useEffect(() => {
        // 监听事件
        document.addEventListener("keydown", keydownHandler);
        // 取消监听
        return () => document.removeEventListener("keydown", keydownHandler);
    });

    function keydownHandler({ key }) {
        // esc 键，关闭模态框
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    }
    // 控制模态框显示
    return !isVisible ? null : (
        <div className={styles["modal"]} onClick={onClose}>
            <div
                className={styles["modal-dialog"]}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles["modal-header"]}>
                    <h3 className={styles["modal-title"]}>{title}</h3>
                    <span className={styles["modal-close"]} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={styles["modal-body"]}>
                    <div className={styles["modal-content"]}>{content}</div>
                </div>
                {footer && <div className={styles["modal-footer"]}>{footer}</div>}
            </div>
        </div>
    );
}