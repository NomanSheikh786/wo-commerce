import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Image
} from 'react-native';
import ProductItem from '../../../components/ProductItem';
import { toAmount } from '../../../utils';
import { SafeAreaView } from 'react-native';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { question, backArrow, logo, search } from '../../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { height, width } from 'react-native-dimension';
import TouchableButton from '../../../components/TouchableButton';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';



const _renderProduct = (props, val) => {
  const { item } = val
  return (
    <ProductItem {...props} product={item} isInCart quantity={item.quantity} />
  )
}

const _renderEmpty = () => (
  <Text style={styles.textEmpty}>There is no item in your cart</Text>
);

const _renderScreen = (props) => {
  const { navigation, setLayout, products, couponLines, handleCoupon, handleCheckoutPress } = props

  return (
    <LinearGradient
      colors={['#F5ECFB', '#FBF5E7']} style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: width(3) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backArrow} style={{ resizeMode: "contain", width: 15 }} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} style={{ width: width(25), height: width(25), }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: width(5), alignItems: "center", padding: width(3), flex: 1 }}>
        <Text style={{ fontSize: 18, color: "#000", }}>Shopping Basket</Text>
        {/* <Image source={search} style={{ resizeMode: "contain", width: 25 }} /> */}
      </View>
      <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: width(4), }}>
        {/* <Text style={{ fontSize: 14, color: "#000", }}>Order No. #123-456</Text> */}
        <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
          <FlatList
            data={products}
            renderItem={(item) => _renderProduct(props, item)}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={_renderEmpty()}
            contentContainerStyle={{
              flexGrow: 1
            }}
          />
        </View>
        {
          products?.length > 0 ?
            <View style={{
              justifyContent: "flex-end",
              flex: 1,
            }}>

              <View style={{ marginVertical: width(2), borderRadius: 30, borderWidth: 1, borderColor: "#0C0D34", flexDirection: "row", justifyContent: "space-between", width: "100%", height: width(12) }}>
                <TextInput value={couponLines[0].code} onChangeText={(e) => handleCoupon(e)} placeholder="Enter Voucher Code" placeholderTextColor="#767676" style={{ width: "70%", paddingLeft: 10, color: "#000" }} />
                <TouchableOpacity style={{ backgroundColor: "#0C0D34", borderRadius: 30, paddingLeft: width(7), paddingRight: width(7), justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 12, color: "#fff" }}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableButton onPress={() => handleCheckoutPress()} Text={"Proceed to Checkout"} width={width(55)} />
              </View>
            </View>
            :
            null
        }


      </View>
    </LinearGradient>

  )
}

const CartComponent = (props) => {
  const { products, resetCart, total, handleCheckoutPress, setModalVisible, modalVisible, removeFromCart, selectedProductId } = props;

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={['Page']}
        renderItem={() => _renderScreen(props)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1
        }}
      />
      <ConfirmationModal
        confirmOnPress={() => {
          removeFromCart(selectedProductId)
          setModalVisible(!modalVisible)
        }} cancelOnPress={() => { setModalVisible(!modalVisible) }} cancelText="No" confirmText="Yes" modalHeight={height(40)} navigation={() => { setModalVisible(false) }} modalVisible={modalVisible} setModalVisible={setModalVisible} icon={question} title="Are you sure you want to remove product from the cart?" isCheckout={true} />
      {/* <View style={styles.leftCartOverview}> */}
      {/* <Icon
            reverse
            name="trash-alt"
            type="font-awesome-5"
            onPress={resetCart}
          /> */}
      {/* <Text style={styles.textTotal}>{`Total:\n${toAmount(total)}`}</Text> */}
      {/* </View> */}
      {/* <Button title="Checkout" onPress={handleCheckoutPress} /> */}
      {/* <FlatList
          contentContainerStyle={styles.container}
          data={products}
          renderItem={_renderProduct(props)}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          ListEmptyComponent={_renderEmpty()}
        /> */}
    </SafeAreaView>


  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // cartOverview: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingRight: 5,
  //   backgroundColor: 'white',
  //   zIndex: 1,
  //   borderTopWidth: 1,
  //   borderTopColor: 'grey',
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   left: 0
  // },
  // leftCartOverview: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  // textTotal: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginHorizontal: 5
  // },
  textEmpty: {
    textAlign: 'center',
    marginVertical: width(30),
    color: "#000",
    fontSize: 18
  }
});

export default CartComponent;
