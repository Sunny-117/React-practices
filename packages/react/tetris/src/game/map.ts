// import { currentConfig } from "./config";
import { StateManagement } from './StateManagement'
import { BoxType } from "./box";
import deepClone from "./utils/deepClone";

const currentConfig = new StateManagement().getCurrentConfig();
const gameCol = currentConfig.col
const gameRow = currentConfig.row
//初始化map
export function initMap(setMapRef: Function) {
    let _map = [];
    for (let i = 0; i < gameCol; i++) {
        const arr: Array<number> = [];
        for (let j = 0; j < gameRow; j++) {
            arr.push(0);
        }
        _map.push(arr);
    }
    setMapRef(_map);
    // setMap(_map);
}

//fixed the end of the box on the map
export function addBoxtoMap(box: BoxType, map: React.MutableRefObject<number[][]>, setMapRef: Function) {
    let _map: number[][] = deepClone(map.current);
    for (let i = 0; i < box.shape.length; i++) {
        for (let j = 0; j < box.shape[0].length; j++) {
            const x = box.x + j;
            const y = box.y + i;
            if (y < _map.length && _map[y][x] > 0) {
                _map[y][x] = -1;
            }
        }
    }
    setMapRef(_map);
}
export function isEliminateLine(map: React.MutableRefObject<number[][]>) {
    let lines: Array<number> = [];
    for (let i = 0; i < map.current.length; i++) {
        const arr = map.current[i];

        const boo = arr.every((v) => {
            return v === -1;
        });

        if (boo) {
            lines.push(i);
        }
    }
    return lines;
}
export function eliminateLine(map: React.MutableRefObject<number[][]>, setMapRef: Function, lines: number[]) {
    let _map: number[][] = deepClone(map.current);

    const mapCol = _map[0].length;

    lines.forEach((n) => {
        _map.splice(n, 1);
        // 补上新的行
        _map.unshift(new Array(mapCol).fill(0));
    });
    setMapRef(_map);
}

//在最后一行加上空白格为1的一行
export function addLine(map: React.MutableRefObject<number[][]>, setMapRef: Function) {
    let _map: number[][] = deepClone(map.current);
    const row = _map[0].length;
    let line = new Array(row).fill(-1);
    let randomBlank = Math.floor(Math.random() * row);
    line[randomBlank] = 0;
    _map.push(line);
    setMapRef(_map);
}

