import { createElement, useState, useEffect } from 'rax';
import { usePageHide } from 'rax-app';
import View from "rax-view";

import './index.css';
import { getSlognList } from '../../api/slognList';

const animationConfig = {
  // slogn 显示时间
  duration: 4000,
  // 旋转效果
  mode: 'ease-in-out'
}

export default () => {
  const [slogn, setSlogn] = useState({ name: '', url: '' });
  let interval = null;

  useEffect(() => {
    getSlognList().then((list: any) => {
      setSlogn(list[0]);
      interval = setInterval(() => {
        const index = Math.floor((Math.random() * list.length));
        setSlogn(list[index])
      }, 2000)
    })
  }, []);

  usePageHide(() => {
    // 注销计时函数
    clearInterval(interval);
  })



  return (
    <View className="slogn-main">
      <View>{slogn.name}</View>
    </View>
  );
};
