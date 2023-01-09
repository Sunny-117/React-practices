
export default function isMobile() {
  const userAgent = navigator.userAgent;
  const res = userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i
  );
  if (res) {
    return true;
  } else {
    return false;
  }
}

// if (isMobile()) {
//   console.log("是移动端");
// } else {
//   console.log("是PC端");
// }
