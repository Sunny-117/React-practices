// import deepClone from "./utils/deepClone";

type Points = { x: number, y: number }[]
type XToY = Map<number,number>
//矩阵操作相关
export function getBoxBottomPoints(matrix: number[][]): {points:Points,relativeX:number,relativeY:number} {
    //[1,1,1]
    //[1,0,0]
    //[0,0,0]  获取宏观上的所有底部点，即 [{x:0,y:1},{x:1,y:0},{x:2,y:0}]
    let row = matrix.length - 1;
    const points: any[] = [];
    let relativeY = 0;
    let relativeX = 0;
    let flag = new Map<number, boolean>();
    function getEffectiveLastRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (matrix[row][j] > 0) {
                if (!flag.has(j)) {
                    flag.set(j, true);
                    points.push({ x: j, y: row });
                    relativeX = Math.max(relativeX, j);
                    relativeY = Math.max(relativeY, row);
                }
            }
        })
    }
    getEffectiveLastRow(row);
    //如果点未获取完，向上继续检测直到获取所有点
    while (points.length < matrix[0].length && --row >= 0) {
        getEffectiveLastRow(row);
    }
    return {points, relativeX, relativeY};
}
export function getBoxTopPoints(matrix: number[][]): Points {
    //[1,1,1]
    //[1,0,0]
    //[0,0,0]  获取宏观上的所有顶部点，即 [{x:0,y:0},{x:1,y:0},{x:2,y:0}]
    let row = 0;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveFirstRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (matrix[row][j] > 0) {
                if (!flag.has(j)) {
                    flag.set(j, true);
                    points.push({ x: j, y: row })
                }
            }
        })
    }
    getEffectiveFirstRow(row);
    //如果点未获取完，向上继续检测直到获取所有点
    while (points.length < matrix[0].length && ++row < matrix.length) {
        getEffectiveFirstRow(row);
    }
    return points;
}
export function getMapTopPoints(matrix: number[][]): Points {
    //[2,2,2]
    //[2,0,0]
    //[-1,-1,-1]  获取宏观上的所有type为-1的顶部点，即 [{x:0,y:2},{x:1,y:2},{x:2,y:2}]
    let row = 0;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveFirstRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (v === -1) {
                if (!flag.has(j)) {
                    flag.set(j, true);
                    points.push({ x: j, y: row })
                }
            }
        })
    }
    getEffectiveFirstRow(row);
    //如果点未获取完，向上继续检测直到获取所有点
    while (points.length < matrix[0].length && ++row < matrix.length) {
        getEffectiveFirstRow(row);
    }
    return points;
}
export function getMapTopXToY(matrix: number[][]): XToY {
    //[2,2,2]
    //[2,0,0]
    //[-1,-1,-1]  获取宏观上的所有type为-1的顶部点，即 [{x:0,y:2},{x:1,y:2},{x:2,y:2}]
    let row = 0;
    var XToY = new Map();
    let flag = new Map<number, boolean>();
    function getEffectiveFirstRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (v === -1) {
                if (!flag.has(j)) {
                    flag.set(j, true);
                    XToY.set(j, row);
                }
            }
        })
    }
    getEffectiveFirstRow(row);
    //如果点未获取完，向上继续检测直到获取所有点
    while (Object.keys(XToY).length < matrix[0].length && ++row < matrix.length) {
        getEffectiveFirstRow(row);
    }
    return XToY;
}
export function getBoxLeftPoints(matrix: number[][]): Points {
    //[0,1,1]
    //[1,1,0]
    //  获取左边届的点，即 [{x:0,y:1},{x:1,y:0}]
    let col = 0;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveFarLeftCol(col: number) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][col] > 0) {
                if (!flag.has(i)) {
                    flag.set(i, true)
                    points.push({ x: col, y: i })
                }
            }
        }
    }
    getEffectiveFarLeftCol(col);
    while (points.length < matrix.length && ++col <= matrix.length - 1) {
        getEffectiveFarLeftCol(col);
    }
    return points;
}
export function getBoxRightPoints(matrix: number[][]): Points {
    let col = matrix.length - 1;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveLastCol(col: number) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][col] > 0) {
                if (!flag.has(i)) {
                    flag.set(i, true)
                    points.push({ x: col, y: i })
                }
            }
        }
    }
    getEffectiveLastCol(col);
    while (points.length < matrix.length && --col >= 0) {
        getEffectiveLastCol(col);
    }
    return points;
}


//逆时针旋转90度
export function rotate(matrix: number[][]) {
    let temp: Array<any> = [];
    const row = matrix.length;
    const col = matrix[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const newRow: number = row - 1 - j;
            if (!temp[newRow]) {
                temp[newRow] = [];
            }
            temp[newRow][i] = matrix[i][j];
        }
    }
    return temp;
    //需复制一个matrix，不能直接修改
    // let temp = deepClone(matrix); 
    // function transposition(matrix: number[][]) {
    // //matrix: number[][]
    // const row = matrix.length;
    // const col = matrix[0].length;

    // for (let i = 0; i < row; i++) {
    //     for (let j = i; j < col; j++) {
    //         let tmp = matrix[i][j];
    //         matrix[i][j] = matrix[j][i];
    //         matrix[j][i] = tmp;
    //     }
    // }
    // return matrix;
    // }
    // return transposition(temp);
}
//算法可优化?应该有问题
export function getBoxLeftPoints2(matrix: number[][]) {
    const points: any[] = [];
    function getEffectiveLastRow() {
        for (let i = 0; i < matrix.length; i++) {
            if (points.length < matrix.length) {
                for (let j = 0; j < matrix[0].length; j++) {
                    if (matrix[i][j] > 0) {
                        points.push({ x: j, y: i });
                        break;
                    }
                }
            } else {
                break;
            }
        }
    }
    getEffectiveLastRow();
    return points;
}
