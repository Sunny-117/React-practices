import React from "react";
import "./menu.scss";
type Props = {};

const Menu = (props: Props) => {
  return (
    <nav className="menu">
      <input
        type="checkbox"
        className="menu-open"
        name="menu-open"
        id="menu-open"
      />
      <label className="menu-open-button" htmlFor="menu-open">
        <span className="lines line-1"></span>
        <span className="lines line-2"></span>
        <span className="lines line-3"></span>
      </label>

      <a href="#" className="menu-item red">
        <i className="iconfont icon-lingjiechuxunhuan"></i>
      </a>
      <a href="#" className="menu-item yellow">
        <i className="iconfont icon-move"></i>
      </a>
      <a href="#" className="menu-item blue">
        <i className="iconfont icon-yingyong"></i>
      </a>
      <a href="#" className="menu-item green">
        <i className="iconfont icon-icquestion"></i>
      </a>
    </nav>
  );
};

export default Menu;
