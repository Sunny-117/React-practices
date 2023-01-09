export default function deepClone(target) {
  if (target === null || typeof target !== "object") return target;
  let res = Array.isArray(target) ? [] : {};
  const keys = [
    ...Object.getOwnPropertySymbols(target),
    ...Object.keys(target),
  ];
  for (let key of keys) {
    res[key] = deepClone(target[key]);
  }
  return res;
}
