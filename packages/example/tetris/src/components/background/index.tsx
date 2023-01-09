import React from "react";
import './index.scss'
interface Props {
  children: any;
}

const Background = (props: Props) => {
  return (
    <div className="mainBackground">
      <div className="overlay"></div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Background;
