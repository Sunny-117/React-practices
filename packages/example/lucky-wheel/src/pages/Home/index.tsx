import { createElement, useState } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';

import Slogn from '../../components/Slogn';
import Wheel from '../../components/Wheel';
import LuckyModal from '../../components/LuckyModal';

import '../../public/css/common.css';
import './index.css';

import { AppContext } from '../../common/context';
import { noPrizeModalProps } from '../../common/constant';

const titleBg = {
  uri: '/public/img/draw_title.png'
}
const bottomBg = {
  uri: '/public/img/draw_bg_bottom.png'
}
export default function Home(props: { history: any; }) {

  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState(noPrizeModalProps);
  const { history } = props;
  
  const modalView = () => {
    return showModal
          ? (<LuckyModal {...modalProps}/>)
          : null;
  }
  return (
    <AppContext.Provider value={{setShowModal, setModalProps}}>
      <View className="home">
        <View className="prize-list-link" onClick={() => history.push('/prize')}>奖品</View>
        <Image className="lucky-title" resizeMode="cover" source={titleBg} />
        <View className="lucky-main">
          <Slogn></Slogn>
          <Wheel></Wheel>
        </View>
        {modalView()}
        <Image className="lucky-bottom-bg" source={bottomBg}></Image>
      </View>
    </AppContext.Provider>
  );
}
