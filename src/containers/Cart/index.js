import React, { useState } from 'react';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import CartComponent from './CartComponent';
import ProductItem from '../../components/ProductItem';
import { actions } from '../../redux/Actions';
import { SafeAreaView } from 'react-native';



const Cart = ({ navigation }) => {
  const products = useSelector((state) => state?.cartReducer?.products || []);
  const total = useSelector((state) => state?.cartReducer?.total || 0);
  const [couponLines, setCouponLines] = useState([{
    code: ""
  }])

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState()
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const handlers = {
    handleProductPress: (id) =>
      navigation.navigate('ProductDetail', { id }),
    handleCheckoutPress: () => navigation.navigate('Address',{couponLines}),
    addToCart: (product) =>
      dispatch(actions.addToCart(product)),
    removeFromCart: (productId) =>
      dispatch(actions.removeFromCart(productId)),
    addQuantity: (productId) =>
      dispatch(actions.addQuantity(productId)),
    subQuantity: (productId) =>
      dispatch(actions.subQuantity(productId)),
    resetCart: () => dispatch(actions.resetCart()),
    handleCoupon: (coupon) => setCouponLines([{
      code: coupon
    }])
  };

  return <CartComponent couponLines={couponLines}  {...handlers} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId} products={products} total={total} modalVisible={modalVisible} navigation={navigation} setModalVisible={setModalVisible} layout={layout} setLayout={setLayout} />
};

export default Cart;
