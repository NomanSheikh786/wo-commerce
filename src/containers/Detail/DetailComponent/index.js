import React, { Component } from 'react';
import {
  Dimensions,
  ImageStyle,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel, {
  CarouselStatic,
  ParallaxImage,
  ParallaxImageProps
} from 'react-native-snap-carousel';
import { Rating, Button } from 'react-native-elements';
import { toAmount } from '../../../utils';
import RenderHTML from 'react-native-render-html';

const { width: screenWidth } = Dimensions.get('window');



class DetailComponent extends Component {

  constructor(props) {
    super(props);
    this.carousel = null;
  }

  _setCarousel = (carousel) => {
    this.carousel = carousel;
  };

  _mapImages = (images) =>
    images.map((image) => ({ url: image.src }));

  _renderImageItem = (handleShowImages) => (
    { item },
    parallaxProps
  ) => (
    <TouchableOpacity style={styles.item} onPress={handleShowImages}>
      <ParallaxImage
        {...parallaxProps}
        source={{ uri: item.url }}
        containerStyle={styles.imageContainer}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  _renderImages = (
    images,
    handleShowImages
  ) => (
    <ImageViewer
      imageUrls={this._mapImages(images)}
      enableSwipeDown
      onSwipeDown={handleShowImages}
      index={this.carousel?.currentIndex}
    />
  );

  render() {
    const {
      product,
      imagesShown,
      handleShowImages,
      addToCart = () => {}
    } = this.props;
    const {
      name,
      images,
      description,
      price,
      average_rating: rating
    } = product;

    return (
      <ScrollView style={styles.wrapper}>
        <Carousel
          ref={this._setCarousel}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={this._mapImages(images)}
          renderItem={this._renderImageItem(handleShowImages)}
          hasParallaxImages
        />
        <View style={styles.detail}>
          <Text style={styles.textTitle}>{name}</Text>
          <Text style={styles.textPrice}>{toAmount(price)}</Text>
          <RenderHTML source={description} />
          <View style={styles.rating}>
            <Text style={styles.textSubHeading}>Rating:</Text>
            <Text style={styles.textRating}>{rating}</Text>
            <Rating readonly imageSize={20} startingValue={Number(rating)} />
          </View>
          <Button
            icon={{
              name: 'cart-plus',
              type: 'font-awesome-5',
              color: 'white',
              size: 16
            }}
            title="Add to cart"
            onPress={() => addToCart(product)}
          />
        </View>
        <Modal visible={imagesShown} transparent>
          {this._renderImages(images, handleShowImages)}
        </Modal>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 5
  },
  detail: {
    marginTop: 10,
    marginHorizontal: 5
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  rating: { flexDirection: 'row', alignItems: 'center' },
  textPrice: { fontSize: 18, fontWeight: 'bold', color: '#006db3' },
  textSubHeading: { fontSize: 18, fontWeight: 'bold', margin: 5 },
  textRating: { fontSize: 18, margin: 5 },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60
  },
  imageContainer: {
    height: screenWidth - 60,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 5
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  }
});

export default DetailComponent;
