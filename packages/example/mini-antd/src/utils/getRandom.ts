/**
 * 
 * @param min 最小值
 * @param max 最大值
 */
export const getRandom = (min:number,  max:number)=>{
    return Math.floor(Math.random()*(max-min)+min)
}