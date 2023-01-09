import React from "react";
import "./style.css";

export default function Modal(props: any) {
    var defaultProps = {
        //默认属性
        bg: "rgba(0,0,0,.5)",
    };
    var datas = Object.assign({}, defaultProps, props);

    return (
        <div
            onClick={(e) => {
                // @ts-ignore
                if (e.target.className === "modal") {
                    //去除事件冒泡
                    datas.onClose(); //自己不做处理，抛出一个事件,这点非常重要
                }
            }}
            className="modal"
            style={{
                background: datas.bg,
            }}
        >
            <div className="modal-center">{datas.children}</div>
        </div>
    );
}
