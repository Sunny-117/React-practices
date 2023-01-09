import { createElement, useState, useEffect } from 'rax';

import { getPrizeList } from '../../api/prizeList'
import View from 'rax-view';
import ScrollView from 'rax-scrollview';

import { CouponProps } from '../../common/type';

import Coupon from '../Coupon';

import './index.css';


export default () => {

  const [prizeList, setPrizeList] = useState([]);
  useEffect(() => {
    getPrizeList().then((res: any) => {
      console.log(res);
      setPrizeList(res);
    })
  }, [])

  const onListEndReached = () => {
    console.log('almost reach bottom');
  }

  return (
    <View className="couponList">
      <ScrollView
      style={{
        height: '100%',
      }}
        onEndReached={() => {onListEndReached()}} >
        {prizeList.map((item) => {
          return (
            <Coupon
              key={item.id}
              image={item.image}
              couponAmount={item.couponAmount}
              couponLimit={item.couponLimit}
              couponExpireTime={item.couponExpireTime}
              couponStarTime={item.couponStarTime}
              couponType={item.couponType}
              useLink={'https://detail.m.tmall.com/item.htm?id=615280750325&toSite=main'} />
          );
        })}
      </ScrollView>
    </View>
  );

}