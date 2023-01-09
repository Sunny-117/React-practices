import { createElement } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';

import { NavBarProps } from '../../common/type';

import './index.css';

export default (props: NavBarProps) => {
  const {title, icon, onIconClick} = props;

  return (
    <View className="navbar">
      <Image onClick={()=>{(onIconClick())}} className="navbar-back" resizeMode={"contain"} source={{uri: icon}}></Image>
      <View className="navbar-title">{title}</View>
    </View>
  );
}