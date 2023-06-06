import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Image
} from 'react-native';
import { Button, Card, Icon, Rating } from 'react-native-elements';
import HTML from 'react-native-render-html';
import RenderHTML from 'react-native-render-html';
import { toAmount } from '../../utils';
import { deleteIcon } from '../../assets/Images';
import { width } from 'react-native-dimension';
import Counter from '../Counter';

const { width: screenWidth } = Dimensions.get('window');


const noop = () => { };

const _renderCartDetail = ({
  product,
  quantity = 0,
  subQuantity = noop,
  addQuantity = noop,
  removeFromCart = noop
}) => (
  <>
    <View style={styles.actionView}>
      <Icon
        name="minus"
        type="font-awesome-5"
        onPress={() => subQuantity(product.id)}
      />
      <Text>Quantity: {quantity}</Text>
      <Icon
        name="plus"
        type="font-awesome-5"
        onPress={() => addQuantity(product.id)}
      />
    </View>
    {/* <Button title="Remove" onPress={() => removeFromCart(product.id)} /> */}
  </>
);

const _renderBrowseDetail = (
  product,
  addToCart = noop,
) => (
  <>
    <RenderHTML
      source={product?.description}
      renderers={{
        p: (_, children) => (
          <Text numberOfLines={2}>{children}</Text>
        )
      }}
    />
    <View style={styles.actionView}>
      <Rating
        readonly
        imageSize={14}
        startingValue={Number(product?.average_rating)}
        // @ts-ignore
        style={styles.rating}
      />
      <Button
        icon={{
          name: 'cart-plus',
          type: 'font-awesome-5',
          color: 'white',
          size: 16
        }}
        onPress={() => addToCart(product)}
      />
    </View>
  </>
);

const ProductItem = (props) => {
  const { product: {
    images,
    name,
    price,
    id,
    categories,
    description,
    average_rating
  }, layout, modalVisible, setModalVisible, handleProductPress, isInCart = false, quantity, subQuantity, addQuantity, setSelectedProductId, addToCart } = props

  return (
    <TouchableOpacity onPress={() => handleProductPress(id)}>
      {/* <Card
        title={name}
        // @ts-ignore
        titleNumberOfLines={2}
        image={{ uri: image?.src }}
        containerStyle={styles.card}>
        <Text>{toAmount(price)}</Text>
        {isInCart ? _renderCartDetail(props) : _renderBrowseDetail(props)}
      </Card> */}
      <View style={{ flexDirection: "row", marginVertical: width(3), alignItems: "center" }}>
        <Image source={{ uri: images[0]?.src }} style={{ width: width(25), height: width(28), borderRadius: 20 }} />
        <View style={{ marginLeft: width(1), width: layout.width / 1.5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#000" }}>{(name.length > 15) ? name.substring(0, 15).concat('...') : name}</Text>
            <Text style={{ fontSize: 18, color: "#000", }}>${price}</Text>
          </View>
          <Text style={{ fontSize: 12, color: "#929292", marginVertical: width(1) }}>{categories[0]?.name}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Counter quantity={quantity} addQuantity={addQuantity} subQuantity={subQuantity} id={id} />
            <TouchableOpacity onPress={() => {
              setModalVisible(!modalVisible)
              setSelectedProductId(id)
            }}>
              <Image source={deleteIcon} style={{ width: width(7), height: width(7) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {_renderBrowseDetail(props.product, addToCart,)} */}
    </TouchableOpacity>
  )
  // const {
  //   products: {
  //     id,
  //     name,
  //     images: [image],
  //     price,
  //     categories: [category]
  //   },
  //   handleProductPress,
  //   isInCart = false,
  //   setModalVisible,
  //   modalVisible
  // } = props;
  // return (
  //   <TouchableOpacity onPress={() => handleProductPress(id)}>
  //     <Card
  //       title={name}
  //       // @ts-ignore
  //       titleNumberOfLines={2}
  //       image={{ uri: image?.src }}
  //       containerStyle={styles.card}>
  //       <Text>{toAmount(price)}</Text>
  //       {isInCart ? _renderCartDetail(props) : _renderBrowseDetail(props)}
  //     </Card>
  //     <View style={{ flexDirection: "row", marginVertical: width(3), alignItems: "center" }}>
  //       <Image source={{ uri: image?.src }} style={{ width: width(25), height: width(28), borderRadius: 20 }} />
  //       <View style={{ marginLeft: width(1), width: layout.width / 1.5 }}>
  //         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  //           <Text style={{ fontSize: 16, color: "#000" }}>{(name.length > 15) ? name.substring(0, 15).concat('...') : name}</Text>
  //           <Text style={{ fontSize: 18, color: "#000", }}>${price}</Text>
  //         </View>
  //         <Text style={{ fontSize: 12, color: "#929292", marginVertical: width(1) }}>{category?.name}</Text>
  //         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  //           <Counter />
  //           <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
  //             <Image source={deleteIcon} style={{ width: width(7), height: width(7) }} />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );
};



const styles = StyleSheet.create({
  card: {
    width: screenWidth / 2 - 20,
    margin: 10
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  rating: {
    paddingVertical: 5
  }
});

export default ProductItem;
