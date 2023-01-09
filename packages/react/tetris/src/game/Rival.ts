import { gameoverAll } from ".";
import { new_createBoxByType } from "./box";
import { NewGame } from "./game";
import { message } from "./message";
import { PenaltyStragety } from "./compete";
export class Rival {
    private _game: NewGame;
    constructor(game: NewGame) {
        this._game = game;
        message.on("moveBoxToRight", this.moveBoxToRight.bind(this))
        message.on("moveBoxToLeft", this.moveBoxToLeft.bind(this))
        message.on("moveBoxToDown", this.moveBoxToDown.bind(this))
        message.on("controlToDown", this.controlToDown.bind(this))
        message.on("rotateBox", this.rotateBox.bind(this))
        message.on("createBox", this.createBoxListener.bind(this))
        message.on("gameover", this.gameWon.bind(this))
        message.on('syncPenalty', (penaltyStrategys) => {
            let orders: PenaltyStragety[] = JSON.parse(penaltyStrategys)
            console.log(orders)
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].order === 'addLine') {
                    this._game.syncAddLine.call(this._game, Number(orders[i].cum))
                } else {
                    this._game[orders[i].order].apply(this._game)
                }
            }
        })
    }
    _boxType = 0;
    _firstAccept = false;
    createBoxListener(info: string) {
        this._boxType = Number(info);
        if (!this._firstAccept) {
            this.start();
            this._firstAccept = true;
        } else {
            //由于需要视图同步，a'需要等待a消行并创建新的box.a'需要延迟调用
            this._game.eliminateLineHandler();
        }
    }
    gameWon() {
        alert('游戏结束,你赢了');
        gameoverAll();
    }
    createBoxStrategy() {
        return new_createBoxByType(this._boxType, this._game.getBoxInfos());
    }
    start() {
        // this._game._isAutoDown = false;
        this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
        this._game.start();

    }
    moveBoxToRight() {
        this._game.moveBoxToRight();
    }
    moveBoxToLeft() {
        this._game.moveBoxToLeft();
    }
    moveBoxToDown() {
        this._game.moveBoxToDown();
    }
    controlToDown() {
        this._game.controlToDown(true);
    }
    rotateBox() {
        //可能有问题
        this._game.rotateBox();
    }
}