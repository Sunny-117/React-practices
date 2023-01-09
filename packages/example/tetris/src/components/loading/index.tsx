import React from "react";
import "./loading.scss";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="loading">
      <div className="elem elem-1"></div>
      <div className="elem elem-2"></div>
      <div className="elem elem-3"></div>
      <div className="elem elem-4"></div>
    </div>
  );
}; 

export default Loading;
