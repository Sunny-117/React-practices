import React from "react";

import Block from "../block";
type Props = {
  matrix: number[][];
  index: number;
  setMatrix: (matrix: number[][], index: number) => void;
};

const CustomBox = ({ matrix, index, setMatrix }: Props) => {
  return (
    <div>
      {matrix.map((item, i) => {
        return (
          <div style={{ display: "flex" }} className="row" key={i}>
            {item.map((_, j) => {
              return (
                <div
                  key={j}
                  className="row_item"
                  onClick={() => {
                    matrix[i][j] = matrix[i][j] ? 0 : index + 1;
                    setMatrix(matrix, index);
                  }}
                >
                  <Block type={matrix[i][j]}></Block>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CustomBox;
