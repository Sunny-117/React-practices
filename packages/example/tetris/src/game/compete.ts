import deepClone from "./utils/deepClone";
export type PenaltyStragety = {
    order: 'addLine',
    cum: string | number
}
const _penaltyStragety: PenaltyStragety[] = [
    {
        order: 'addLine',
        cum: ''
    }
]


export function getPenaltyStrategy() {
    return _penaltyStragety;
}

export function randomPenaltyStrategy(): PenaltyStragety {
    const max = _penaltyStragety.length;
    let i = Math.floor(Math.random() * max);
    return deepClone(_penaltyStragety)[i];
}