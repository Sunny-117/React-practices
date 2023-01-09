import React from "react";
import { themeConfig } from "../game/config";
interface Props {
  type: number;
}

const Block = React.memo((props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  const typeToColorMap: { [key: number]: string } = themeConfig[configTheme];
  return (
    <div
      style={{
        backgroundColor: typeToColorMap[props.type],
        width: "20px",
        height: "20px",
        border: `1px solid ${typeToColorMap[99]}`,
        boxShadow: "inset 0 0 1px 1px white",
        color: "whitesmoke",
      }}
    >
      {/* {props.type} */}
    </div>
  );
});
export default Block;
