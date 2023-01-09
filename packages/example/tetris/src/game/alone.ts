// import { randomCreateBox } from "./box";
import { NewGame } from "./game";
import isMobile from './utils/checkServices'
import { beginDJ, getState } from "./utils/frenzyDj";
import { startTicker, suspenceTicker } from "./ticker";
export class Alone {
    private _game: NewGame;
    constructor(game: NewGame) {
        this._game = game;
        // this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
        this._game._emitter.on('gameover', this.gameLose.bind(this));
        let configSingle = JSON.parse(localStorage.getItem('configSingle') as string);
        if (configSingle.pattern === 'dj') {
            this._game._emitter.on('eliminateLine', this.DJ);
        }
        if (isMobile()) {

        } else {
            window.onkeydown = this.handlerKeyDown.bind(this)
        }
    }
    // createBoxStrategy() {
    //     const box = randomCreateBox();
    //     return box;
    // }
    DJ() {
        if (!getState()) {
            beginDJ();
        }
    }
    gameLose() {
        alert('游戏结束');
        window.location.replace('/')
        // this._game.endGame();
        // gameoverAll();
        // getGameoverHandler()();
    }
    start() {
        this._game.start();
    }
    //在index.ts里导出该函数，在Game组件里绑定
    handlerButton(order: string) {
        switch (order) {
            case "ArrowDown":
                suspenceTicker();
                this._game.moveBoxToDown();
                startTicker();
                break;
            case "ArrowLeft":
                this._game.moveBoxToLeft();
                break;
            case "ArrowRight":
                this._game.moveBoxToRight();
                break;
            case "ArrowUp":
                this._game.rotateBox();
                break;
            default: break;
        }
    }
    handlerKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case "ArrowDown":
                suspenceTicker();
                this._game.controlToDown();
                startTicker();
                break;
            case "ArrowLeft":
                this._game.moveBoxToLeft();
                break;
            case "ArrowRight":
                this._game.moveBoxToRight();
                break;
            case "ArrowUp":
                this._game.rotateBox();
                break;
            default: break;
        }
    }
}