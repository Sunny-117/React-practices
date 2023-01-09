import { ModalProps } from "./type";

export const getPrizeModalProps = function (prizeName: string) : ModalProps {
   return {
    title: '中奖啦',
    image: '/public/img/draw_lucky_prize.png',
    desc: `恭喜您获得${prizeName}`,
    closeTxt: '点击继续',
    isLucky: true
   };
}