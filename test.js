var bestCoordinate = function (towers, radius) {
    let xMax = Number.MIN_VALUE, yMax = -Number.MAX_VALUE
    for (const tower of towers) {
        let x = tower[0], y = tower[1];
        xMax = Math.max(xMax, x);
        yMax = Math.max(yMax, y)
    }
    let cx = 0, cy = 0;
    let maxQuality = 0;
    for (let x = 0; x <= xMax; x++) {
        for (let y = 0; y <= yMax; y++) {
            const coordinate = [x, y]
            let quality = 0;
            for (const tower of towers) {

            }
        }
    }
}

console.log(bestCoordinate([[1, 2, 5], [2, 1, 7], [3, 1, 9]], 2))