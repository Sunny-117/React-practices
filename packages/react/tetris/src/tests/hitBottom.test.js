import { gameCol, gameRow } from "../game";
import { hitBottomBorder } from "../game/hit";

test("box触碰底部返回true", () => {
  const box = {
    x: 0,
    y: 8,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  const map = new Array(gameRow).fill(new Array(gameCol).fill(0));
  expect(hitBottomBorder(box, map)).toBe(true);
});
