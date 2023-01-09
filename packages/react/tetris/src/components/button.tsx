import React from "react";
import { themeConfig } from "../game/config";
type Props = {
  callback?: Function;
  width?: string;
  height?: string;
  children: string;
};

const Button = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  const { width = "", height = "", children, callback = () => {} } = props;
  return (
    <button
      className="button"
      style={{
        backgroundColor: themeConfig[configTheme][99],
        border: `1px solid ${themeConfig[configTheme][99]}`,
        color: "whitesmoke",
        borderRadius: "4px",
        width: width,
        height: height,
        cursor: "pointer",
      }}
      onClick={(e) => {
        callback(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
