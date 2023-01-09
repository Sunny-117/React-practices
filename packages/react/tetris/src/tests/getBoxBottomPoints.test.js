import { getBoxBottomPoints } from "../game/matrix";

test("获取box底部所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
  };
  expect(getBoxBottomPoints(box.shape).points).toEqual([
    { x: 1, y: 2 },
    { x: 0, y: 1 },
    { x: 2, y: 0 },
  ]);
});
