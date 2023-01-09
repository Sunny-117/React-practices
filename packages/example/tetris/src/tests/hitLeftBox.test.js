import { hitLeftBoxAndBorder } from "../game/hit";

test("box左边界触碰box返回true", () => {
  const box = {
    x: 2,
    y: 0,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  };
  const map = [
    [0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  expect(hitLeftBoxAndBorder(box, map)).toBe(true);
});
