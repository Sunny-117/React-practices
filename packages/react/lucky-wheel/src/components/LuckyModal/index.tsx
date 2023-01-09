import { createElement, useContext } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';

import { AppContext } from '../../common/context';

import './index.css';
import { ModalProps } from '../../common/type'
const modalPrizeBg = '/public/img/draw_money_fly.png';
const cacelBtnImg = '/public/img/draw_modal_cancel.png';

/**
 * 中奖后提示 Modal
 */
export default (props: ModalProps) => {
  console.log(props);
  const { title, desc, image, closeTxt, isLucky } = props;
  const { setShowModal } = useContext(AppContext);

  // 中奖视图，如果未中奖，不显示奖品图片
  const showPrizeImg = () => {
    return isLucky ? (
      <Image resizeMode="contain" className="modal-prize-image" source={{ uri: image }}></Image>
    ) : null;
  }
  // 如果未中奖，不显示背景
  const showPrizeBg = () => {
    return isLucky ? (
      <Image resizeMode="contain" className="modal-prize-bg" source={{ uri: modalPrizeBg }}></Image>
    ) : null;
  }

  // 关闭 Modal
  const closeModal = () => {
    console.log('close');
    
    setShowModal(false);
  }

  return (
    <View className="lucky-modal">
      <View className="modal-container">
        {/* 关闭 Modal 的 icon */}
        <View className="modal-cancel" onClick={() => {closeModal()}}>
          <Image style={{ width: 82, height: 100 }} resizeMode="contain" source={{ uri: cacelBtnImg }}></Image>
        </View>
        <View className="modal-title-container">
          <View className="modal-title">{title}</View>
          <View className="modal-desc">{desc}</View>
        </View>
        {/* 显示中奖图片 */}
        {showPrizeImg()}
        <View className="modal-btn" onClick={() => {closeModal()}}>
          {closeTxt}
        </View>
      </View>
      {/* 显示中奖图片背景 */}
      {showPrizeBg()}
      <View className="modal-mask"></View>
    </View>
  );
}