import { createElement } from "rax";
import View from "rax-view";

import '../../public/css/common.css';
import './index.css';

import NavBar from '../../components/NavBar';
import CouponList from "../../components/CouponList";


export default function Prize(props) {

  const { history } = props;
  return (
    <View className="prize">
      <NavBar onIconClick={() => {history.goBack()}} icon="https://mayandev.oss-cn-hangzhou.aliyuncs.com/blog/left-arrow.png" title="中奖页面"/>
      <CouponList></CouponList>
    </View>
  );
}