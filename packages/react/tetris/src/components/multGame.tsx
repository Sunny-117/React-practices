import React from "react";
import Game from "./game/game";

import { message } from "../game/message";
import { initGameMult, startGame } from "../game";
import { debounce } from "../utils/debounce";
import Background from "./background";
import { useLocation } from "react-router-dom";
import Button from "./button";
import "./multGame.scss";
interface Props {}

export const MultGame = (props: Props) => {
  const [myName, setMyName] = React.useState<string | null>(
    localStorage.getItem("myName")
  );
  //游戏开始后隐藏开始游戏按钮
  const [isGameStart, setGS] = React.useState(false);
  const [rival, setRival] = React.useState("待加入......");

  React.useEffect(() => {
    console.log("加载完成");
    initGameAndReceive();
  }, []);
  function initGameAndReceive() {
    initGameMult(localStorage.getItem("myName") as string, isHost.current);
    console.log(message.isConnect());
    message.on("newUserName", (name) => {
      console.log(name + "加入房间");
      setRival(name);
    });
    if (!isHost.current) {
      console.log(isHost.current);
      message.on("hostStartGame", () => {
        startGame();
        console.log("接收到hostStartGame");
      });
    }
  }
  const location = useLocation();
  function getHost() {
    return decodeURI(location.pathname.split("-").pop() as string);
  }
  const isHost = React.useRef<boolean>(getHost() === myName);
  const setName = debounce((value: string) => {
    localStorage.setItem("myName", value);
  }, 500);
  React.useEffect(() => {
    document.title = `${getHost()}的房间`;
  });
  return (
    <div>
      {myName ? (
        <div>
          <div className="gaming">
            <div className="self">
              <Game type="self"></Game>
              <p className="hostName">{myName}</p>
              {isHost.current && !isGameStart ? (
                <Button
                  height="2rem"
                  callback={() => {
                    message.emit("hostStartGame");
                    startGame();
                    setGS(true);
                  }}
                >
                  开始游戏
                </Button>
              ) : (
                ""
              )}
            </div>
            <div className="rival">
              <Game type="rival"></Game>
              <p>{isHost.current ? rival : getHost()}</p>
            </div>
          </div>
        </div>
      ) : (
        <Background>
          <div>
            <input
              type="text"
              placeholder="输入名字用以展示"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                // initGameAndReceive();
                setMyName(localStorage.getItem("myName"));
              }}
            >
              确认
            </button>
          </div>
        </Background>
      )}
    </div>
  );
};
