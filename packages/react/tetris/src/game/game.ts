import { BoxType, createBox, new_randomCreateBox } from "./box";
import render from "./render";
// import Score from "../components/score";
import { hitBottomBorder, hitBottomBox, hitLeftBoxAndBorder, hitRightBoxAndBorder, isBoxOverFlow, isIllegalBoxInMap, getMappingModelDistance } from "./hit";
import { addBoxtoMap, eliminateLine, isEliminateLine } from "./map";
// import { moveDownTimeInterval } from ".";
import { StateManagement, MStateManagement } from "./StateManagement";
import { addTicker, removeTicker, startTicker } from "./ticker";
import mitt from "mitt";
import deepClone from "./utils/deepClone";
import React from "react";
export class Game {
    private _mapRef: React.MutableRefObject<number[][]>;
    private _setMapRef: Function;
    private _activeBox: any; // -> boxtype
    private _createBoxStrategy: any;
    public _stateManagement: StateManagement
    constructor(mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
        this._mapRef = mapRef;
        // this._activeBox = box;
        this._setMapRef = setMapRef;
        this._stateManagement = new StateManagement();
        /*
        //暴漏分数添加函数，方便测试用 
        const that = this;
        let test = function (lane: number) {
            that._stateManagement.addScore(lane);
            that._emitter.emit('addScore')
        }
        // @ts-ignore
        window._admin = {
            addScore: test
        }; */
    }
    start() {
        this.addBox();
        addTicker(this.handleTicker, this);
        startTicker();
    }
    //游戏开始每帧执行的函数，包括box向下移动与render;
    handleTicker(i: number) {
        this.handleBoxMoveDown(i);
        render(this._activeBox, this._mapRef, this._setMapRef)
    }

