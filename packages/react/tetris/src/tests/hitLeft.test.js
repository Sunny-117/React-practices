import { gameCol, gameRow } from "../game";
import { hitLeftBoxAndBorder } from "../game/hit";

test("box触碰左边界返回true", () => {
  const box = {
    x: 1,
    y: 8,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  const map = new Array(gameRow).fill(new Array(gameCol).fill(0));
  expect(hitLeftBoxAndBorder(box, map)).toBe(false);
});
