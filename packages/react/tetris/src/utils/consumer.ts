const consumer = (fn: Function, time: number) => {
    const tasks: Function[] = [];
    let timer: number | null = null;
    return function (...args: any[]) {
        tasks.push(fn.bind(undefined, ...args));
        if (timer == null) {
            tasks.shift()!.call(undefined);
            timer = window.setInterval(() => {
                if (tasks.length <= 0) {
                    window.clearInterval(timer!);
                    timer = null;
                } else {
                    tasks.shift()!.call(undefined);
                }
            }, time)
        }
    }
}
export default consumer;