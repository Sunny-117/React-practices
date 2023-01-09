import { hitBottomBox } from "../game/hit";

test("box底部触碰box返回true", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  };
  const map = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  expect(hitBottomBox(box, map)).toBe(true);
});
