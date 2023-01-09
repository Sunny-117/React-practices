import React from "react";
import { startGameSingle } from "../../game";
import { useNavigate } from "react-router";
import "./options.scss";
interface Props {}

export const Options = (props: Props) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="homeOptions">
        <div className="overlay"></div>
        <ul className="myOptions">
          <li
            className="alone"
            onClick={() => {
              navigate("/single");
              // setGameoverHandler(() => {
              //   setPattern("option");
              // });
              setTimeout(() => {
                startGameSingle();
                //可以加个倒计时
              }, 1000);
            }}
          >
            单人模式
          </li>
          <li
            className="online"
            onClick={() => {
              navigate("/mult");
              // setPattern("mult");
              // setGameoverHandler(() => {
              //   setPattern("option");
              // });
              // setTimeout(() => {
              //   startGame();
              //   //可以加个倒计时
              // }, 1000);
            }}
          >
            多人对战
          </li>
          <li
            className="set"
            onClick={() => {
              navigate("/config");
            }}  
          >
            设置
          </li>
          <li
            className="help"
            onClick={() => {
              navigate("/help");
            }}
          >
            帮助
          </li>
          <li
            className="more"
            onClick={() => {
              // window.open("https://github.com/serendipityApe/tetris");
              navigate("/more");
            }}
          >
            关于
          </li>
        </ul>
      </div>
    </div>
  );
};
