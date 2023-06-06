import React from 'react';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import CheckoutComponent from './CheckoutComponent';
import WooCommerce, { config } from '../../services/Woocommerce';

const Checkout = ({ route }) => {
  const user = useSelector((state) => state.userReducer.user);
  const products = useSelector((state) => state.cartReducer.products || []);
  const total = useSelector((state) => state.cartReducer.total || 0);
  let couponLines = route.params.couponLines
  const handleCheckoutSubmit = async (userInfo) => {
    const order = {
      customer_id: user?.ID,
      billing: userInfo,
      shipping: userInfo,
      line_items: products?.map(({ id, quantity }) => ({
        product_id: id,
        quantity
      }))
    };
    const {
      data: { id, order_key }
    } = await WooCommerce.post('/orders', order);

    const paymentUrl =
      `${config.WC_BASE_URL}/checkout/order-pay/${id}` +
      `?pay_for_order=true&key=${order_key}`;
      console.log(paymentUrl,"paymentUrlpaymentUrlpaymentUrl")
    return Linking.openURL(paymentUrl);
  };

  return (
    <CheckoutComponent
      handleCheckoutSubmit={handleCheckoutSubmit}
      products={products}
      total={total}
    />
  );
};

export default Checkout;