    _isAutoDown = true;
    _n = 0;
    handleBoxMoveDown(i: number) {
        // if (!this._game) return;
        if (this._isAutoDown) {
            this._n += i;
            if (this._n >= this._stateManagement.getSpeed()) {
                this._n = 0;
                this.moveBoxToDown();
                // message.emit('moveBoxToDown')
            }
        }
    }
    render() {
        render(this._activeBox, this._mapRef, this._setMapRef);
    }
    _emitter = mitt();
    getEmitter() {
        return this._emitter;
    }
    moveBoxToDown() {
        if (
            hitBottomBorder(this._activeBox, this._mapRef.current) ||
            hitBottomBox(this._activeBox, this._mapRef.current)
        ) {
            addBoxtoMap(this._activeBox, this._mapRef, this._setMapRef);
            let lines = isEliminateLine(this._mapRef);
            if (lines.length) {
                eliminateLine(this._mapRef, this._setMapRef, lines);
                this._emitter.emit('eliminateLine', lines.length);
                this._stateManagement.addScore(lines.length);
                this._emitter.emit('addScore')
            }
            if (isBoxOverFlow(this._mapRef.current)) {
                removeTicker(this.handleTicker, this);
                this._emitter.emit('gameover');
                return;
            }
            // this._activeBox = randomCreateBox();
            // console.log('创建')
            this.addBox();
            return;
        }
        this._activeBox.y++;
        this._emitter.emit('moveBoxToDown')
    }
    addBox() {
        this._activeBox = this._createBoxStrategy();
    }
    addLine(): number {
        let _map: number[][] = deepClone(this._mapRef.current);
        const row = _map[0].length;
        let line = new Array(row).fill(-1);
        let randomBlank = Math.floor(Math.random() * row);
        line[randomBlank] = 0;
        _map.shift();
        _map.push(line);
        this._setMapRef(_map);
        console.log(randomBlank + 'randomBlank')
        return randomBlank
    }
    syncAddLine(appointed: number) {
        let _map: number[][] = deepClone(this._mapRef.current);
        const row = _map[0].length;
        let line = new Array(row).fill(-1);
        line[appointed] = 0;
        _map.shift();
        _map.push(line);
        this._setMapRef(_map);
        console.log(appointed + 'appointed')
        return appointed
    }
    moveBoxToLeft() {
        //检查左侧碰撞
        if (hitLeftBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x--;
    }
    moveBoxToRight() {
        if (hitRightBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x++;
    }
    rotateBox() {
        const boxInAdvance = createBox({
            x: this._activeBox.x,
            y: this._activeBox.y,
            shape: this._activeBox.getNextRotateShapeInAdvance(),
        });
        //检测box是否可以旋转
        if (isIllegalBoxInMap(boxInAdvance, this._mapRef.current)) return;
        this._activeBox.rotate(boxInAdvance.shape);
    }
    setBox(box: BoxType) {
        this._activeBox = box;
    }
    setCreateBoxStrategy(strategy: any) {
        this._createBoxStrategy = strategy;
    }
    endGame() {
        removeTicker(this.handleTicker, this);
        this._emitter.all.clear();
    }
    forceOverGame() {
        alert('游戏关闭');
        window.location.replace('/')
        // removeTicker(this.handleTicker, this);
        // this._emitter.all.clear();
        // getGameoverHandler()();
    }
    getGameState() {
        return this._stateManagement;
    }
}

export class NewGame {
    private _mapRef: React.MutableRefObject<number[][]>;
    private _setMapRef: (_map: number[][]) => void;
    private _createBoxStrategy: Function = this.defaultCreateBoxStrategy;
    private _activeBox!: BoxType
    private _activeBoxs !: BoxType[]
    private _distance: number = 0;
    private _controlToDownFlag: string = 'teleport'
    public _stateManagement: StateManagement
    constructor(mapRef: React.MutableRefObject<number[][]>, setMapRef: (_map: number[][]) => void) {
        this._mapRef = mapRef;
        this._setMapRef = setMapRef;
        this._stateManagement = new StateManagement();
    }
    //默认创建box策略
    defaultCreateBoxStrategy() {
        return new_randomCreateBox(this.getBoxInfos());
    }
    setCreateBoxStrategy(strategy: Function) {
        this._createBoxStrategy = strategy;
    }
    registerPlugins(...Plugins: any[]) {
        Plugins.forEach(Plugin => {
            new Plugin(this);
        })
    }
    start() {
        this.addBox();
        this.emitStarted();
        addTicker(this.handleTicker, this);
        startTicker();
        this.render();
    }
    //游戏开始每帧执行的函数，包括box向下移动与render;
    handleTicker(i: number) {
        this.render();
    }
    render() {
        render(this._activeBoxs, this._mapRef, this._setMapRef);
    }
    _emitter = mitt();
    getEmitter() {
        return this._emitter;
    }
    eliminateLineHandler() {
        addBoxtoMap(this._activeBox, this._mapRef, this._setMapRef);
        let lines = isEliminateLine(this._mapRef);
        if (lines.length) {
            eliminateLine(this._mapRef, this._setMapRef, lines);
            this._emitter.emit('eliminateLine', lines.length);
            this._stateManagement.addScore(lines.length);
            this._emitter.emit('addScore')
        }
        if (isBoxOverFlow(this._mapRef.current)) {
            removeTicker(this.handleTicker, this);
            this._emitter.emit('gameover');
            return;
        }
        this.addBox();
    }
    // nn = 0;
    // mm = 0;
    // moveBoxToDownFlag = false;
    moveBoxToDown() {
        // if(this.moveBoxToDownFlag) return;
        // console.log(this.nn++)
        // this.moveBoxToDownFlag = true;

        if (
            hitBottomBorder(this._activeBox, this._mapRef.current) ||
            hitBottomBox(this._activeBox, this._mapRef.current)
        ) {
            this.eliminateLineHandler();
            return;
        }
        this._activeBox.y++;
        this._emitter.emit('moveBoxToDown');
        this._distance--;


        // console.log(this.mm++)
        // this.moveBoxToDownFlag = false;
        // addBoxtoMap();
        // console.log(getMappingModelDistance(this._activeBox, this._mapRef.current))

    }
    addBox() {
        this._activeBox = this._createBoxStrategy();
        this._activeBoxs = [this._activeBox];
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
    }
    setShdowBox() {
        this._distance = getMappingModelDistance(this._activeBox, this._mapRef.current)
        this._activeBoxs[1] = (this._activeBox.getShadowBox(this._distance));
    }
    addLineHandler(appointed?: number) {
        let _map: number[][] = deepClone(this._mapRef.current);
        const row = _map[0].length;
        let line = new Array(row).fill(-1);
        if (!appointed) {
            appointed = Math.floor(Math.random() * row);
        }
        line[appointed] = 0;
        _map.shift();
        _map.push(line);
        this._setMapRef(_map);
        return appointed
    }
    //惩罚插件
    addLine(): number {
        const cum = this.addLineHandler();
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
        return cum;
    }
    syncAddLine(appointed: number) {
        const cum = this.addLineHandler(appointed);
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
        return cum;
    }
    moveBoxToLeft() {
        //检查左侧碰撞
        if (hitLeftBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x--;
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
    }
    moveBoxToRight() {
        if (hitRightBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x++;
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
    }
    teleportToShdowBox() {
        this._activeBox.y += this._distance;
    }
    //excuate it when down key is pressed 
    controlToDown(isRival?: boolean) {
        switch (this._controlToDownFlag) {
            case 'teleport':
                this.teleportToShdowBox();
                this._emitter.emit('controlToDown');
                if (!isRival) this.eliminateLineHandler();
                break;
            case 'move':
                this.moveBoxToDown();
                break;
            default:
                break;
        }
    }
    //control how blocks fall
    setControlToDown(flag: 'teleport' | 'move') {
        this._controlToDownFlag = flag;
    }
    //旋转插件
    rotateBox() {
        const boxInAdvance = createBox({
            x: this._activeBox.x,
            y: this._activeBox.y,
            shape: this._activeBox.getNextRotateShapeInAdvance(),
        });
        //检测box是否可以旋转
        if (isIllegalBoxInMap(boxInAdvance, this._mapRef.current)) return;
        this._activeBox.rotate(boxInAdvance.shape);
        this._controlToDownFlag === 'teleport' && this.setShdowBox();
    }
    setBox(box: BoxType) {
        this._activeBox = box;
    }
    endGame() {
        removeTicker(this.handleTicker, this);
        this._emitter.all.clear();
    }
    getGameState() {
        return this._stateManagement;
    }
    //可以通过CoreStrategyPlugin修改
    getCoreStrategy() {
        return {
            //默认rotate
            rotate: function rotate(matrix: number[][]) {
                let temp: Array<any> = [];
                const row = matrix.length;
                const col = matrix[0].length;
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        const newRow: number = row - 1 - j;
                        if (!temp[newRow]) {
                            temp[newRow] = [];
                        }
                        temp[newRow][i] = matrix[i][j];
                    }
                }
                return temp;
            },
            boxShapeArr: [
                [
                    [1, 1],
                    [1, 1],
                ],
                [
                    [2, 0, 0],
                    [2, 2, 0],
                    [0, 2, 0],
                ],
                [
                    [3, 0, 0],
                    [3, 0, 0],
                    [3, 3, 0],
                ],
                [
                    [0, 0, 0],
                    [0, 4, 0],
                    [4, 4, 4],
                ],
                [
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                ],
            ]
        }
    }
    getBoxInfos(boxInfos?: { [key: number]: { type: number; shape: number[][]; rotateStrategy?: any[] } }) {
        if (boxInfos) {
            return boxInfos;
        } else {
            const rotate = this.getCoreStrategy().rotate;
            const boxShapeArr = this.getCoreStrategy().boxShapeArr;
            const boxInfos: { [key: number]: { type: number; shape: number[][]; rotateStrategy?: any[] } } = {
                1: {
                    type: 1,
                    shape: boxShapeArr[0],
                },
                2: {
                    type: 2,
                    shape: boxShapeArr[1],
                    rotateStrategy: [rotate, (m: number[][]) => rotate(rotate(rotate(m)))],
                },
                3: {
                    type: 3,
                    shape: boxShapeArr[2],
                    rotateStrategy: [rotate, rotate, rotate, rotate],
                },
                4: {
                    type: 4,
                    shape: boxShapeArr[3],
                    rotateStrategy: [rotate, rotate, rotate, rotate],
                },
                5: {
                    type: 5,
                    shape: boxShapeArr[4],
                    rotateStrategy: [rotate, (m: number[][]) => rotate(rotate(rotate(m)))],
                },
            };
            return boxInfos;
        }
    }
    //拟生命周期
    _startTask: Array<Function> = [];
    onStarted(callback: Function) {
        this._startTask.push(callback);
    }
    emitStarted() {
        this._startTask.forEach(cb => {
            cb();
        })
    }
}

class Plugin {
    game: NewGame;
    constructor(game: NewGame) {
        this.game = game;
    }
}

//控制activeBox是否自动下落
class TickerPlugin extends Plugin {
    constructor(game: NewGame) {
        super(game);
        game.onStarted(() => {
            addTicker(this.handleBoxMoveDown, this);
        })
    }
    _n = 0;
    handleBoxMoveDown(i: number) {
        this._n += i;
        if (this._n >= this.game.getGameState().getSpeed()) {
            this._n = 0;
            this.game.moveBoxToDown();
        }
    }
}

//是否使用用户自定义的核心策略：rotate,
class CoreStrategyPlugin extends Plugin {
    coreStrategy: { rotate: (matrix: number[][]) => number[][], boxShapeArr: number[][][] }
    constructor(game: NewGame) {
        super(game);
        this.coreStrategy = JSON.parse(localStorage.getItem('coreStrategy') as string);
        //设置默认coreStrategy
        if (!this.coreStrategy) {
            this.coreStrategy = {
                rotate: `function rotate(matrix){
                let temp = [];
                const row = matrix.length;
                const col = matrix[0].length;
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        const newRow = row - 1 - j;
                        if (!temp[newRow]) {
                            temp[newRow] = [];
                        }
                        temp[newRow][i] = matrix[i][j];
                    }
                }
                return temp;
            }` as any,
                boxShapeArr: [
                    [
                        [1, 1],
                        [1, 1],
                    ],
                    [
                        [2, 0, 0],
                        [2, 2, 0],
                        [0, 2, 0],
                    ],
                    [
                        [3, 0, 0],
                        [3, 0, 0],
                        [3, 3, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, 4, 0],
                        [4, 4, 4],
                    ],
                    [
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                    ],
                ]
            }
            localStorage.setItem('coreStrategy', JSON.stringify(this.coreStrategy))
        }
        // eslint-disable-next-line no-new-func
        this.coreStrategy.rotate = new Function('matrix', `
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
                window.clearInterval = (clearId) => { };
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
        const fakeTimer = new FakeTimer();
        //覆盖
        fakeTimer.install();
        function deepMatrix(matrix) {
            if (Array.isArray(matrix)) {
                const result = [];
                matrix.forEach((element) => {
                    result.push(deepMatrix(element));
                });
                return result;
            } else {
                return matrix;
            }
        }
        //深拷贝matrix,为了使setTimeout内部能修改矩阵，使用类nodejs的commonjs实现方法。
        //通过作用域隔离，modules导入，fakeTimer覆写,达到可以在setTimeout内部通过modules.matrix来在rotate执行后修改即将返回的matrix
        var modules = { matrix: deepMatrix(matrix) };
        //作用域隔离
        (
            function rotate(modules) {
                    ${this.coreStrategy.rotate};
                modules.matrix = rotate(modules.matrix);
            }
        )(modules)
        //执行
        fakeTimer.tick();
        //恢复
        fakeTimer.uninstall();
        return modules.matrix;
        `) as (matrix: number[][]) => number[][];
        game.getCoreStrategy = () => {
            return this.coreStrategy as { rotate: (matrix: number[][]) => number[][], boxShapeArr: number[][][] };
        };
        // var defaultBoxInfos = game.getBoxInfos();
        // game.getBoxInfos = () => {
        //     Object.keys(defaultBoxInfos).map((key, i) => {
        //         defaultBoxInfos[Number(key)].shape = this.coreStrategy.boxShapeArr[i];
        //         return defaultBoxInfos[Number(key)];
        //     })
        //     return defaultBoxInfos;
        // }
    }
}

//控制下落方式 默认为teleport
export class DownStrategyIsMovePlugin extends Plugin {
    constructor(game: NewGame) {
        super(game);
        this.game.setControlToDown('move');
    }
}
export const Plugins = {
    TickerPlugin,
    CoreStrategyPlugin,
    DownStrategyIsMovePlugin
}
// class Component {
//     game: NewGame;
//     ViewComponent: React.FC | React.Component
//     constructor(game: NewGame, ViewComponent: React.FC | React.Component) {
//         this.game = game;
//         this.ViewComponent = ViewComponent;
//     }
// }
// export class ScoreSystemComponent extends Component{
//     constructor(game: NewGame, ViewComponent: React.FC | React.Component) {
//         super(game, ViewComponent);
//         this.game.getEmitter().on('addScore', () => {

//         })
//     }
// }
export class MGame extends NewGame {
    constructor(mapRef: React.MutableRefObject<number[][]>, setMapRef: (_map: number[][]) => void) {
        super(mapRef, setMapRef);
        this._stateManagement = new MStateManagement();
    }
}