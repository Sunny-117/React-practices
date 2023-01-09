
/**
 * 优惠券 Props
 */
export interface CouponProps {
  // 优惠券图片
  image: string,
  // 优惠券金额
  couponAmount: number,
  // 优惠限额
  couponLimit: number,
  // 优惠券类型
  couponType: string,
  // 起始事件
  couponStarTime: string,
  // 失效时间
  couponExpireTime: string
  // 去使用跳转了解
  useLink: string
}

/**
 * 中奖提示框 Props
 */
export interface ModalProps {
  // 标题
  title: string,
  // 描述
  desc: string,
  // 图片
  image: string,
  // 关闭按钮文字
  closeTxt: string,
  // 是否中奖
  isLucky: boolean
}

/**
 * 抽奖按钮状态
 */
export interface ButtonCondition {
  // 最早时间
  min: number,
  // 最晚时间
  max: number,
  // 按钮显示文字
  name: string,
  // 按钮样式
  style: string,
  // 是否禁用
  disabled: boolean
}


// 按钮 Props
export interface ButtonProps {
  // 点击事件
  onClick: ClickFunc
}

// 函数接口
interface ClickFunc {
  (): void
}

// 转盘奖品
export interface WheelPrize {
  // 奖品id
  id: number,
  // 奖品图标
  icon: string,
  // 奖品名称
  name: string,
  // 是否为中奖奖品
  isPrize: boolean,
  // 样式
  style: object
}

// 导航栏
export interface NavBarProps {
  // 左侧图标
  icon: string,
  // 导航栏标题
  title: string,
  // 图标点击函数
  onIconClick: ClickFunc
}