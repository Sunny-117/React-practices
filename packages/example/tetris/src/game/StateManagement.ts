import { getConfig, gameRow, gameCol } from './config'

interface StateManagementType {
    _speed: number;
    _score: number;
    _grade: number;
}
export class StateManagement implements StateManagementType {
    currentConfig = getConfig(JSON.parse(localStorage.getItem("configSingle") as string));
    _speed: number = 0;
    _score: number = 0;
    _grade: number;
    constructor() {
        this.initSpeed();
        this._grade = this.currentConfig.grade;
    }
    //score相关
    addScore(lanes: number) {
        //根据同时消的行数与难度依次提高分数
        //simple：2 4 8 16
        //hardest: 8 16 32 64
        this._score += this._grade << lanes;
        console.log(this._score);
        this.isSpeedUp(this._score);
    }
    getScore() {
        return this._score;
    }
    //speed相关
    initSpeed() {
        this._speed = this.currentConfig.originSpeed;
    }
    isSpeedUp(score: number) {
        //当分数等于指定值时，提高速度 
        //6 12 24 48 / 12 24 48 96 / 24 48 96 192 / 48 96 192 384
        //ps:埋个彩蛋，可以通过灵活的消行来跳过判断
        let nodes = [0b000011 << this._grade, 0b000110 << this._grade, 0b001100 << this._grade, 0b011000 << this._grade];
        switch (score) {
            case nodes[0]:
                this.speedUp();
                break;
            case nodes[1]:
                this.speedUp();
                break;
            case nodes[2]:
                this.speedUp();
                break;
            case nodes[3]:
                this.speedUp();
                break;
            default: break;
        }
    }
    speedUp() {
        console.log('upup')
        this._speed = this._speed * this.currentConfig.speedFactor;
        if (this._speed < this.currentConfig.speedMin) {
            this._speed = this.currentConfig.speedMin;
        }
        console.log('speed:' + this._speed);
    }
    resetSpeed() {
        this.initSpeed();
    }
    updatedState() {
        // this.updatedState();
    }
    getSpeed() {
        return this._speed;
    }
    getCurrentConfig() {
        return this.currentConfig;
    }
}

export class MStateManagement extends StateManagement {
    currentConfig = {
        row: gameRow,
        col: gameCol,
        speed: 1000,
        speedFactor: 0.7,
        speedMin: 400,
        originSpeed: 1000,
        grade: 2
    };
    constructor() {
        super();
        this._grade = 1;
        this.initSpeed();
    }
}