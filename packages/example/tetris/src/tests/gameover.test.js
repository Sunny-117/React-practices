import { isBoxOverFlow } from "../game/hit";

test("box累积到顶部返回true", () => {
  const map = [
    [0, -1, 0],
    [0, -1, 0],
    [0, -1, 0],
  ];
  expect(isBoxOverFlow(map)).toBe(true);
});
