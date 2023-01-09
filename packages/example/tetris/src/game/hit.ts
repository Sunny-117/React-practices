import { BoxType } from "./box";
import { getBoxBottomPoints, getBoxLeftPoints, getBoxRightPoints, getMapTopXToY } from "./matrix";

export function hitBottomBorder(box: BoxType, map: number[][]) {
    const { points } = getBoxBottomPoints(box.shape);
    const gameRow = map.length;
    for (let i = 0; i < points.length; i++) {
        if (points[i].y + 1 + box.y >= gameRow) {
            return true;
        }
        return false;
    }
}

export function hitBottomBox(box: BoxType, map: number[][]) {
    const { points } = getBoxBottomPoints(box.shape);

    return points.some((point) => {
        // 看看 这个位置上 在 map 里面 是不是有 其他的 box 的

        const col = point.x + box.x;
        const row = point.y + box.y + 1;

        return map[row][col] < 0;
    });
}
// export function hitLeftBorder(box: BoxType, map: number[][]) {
//     const points = getBoxLeftPoints(box.shape);
//     return points.some((point) => {
//         return point.x + box.x <= 0
//     })
// }

export function hitLeftBoxAndBorder(box: BoxType, map: number[][]) {
    const points = getBoxLeftPoints(box.shape);
    return points.some((point) => {
        const col = point.x + box.x;
        const row = point.y + box.y;
        return col <= 0 || map[row][col - 1] < 0;
    })
}

export function hitRightBoxAndBorder(box: BoxType, map: number[][]) {
    const points = getBoxRightPoints(box.shape);
    return points.some((point) => {
        const col = point.x + box.x;
        const row = point.y + box.y;
        return col >= map[0].length - 1 || map[row][col + 1] < 0;
    })
}

export function isBoxOverFlow(map: number[][]) {
    const row = 0;
    return map[row].some((point) => {
        return point < 0
    })
}
export function isIllegalBoxInMap(box: BoxType, map: number[][]) {
    const shape = box.shape;
    const row = shape.length;
    const col = shape[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const xx = box.x + j;
            const yy = box.y + i;
            if (xx < 0 || xx >= map[0].length) return true;
            if (yy < 0 || yy >= map.length) return true;
            if (map[yy][xx] < 0) {
                return true;
            }
        }
    }

    return false;
}
//获取底部映射距离
export function getMappingModelDistance(box: BoxType, map: number[][]): number {
    const { points: boxBottomPoints, relativeY } = getBoxBottomPoints(box.shape);
    const mapXtoY = getMapTopXToY(map.slice(box.y + relativeY));
    let distance = map.length;
    for (let i = 0; i < boxBottomPoints.length; i++) {
        let curPoint = boxBottomPoints[i];
        let curPointX = boxBottomPoints[i].x + box.x;
        const curMapPointY = mapXtoY.has(curPointX) ? mapXtoY.get(curPointX) as number + box.y + relativeY : map.length;
        distance = Math.min(curMapPointY - (box.y + curPoint.y + 1), distance);
    }
    return distance;
}
//获取接触面数量
export function getContactSurfaceNumber(box: BoxType, map: number[][]): number {
    const distance = getMappingModelDistance(box, map);
    const mappingModelBox = { ...box, x: box.x + distance, y: box.y + distance };
    const { points: bottomPoints } = getBoxBottomPoints(mappingModelBox.shape);
    const leftPoints = getBoxLeftPoints(mappingModelBox.shape);
    const rightPoints = getBoxRightPoints(mappingModelBox.shape);
    let bottomContactSurface = 0;
    let leftContactSurface = 0;
    let rightContactSurface = 0;
    for (let i = 0; i < bottomPoints.length; i++) {
        const curY = mappingModelBox.y + bottomPoints[i].y;
        const curX = mappingModelBox.x + bottomPoints[i].x
        //触底或触碰其它box
        if (map.length - 1 === curY || map[curX][curY + 1] > 0) bottomContactSurface++;
    }
    for (let i = 0; i < leftPoints.length; i++) {
        const curY = mappingModelBox.y + leftPoints[i].y;
        const curX = mappingModelBox.x + leftPoints[i].x
        if (curX === 0 || map[curX - 1][curY] > 0) leftContactSurface++;
    }
    for (let i = 0; i < rightPoints.length; i++) {
        const curY = mappingModelBox.y + rightPoints[i].y;
        const curX = mappingModelBox.x + rightPoints[i].x
        if (curX === map[0].length - 1 || map[curX + 1][curY] > 0) rightContactSurface++;
    }
    return bottomContactSurface + leftContactSurface + rightContactSurface;
}
export function getMaxContactSurfaceNumberXCoordinate(box: BoxType, map: number[][]): number {
    // const originX = box.x;
    let maxContactSurfaceNumber = 0;
    let maxX = 0;
    for (let i = 0; i < map[0].length; i++) {
        let tmpContactSurfaceNumber = getContactSurfaceNumber({ ...box, x: box.x = i }, map)
        if (tmpContactSurfaceNumber > maxContactSurfaceNumber) {
            maxContactSurfaceNumber = tmpContactSurfaceNumber;
            maxX = i;
        }
    }
    return maxX;
}