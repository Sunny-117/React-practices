import { getBoxLeftPoints2 } from "../game/matrix";

test("获取box左边界所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [0, 1],
      [1, 1]
    ],
  };
  expect(getBoxLeftPoints2(box.shape)).toEqual([
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]);
});
