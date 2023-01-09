import React, { useEffect } from "react";
import "./lightHouse.scss";
type Props = {
  children: any;
  lighten: boolean;
};

const LightHouse = ({ children, lighten }: Props) => {
  const [step, setStep] = React.useState(0);
  useEffect(() => {
    const stepMessage = [
      { id: "customBox", text: "此处修改下落方块形状" },
      { id: "editor", text: "此处修改方块旋转策略" },
      { id: "menu", text: "此处展开菜单" },
      { id: "launch", text: "点击此处运行游戏" },
      //   { id: "question", text: "如有疑问可点击高亮处查看" },
    ];
    //检测祖先元素是否有定位
    function ancestralPosition(domParent: HTMLElement | null | undefined) {
      while (domParent) {
        let tmp = window.getComputedStyle(domParent)["position"];
        if (tmp && tmp !== "static") {
          return true;
        }
        domParent = domParent.parentElement;
      }
      return false;
    }
    if (lighten) {
      if (step < stepMessage.length) {
        const dom = document.getElementById(stepMessage[step].id);
        const domParent = dom?.parentElement;
        dom?.classList.add("circle-ripple");
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.style.width = window.innerWidth + "px";
        overlay.style.height = window.innerHeight + "px";
        domParent?.appendChild(overlay);
        const text = document.createElement("span");
        text.className = "lamplight";
        text.innerHTML = stepMessage[step].text;
        const domCoordinate = dom?.getBoundingClientRect();
        if (domCoordinate) {
          text.style.top = `${domCoordinate.top + domCoordinate.height / 2}px`;
          text.style.left = `${domCoordinate.right + 100}px`;
        }
        document.getElementById("root")?.appendChild(text);
        if (ancestralPosition(domParent)) {
          const overlayCoordinate = overlay.getBoundingClientRect();
          overlay.style.position = "relative";
          overlay.style.top = `${overlayCoordinate.top * -1}px`;
          overlay.style.left = `${overlayCoordinate.left * -1}px`;
        }
        const callback = () => {
          setStep((step) => step + 1);
        };
        dom?.addEventListener("click", callback);
        return () => {
          dom?.classList.remove("circle-ripple");
          domParent?.removeChild(overlay);
          document.getElementById("root")?.removeChild(text);
          dom?.removeEventListener("click", callback);
        };
      }
    }
  }, [lighten, step]);
  return <div>{children}</div>;
};

export default LightHouse;
