import { createElement } from 'rax';
import View from 'rax-view';

import './index.css';
import { ButtonCondition, ButtonProps } from '../../../common/type'


const btnCondition: Array<ButtonCondition> = 
    [{min: 0,max: 8,name: '未开始',style: 'unbegin',disabled: true},
    {min: 8,max: 18,name: '马上抽奖',style: 'ongoing',disabled: false},
    {min: 18,max: 24,name: '已结束',style: 'over',disabled: true}]

const disabled = () => {
  return false;
}

export default (props: ButtonProps) => {

  // 获取当前的小时时间
  const curHour = new Date().getHours();

  let curBtnCond : ButtonCondition;

  // 判断按钮的状态
  for (const item of btnCondition) {
    if (curHour >= item.min && curHour < item.max) {
      curBtnCond = item;
      break;
    }
  }

  return (
    <View onClick={curBtnCond.disabled ? () => {disabled()} : props.onClick} className="lucky-button-container">
      <View className={`lucky-button ${curBtnCond.style}`}>
        {curBtnCond.name}
      </View>
    </View>
  );
};
