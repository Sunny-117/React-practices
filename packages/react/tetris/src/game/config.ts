export type configSingle = {
    difficulty: "common" | 'simple' | 'hard' | 'hardest';
    pattern: 'usually' | 'dj';
    theme: 'green' | 'blue' | 'yellow'
}

const defaultConfig: configSingle = {
    difficulty: "common",
    pattern: "usually",
    theme: 'green'
};

function setDefaultConfig() {
    if (!localStorage.getItem('configSingle')) {
        localStorage.setItem("configSingle", JSON.stringify(defaultConfig));
    }
}
setDefaultConfig();   //在game/index.ts中引入，总会在开始时执行

//游戏配置项
export const gameRow = 10;
export const gameCol = 16;

export const moveDownTimeInterval = 300

export const configGame = {
    simple: {
        row: gameRow,
        col: gameCol,
        speed: 1500,
        speedFactor: 0.8,
        speedMin: 500,
        originSpeed: 1500,
        grade: 1
    },
    common: {
        row: gameRow,
        col: gameCol,
        speed: 1000,
        speedFactor: 0.7,
        speedMin: 400,
        originSpeed: 1000,
        grade: 2
    },
    hard: {
        row: gameRow,
        col: gameCol,
        speed: 500,
        speedFactor: 0.6,
        speedMin: 200,
        originSpeed: 500,
        grade: 3
    },
    hardest: {
        row: gameRow,
        col: gameCol,
        speed: 300,
        speedFactor: 0.2,
        speedMin: 50,
        originSpeed: 300,
        grade: 4
    }
}

export const themeConfig: { [key: string]: { [key: number]: string } } = {
    //0: 背景底色
    //99: 背景边框颜色及衍生物颜色
    //1-n: 下落中方块颜色
    //-1: 堆积方块颜色
    green: {
        0: "#CADCB6",
        1: "#1F8258",
        2: "#B2BF88",
        3: "#1E7870",
        4: "#218C47",
        5: "#218C47",
        [-1]: '#1E7870',
        99: '#c1dfc4'
    },
    blue: {
        0: "#e0f1f4",
        1: "#88abda",
        2: "#3cbce5",
        3: "#8ec1ea",
        4: "#3bbee8",
        5: "#3bbee8",
        [-1]: '#2e59a7',
        99: '#ace0f9'
    },
    yellow: {
        // #ECD9C7
        0: "#DFD7C2",
        1: "#b37745",
        2: "#AA9649",
        3: "#9f5221",
        4: "#DA9233",
        5: "#DA9233",
        [-1]: '#FDCF00',
        99: '#e2d1c3'
    },
    classic: {

    }
}
// let curConfig: configSingle = JSON.parse(localStorage.getItem("configSingle") as string);

// export let currentConfig = configGame[curConfig.difficulty]
export function getConfig(currentConfig: configSingle) {
    return configGame[currentConfig.difficulty];
}
// export function resetSpeed() {
//     currentConfig.speed = currentConfig.originSpeed;
// }

// export function updateState() {
//     curConfig = JSON.parse(localStorage.getItem("configSingle") as string);
//     currentConfig = configGame[curConfig.difficulty];
//     resetSpeed();
// }