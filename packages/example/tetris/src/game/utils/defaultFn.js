//默认核心策略
const coreStrategy = {
  rotate: function rotate(matrix) {
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
  },
};

//导入默认coreStrategy,未使用
if (!localStorage.getItem("coreStrategy")) {
  localStorage.setItem("coreStrategy", JSON.stringify(coreStrategy));
}
export default coreStrategy;
