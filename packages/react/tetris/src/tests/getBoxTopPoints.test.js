import { getBoxTopPoints } from "../game/matrix";

test("获取box顶部所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
  };
  const box2 = {
    x: 0,
    y: 0,
    shape: [
      [1, 0, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
  };
  expect(getBoxTopPoints(box.shape)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
  expect(getBoxTopPoints(box2.shape)).toEqual([
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
  ]);
});
