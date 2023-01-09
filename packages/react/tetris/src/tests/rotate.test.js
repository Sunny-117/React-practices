import { rotate } from "../game/matrix";

test("旋转", () => {
  const box = {
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  const res = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  console.log(rotate);
  expect(rotate(box.shape)).toEqual(res);
});
