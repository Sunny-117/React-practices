import { getBoxRightPoints } from "../game/matrix";

test("获取box右边界所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  expect(getBoxRightPoints(box.shape)).toEqual([
    { x: 2, y: 0 },
    { x: 0, y: 1 },
  ]);
});
