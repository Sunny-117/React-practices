import React from "react";
import Background from "../components/background";
interface Props {}

const More = (props: Props) => {
  return (
    <Background>
      <div className="more" style={{ color: "whitesmoke" }}>
        {/* <p>基于react,nodejs,websocket制作。</p> */}
        {/* <p>
          GitHub：
          <a
            style={{ color: "whitesmoke" }}
            href="https://github.com/serendipityApe/tetris"
          >
            https://github.com/serendipityApe/tetris
          </a>
        </p> */}
        <p>
          bug反馈：
          <a
            style={{ color: "whitesmoke" }}
            href="mailto:serendipityape@foxmail.com"
          >
            serendipityape@foxmail.com
          </a>
          <span> / </span>
          <a
            style={{ color: "whitesmoke" }}
            href="https://github.com/serendipityApe/tetris/issues/new"
          >
            issues
          </a>
        </p>
      </div>
    </Background>
  );
};

export default More;
