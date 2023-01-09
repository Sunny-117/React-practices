import { io, Socket } from "socket.io-client"

// import { browserHistory } from 'react-router-dom'
// console.log(browserHistory.getCurrentLocation().pathname)
let socket: Socket;
export function initMessage(name: string, isHost: boolean) {
    const pathArr = window.document.location.pathname.split('/');
    const nameSpace = pathArr[pathArr.length - 1];
    let arr = nameSpace.split('-');
    const roomId = arr[arr.length - 2];
    // http://118.195.129.130:9999/
    socket = io(`http://118.195.129.130:9999/${nameSpace}`, {
        forceNew: false,
        auth: {
            name: name,
            roomId
        },
        query: {
            name: name,
            isHost: isHost
        }
    })
    socket.on("connect", () => {
        console.log('链接成功');
    })
    socket.on("limitUser", () => {
        // alert("当前房间人数已达上限，您可以自己创建新房间");
        // window.location.href = "/mult";
        console.log('limitUser')
    });
}
export const message = {
    on(...args: [ev: string, listener: (...args: any[]) => void]) {
        return socket.on(...args);
    },
    emit(...args: [ev: string, listener?: any]) {
        return socket.emit(...args);
    },
    disconnect() {
        return socket.disconnect();
    },
    isConnect() {
        return socket ? true : false
    }
}

// function query(arg0: string, arg1: { auth: any; }, arg2: { name: any; }, query: any, arg4: { name: string; isHost: boolean; }): Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> {
//     throw new Error("Function not implemented.");
// }
// export function onMessage(...args: [ev: string, listener: (...args: any[]) => void]) {
//     return socket.on(...args);
// }