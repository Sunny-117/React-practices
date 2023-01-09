import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import "./coreStrategy.scss";

import { startGameSingle, initGameSelf, forceOverSelfGame } from "../../game";
import ErrorBoundary from "../../components/errorBoundary";
import Game from "../../components/game/game";
import CustomBox from "../../components/customBox";
import LightHouse from "../../components/lightHouse";
function MyEditor() {
  var coreStrategy = {
    rotate: `function rotate(matrix){
      let temp = [];
      const row = matrix.length;
      const col = matrix[0].length;
      for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
              const newRow = row - 1 - j;
              if (!temp[newRow]) {
                  temp[newRow] = [];
              }
              temp[newRow][i] = matrix[i][j];
          }
      }
      return temp;
  }`,
    boxShapeArr: [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [2, 0, 0],
        [2, 2, 0],
        [0, 2, 0],
      ],
      [
        [3, 0, 0],
        [3, 0, 0],
        [3, 3, 0],
      ],
      [
        [0, 0, 0],
        [0, 4, 0],
        [4, 4, 4],
      ],
      [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ],
    ],
  };
  // eslint-disable-next-line
  const [curLogic, setCurLogic] = React.useState("rotate");
  const [applyed, setApplyed] = React.useState(false);
  //用户离开时提示用户代码可能不会保存
  React.useEffect(() => {
    if (!applyed) {
      const listener = (e: any) => {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "are you sure ?";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return "are you sure ?";
      };
      window.addEventListener("beforeunload", listener);
      return () => {
        window.removeEventListener("beforeunload", listener);
      };
    }
  }, [applyed]);
  if (localStorage.getItem("coreStrategy")) {
    coreStrategy = JSON.parse(localStorage.getItem("coreStrategy") as string);
  } else {
    //储存上面默认的coreStrategy
    localStorage.setItem("coreStrategy", JSON.stringify(coreStrategy));
  }
  const [code, setCode] = React.useState(coreStrategy.rotate);
  const [error, setError] = React.useState("");
  const [boxShapeArr, setBoxShapeArr] = React.useState(
    coreStrategy.boxShapeArr
  );
  function setMatrix(matrix: number[][], index: number) {
    matrix = matrix.map((item) => {
      return item.map((i) => i);
    });
    boxShapeArr[index] = matrix;
    setBoxShapeArr([...boxShapeArr]);
  }
  return (
    <div className="editorArea">
      <div className="cb" id="customBox">
        {boxShapeArr.map((matrix, index) => (
          <CustomBox
            key={index}
            matrix={matrix}
            index={index}
            setMatrix={setMatrix}
          />
        ))}
      </div>
      {error ? <div>{error.toString()}</div> : ""}
      <Editor
        className="editor"
        id="editor"
        value={code}
        onValueChange={(code) => {
          setCode(code);
        }}
        highlight={(code) => highlight(code, languages.js, "javaScript")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: "1.5rem",
        }}
      />
      <nav className="menu" id="menu">
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

        <button
          className={`menu-item red ${curLogic === "rotate" ? "active" : ""}`}
        >
          <i className="iconfont icon-lingjiechuxunhuan"></i>
        </button>
        <button className="menu-item yellow">
          <i className="iconfont icon-move"></i>
        </button>
        {/* 应用 */}
        <button
          id="launch"
          className="menu-item blue"
          onClick={() => {
            // eslint-disable-next-line no-new-func
            const testCode = new Function(
              "matrix",
              ` 
            ${code}
            const res = rotate(matrix);
            if(!res){
              return matrix;
            }
            return res;
          `
            );
            const matrix1 = [
              [1, 1],
              [1, 1],
            ];
            try {
              const res = testCode(matrix1);
              if (
                !res ||
                !Array.isArray(res) ||
                !Array.isArray(res[0]) ||
                res.length !== res[0].length
              ) {
                throw Error(
                  `you should return a 2d array with value type number,and the shape should be square,
                 your result: ${res}
                `
                );
              }
              setError("");
              if (applyed) {
                forceOverSelfGame();
              } else {
                setApplyed(true);
              }
              coreStrategy.rotate = code;
              coreStrategy.boxShapeArr = boxShapeArr;
              localStorage.setItem(
                "coreStrategy",
                JSON.stringify(coreStrategy)
              );
              initGameSelf();
              startGameSingle();
            } catch (error) {
              setError(error as string);
            }
          }}
        >
          <i className="iconfont icon-yingyong"></i>
        </button>
        <button className="menu-item green" id="question">
          <i className="iconfont icon-icquestion"></i>
        </button>
      </nav>
    </div>
  );
}
// function CustomBoxArea() {
//   const defaultBoxShapeArr: number[][][] = [
//     [
//       [1, 1],
//       [1, 1],
//     ],
//     [
//       [2, 0, 0],
//       [2, 2, 0],
//       [0, 2, 0],
//     ],
//     [
//       [3, 0, 0],
//       [3, 0, 0],
//       [3, 3, 0],
//     ],
//     [
//       [0, 0, 0],
//       [0, 4, 0],
//       [4, 4, 4],
//     ],
//     [
//       [0, 5, 0, 0],
//       [0, 5, 0, 0],
//       [0, 5, 0, 0],
//       [0, 5, 0, 0],
//     ],
//   ];
//   const [boxShapeArr, setBoxShapeArr] = React.useState(defaultBoxShapeArr);
//   function setMatrix(matrix: number[][], index: number) {
//     matrix = matrix.map((item) => {
//       return item.map((i) => i);
//     });
//     boxShapeArr[index] = matrix;
//     setBoxShapeArr([...boxShapeArr]);
//   }
//   return (
//     <div className="cb">
//       {boxShapeArr.map((matrix, index) => (
//         <CustomBox
//           key={index}
//           matrix={matrix}
//           index={index}
//           setMatrix={setMatrix}
//         />
//       ))}
//     </div>
//   );
// }
type Props = {};

const CoreStrategy = (props: Props) => {
  const isLighten = localStorage.getItem("lightHouse");
  useEffect(() => {
    localStorage.setItem("lightHouse", "true");
  });
  return (
    <LightHouse lighten={isLighten ? false : true}>
      <div className="coreStrategy">
        <MyEditor />
        {/* <CustomBoxArea /> */}
        <div className="testArea">
          <ErrorBoundary>
            <Game type="test"></Game>
          </ErrorBoundary>
        </div>
      </div>
    </LightHouse>
  );
};

export default CoreStrategy;
