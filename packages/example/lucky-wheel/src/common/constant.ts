import { ModalProps, NavBarProps } from "./type";

// 未中奖 ModalProps
export const noPrizeModalProps : ModalProps = {
  title: '未中奖',
  image: '/public/img/draw_lucky_prize.png',
  desc: '谢谢您的参与',
  closeTxt: '知道了',
  isLucky: false
}