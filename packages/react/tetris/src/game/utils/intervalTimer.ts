export default function intervalTimer(intervalTime: number) {
  let t = 0;
  return (n: number) => {
    t += n;
    if (t >= intervalTime) {
      t = 0;
      return true;
    }
    return false;
  };
}