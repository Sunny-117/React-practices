//在js中使用
//覆写setTimeout,setInterval,尽可能以用户期望的顺序同步执行setTimeout,setInterval置空
// https://bigfrontend.dev/problem/create-a-fake-timer
class FakeTimer {
  constructor() {
    this.oSetTimeout = window.setTimeout;
    this.oClearTimeout = window.clearTimeout;
    this.oSetInterval = window.setInterval;
    this.oClearInterval = window.clearInterval;
    this.oDateNow = Date.now;
    this.taskQueue = [];
    this.currentTime = 0;
    this.id = 1;
  }
  install() {
    // replace
    Date.now = () => {
      return this.currentTime;
    };
    window.setTimeout = (callback, time, ...args) => {
      const tmpId = this.id++;
      this.taskQueue.push({
        callback,
        time: Date.now() + time,
        args,
        id: tmpId,
      });
      this.taskQueue.sort((a, b) => a.time - b.time);
      return tmpId;
    };
    window.clearTimeout = (clearId) => {
      this.taskQueue = this.taskQueue.filter((item) => item.id !== clearId);
    };
    window.setInterval = (callback, time, ...args) => {
      console.log(
        "To make sure the program work correctly,i overwriting window.setInterval in the context of your custom code snippet,so it has no effect"
      );
    };
    window.clearInterval = (clearId) => {};
  }

  uninstall() {
    // restore
    window.setTimeout = this.oSetTimeout;
    window.clearTimeout = this.oClearTimeout;
    window.setInterval = this.oSetInterval;
    window.clearInterval = this.oClearInterval;
    Date.now = this.oDateNow;
  }

  tick() {
    //trigger all callback
    while (this.taskQueue.length) {
      const { callback, time, args } = this.taskQueue.shift();
      this.currentTime = time;
      callback.apply(undefined, args);
    }
  }
}
export default FakeTimer;
