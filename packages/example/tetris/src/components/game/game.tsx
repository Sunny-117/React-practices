import React, { useState, useEffect } from "react";
import {
  initSelfGame,
  initRivalGame,
  operateInMobile,
  getEmitter,
  initAloneGame,
  gameoverAll,
  ExternalState,
  initTestGame,
} from "../../game";
import Block from "../block";
// import Score from "../score";
import "./game.scss";
import isMobile from "../../game/utils/checkServices";
import OperateInMobile from "../operateInMobile";
interface Props {
  type: string;
  //阶段1：直接传入init函数
  // initGame: () => ExternalState;
  //阶段2：传入一个config对象，然后根据config动态导入plugins和Component，然后返回。
  //渲染Socre组件
  // renderScore?: () => ReactElement;
}
const Game: React.FC<Props> = ({ type }) => {
  const mapRef = React.useRef<number[][]>([]);
  const [map, setMap] = useState<number[][]>(mapRef.current);
  //判断用户设备
  const userAgent = React.useRef<boolean>(isMobile());
  const setMapRef = (_map: number[][]) => {
    mapRef.current = _map;
    setMap(mapRef.current);
  };
  // const currentGame = React.useRef<ExternalState | null>(null);
  // const [score, setScore] = React.useState(0);
  const [cG, setCG] = React.useState<ExternalState | null>(null);
  useEffect(() => {
    getEmitter().on("startGame", () => {
      console.log("接收到开始命令");
      if (type === "self") {
        initSelfGame(mapRef, setMapRef);
      } else if (type === "rival") {
        initRivalGame(mapRef, setMapRef);
      } else if (type === "test") {
        initTestGame(mapRef, setMapRef);
      } else {
        // let cG = initAloneGame(mapRef, setMapRef);
        // cG.getEmitter().on("addScore", () => {
        //   setScore(cG.getScore());
        // });
        setCG(initAloneGame(mapRef, setMapRef));
      }
    });
    return () => {
      gameoverAll();
      console.log("注销");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="gameZone">
      {/* 暂时单个导入，后期考虑遍历render */}
      {cG && cG.renderScore ? cG.renderScore() : ""}
      {/* {type === "alone" ? <Score score={score}></Score> : ""} */}
      <div className="gameWindow">
        {/* <div className="container"></div> */}
        {map.map((item, i) => {
          return (
            <div style={{ display: "flex" }} className="row" key={i}>
              {item.map((_, j) => {
                return (
                  <div key={j} className="row_item">
                    <Block type={mapRef.current[i][j]}></Block>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {userAgent.current && (type === "self" || type === "alone") ? (
        <OperateInMobile operationFunc={operateInMobile} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Game;
