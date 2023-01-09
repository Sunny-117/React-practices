import { gameCol, gameRow } from "../game";
import { hitRightBoxAndBorder } from "../game/hit";

test("box触碰右边界返回true", () => {
  const box = {
    x: 8,
    y: 0,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  const map = new Array(gameRow).fill(new Array(gameCol).fill(0));
  expect(hitRightBoxAndBorder(box, map)).toBe(true);
});
