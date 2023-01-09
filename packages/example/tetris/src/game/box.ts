import { rotate } from "./matrix";
// import { NewGame } from "./game";
export interface BoxType {
    x: number;
    y: number;
    shape: number[][];
    type: number;
    rotate: Function;
    setRotate: Function;
    getNextRotateShapeInAdvance: Function
    getShadowBox: (distance: number) => Box
}
export class Box implements BoxType {
    x: number;
    y: number;
    shape: number[][];
    type: number;
    constructor(options: { x?: number; y?: number; shape?: number[][]; type?: number } = {}) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.type = options.type || 1;
        this.shape = options.shape || [
            [2, 0, 0],
            [2, 2, 0],
            [0, 2, 0],
        ];
    }

    private _rotates: any[] = [];
    private _rotateIndex = 0;
    rotate(nextShape?: number[][]) {
        const rotateHandler: Function = this._rotates[this._rotateIndex];
        if (!rotateHandler) return;
        if (nextShape) {
            this.shape = nextShape;
        } else {
            this.shape = rotateHandler(this.shape);
        }
        this._rotateIndex++;
        if (this._rotateIndex >= this._rotates.length) {
            this._rotateIndex = 0;
        }
    }
    getNextRotateShapeInAdvance() {
        const rotateHandler: Function = this._rotates[this._rotateIndex];
        if (!rotateHandler) return;
        return rotateHandler(this.shape);
    }
    setRotate(rotates?: any[]) {
        if (rotates) {
            this._rotates = rotates;
        }
    }
    getShadowBox(distance: number) {
        let shadowBox = new Box({
            x: this.x,
            y: this.y,
            shape: this.shape,
            type: 99
        });
        shadowBox.y += distance;
        return shadowBox;
    }
}
//使用策略模式控制box旋转方案
const boxInfos: { [key: number]: { type: number; shape: number[][]; rotateStrategy?: any[] } } = {
    1: {
        type: 1,
        shape: [
            [1, 1],
            [1, 1],
        ],
    },
    2: {
        type: 2,
        shape: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
        rotateStrategy: [rotate, (m: number[][]) => rotate(rotate(rotate(m)))],
    },
    3: {
        type: 3,
        shape: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
        rotateStrategy: [rotate, rotate, rotate, rotate],
    },
    4: {
        type: 4,
        shape: [
            [0, 0, 0],
            [0, 4, 0],
            [4, 4, 4],
        ],
        rotateStrategy: [rotate, rotate, rotate, rotate],
    },
    5: {
        type: 5,
        shape: [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ],
        rotateStrategy: [rotate, (m: number[][]) => rotate(rotate(rotate(m)))],
    },
};
export function createBox(options: { x?: number; y?: number; shape?: number[][]; type?: number } = {}) {
    let { x, y, shape, type } = options
    return new Box({ x, y, shape, type });
}
//使用工厂模式创建Box
export function new_randomCreateBox(boxInfos: { [key: number]: { type: number; shape: number[][]; rotateStrategy?: any[] } }) {
    function getRandomBoxInfo() {
        const max = Object.keys(boxInfos).length;
        // const type = 5;
        const type = Math.floor(Math.random() * max + 1);
        return boxInfos[type];
    }
    const { type } = getRandomBoxInfo();
    return new_createBoxByType(type, boxInfos);
}
export function new_createBoxByType(type: number, boxInfos: { [key: number]: { type: number; shape: number[][]; rotateStrategy?: any[] } }) {
    const box = new Box({ type });
    const { shape, rotateStrategy } = boxInfos[type];
    box.setRotate(rotateStrategy);
    box.shape = shape;
    return box;
}

export function randomCreateBox() {
    const { type } = getRandomBoxInfo();
    return createBoxByType(type);
}
export function createBoxByType(type: number) {
    const box = new Box({ type });
    const { shape, rotateStrategy } = boxInfos[type];
    box.setRotate(rotateStrategy);
    box.shape = shape;
    return box;
}
function getRandomBoxInfo() {
    const max = Object.keys(boxInfos).length;
    // const type = 5;
    const type = Math.floor(Math.random() * max + 1);
    return boxInfos[type];
}