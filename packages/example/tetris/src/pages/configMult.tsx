import React from "react";
import Background from "../components/background";
import uniqid from "uniqid";
import "./createRoom.scss";
import { useNavigate } from "react-router-dom";
import { themeConfig } from "../game/config";
import Button from "../components/button";
interface Props {}

const ConfigMult = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  let navigate = useNavigate();
  const [nickName, setNickName] = React.useState<string>(
    localStorage.getItem("myName") as string
  );
  return (
    <Background>
      <div className="createRoom">
        <div className="inputs">
          <div className="item classic">
            <input
              className="cleanSlide"
              style={{ color: themeConfig[configTheme][1] }}
              type="cickName"
              placeholder="输入一个名字用以展示"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
            <label htmlFor="你的名字">你的名字</label>
          </div>
          <div className="item readOnly">
            <input
              className="cleanSlide"
              type="cickName"
              placeholder="房间名"
              value={nickName ? `${nickName}的房间` : `请先输入您的名字`}
              readOnly
            />
            <label htmlFor="房间名">房间名</label>
          </div>
        </div>
        <Button
          width="230px"
          callback={() => {
            localStorage.setItem("myName", nickName as string);
            const roomId = `dRoom-${uniqid()}-${nickName}`;
            navigate(roomId, {
              replace: true,
              state: { nickName },
            });
            window.navigator.clipboard
              .writeText(`${window.location.href}`)
              .then((res) => {
                alert("房间地址已复制，发送给好友开始对战");
              });
            // initGame();
          }}
        >
          创建房间
        </Button>
      </div>
    </Background>
  );
};

export default ConfigMult;
