import React from "react";
import Background from "../background";
import "./index.scss";
interface Props {}

const Explain = (props: Props) => {
  return (
    <Background>
      <div className="explain">
        <div className="single">
          <h3>单人模式</h3>
          <div className="compute">
            <h4>电脑端</h4>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Uparrow"></use>
              </svg>
              <span>旋转</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Leftarrow"></use>
              </svg>
              <span>向左移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Rightarrow"></use>
              </svg>
              <span>向右移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Downarrow"></use>
              </svg>
              <span>向下移动</span>
            </p>
          </div>
          <div className="mobile">
            <h4>手机端</h4>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-lingjiechuxunhuan"></use>
              </svg>
              <span>点击：旋转</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-lingjiechuxunhuan"></use>
              </svg>
              <span>长按：向下移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-ArrowLeft"></use>
              </svg>
              <span>点击：向左移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-ArrowRight"></use>
              </svg>
              <span>点击：向右移动</span>
            </p>
          </div>
        </div>
        {/* <div className="mult">
          <h3>多人模式</h3>
          <div className="compute">
            <h4>电脑端</h4>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Uparrow"></use>
              </svg>
              <span>旋转</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Leftarrow"></use>
              </svg>
              <span>向左移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Rightarrow"></use>
              </svg>
              <span>向右移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Downarrow"></use>
              </svg>
              <span>向下移动</span>
            </p>
          </div>
          <div className="mobile">
            <h4>手机端</h4>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-lingjiechuxunhuan"></use>
              </svg>
              <span>点击：旋转</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-lingjiechuxunhuan"></use>
              </svg>
              <span>长按：向下移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-ArrowLeft"></use>
              </svg>
              <span>点击：向左移动</span>
            </p>
            <p>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-ArrowRight"></use>
              </svg>
              <span>点击：向右移动</span>
            </p>
          </div>
        </div> */}
      </div>
    </Background>
  );
};

export default Explain;
