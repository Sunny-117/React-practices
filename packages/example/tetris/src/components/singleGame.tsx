import React from "react";
import Game from "./game/game";
import { gameoverAll, initGameSelf } from "../game";
import { themeConfig } from "../game/config";
interface Props {}

export const SingleGame = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  React.useEffect(() => {
    initGameSelf();
  }, []);
  return (
    <div>
      <div
        className="return"
        onClick={() => {
          gameoverAll();
        }}
      >
        <svg
          className="icon"
          aria-hidden="true"
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "20px",
            left: "20px",
            fill: `${themeConfig[configTheme][99]}`,
            cursor: "pointer",
          }}
        >
          <use xlinkHref="#icon-fanhui"></use>
        </svg>
      </div>
      <div
        className="gaming"
        style={{
          display: "inline-block",
          marginTop: "8rem",
        }}
      >
        <Game type="alone"></Game>
      </div>
    </div>
  );
};
