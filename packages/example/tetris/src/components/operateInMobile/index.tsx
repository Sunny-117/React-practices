import React from "react";
import { themeConfig } from "../../game/config";
import "./operateInMobile.scss";
type Props = {
  //控制函数
  operationFunc: (order: string) => void;
};

const OperateInMobile = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  const longPressureListener = React.useRef<{
    inter: NodeJS.Timeout | null;
    timeOut: NodeJS.Timeout | null;
  }>({
    inter: null,
    timeOut: null,
  });
  const { operationFunc: operateInMobile } = props;
  function longPressureArrowMainoperation() {
    longPressureListener.current.inter = setInterval(() => {
      operateInMobile("ArrowDown");
      // console.log("持续下降中");
    }, 100);
  }
  return (
    <div className="operateInMobile">
      <div className="content">
        <div
          className="arrowLeft"
          onTouchStart={() => {
            operateInMobile("ArrowLeft");
          }}
        >
          <svg
            className="icon"
            aria-hidden="true"
            style={{
              width: "50px",
              height: "50px",
              fill: `${themeConfig[configTheme][99]}`,
              cursor: "pointer",
            }}
          >
            <use xlinkHref="#icon-ArrowLeft"></use>
          </svg>
        </div>
        <div
          className="arrowMain"
          onTouchStart={(e) => {
            longPressureListener.current.timeOut = setTimeout(() => {
              longPressureArrowMainoperation();
            }, 500);
          }}
          // onTouchMove={() => {
          //   clearTimeout(Number(longPressureListener.current.timeOut));
          //   clearInterval(Number(longPressureListener.current.inter));
          //   longPressureListener.current.timeOut = null;
          //   longPressureListener.current.inter = null;
          // }}
          onTouchEnd={() => {
            if (longPressureListener.current.inter) {
              clearInterval(Number(longPressureListener.current.inter));
              longPressureListener.current.timeOut = null;
              longPressureListener.current.inter = null;
            } else {
              clearTimeout(Number(longPressureListener.current.timeOut));
              operateInMobile("ArrowUp");
            }
          }}
        >
          <svg
            className="icon"
            aria-hidden="true"
            style={{
              width: "50px",
              height: "50px",
              fill: `${themeConfig[configTheme][99]}`,
              cursor: "pointer",
            }}
          >
            <use xlinkHref="#icon-lingjiechuxunhuan"></use>
          </svg>
        </div>
        <div
          className="arrowRight"
          onTouchStart={() => {
            operateInMobile("ArrowRight");
          }}
        >
          <svg
            className="icon"
            aria-hidden="true"
            style={{
              width: "50px",
              height: "50px",
              fill: `${themeConfig[configTheme][99]}`,
              cursor: "pointer",
            }}
          >
            <use xlinkHref="#icon-ArrowRight"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OperateInMobile;
