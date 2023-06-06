import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import ProductItem from "../../../components/ProductItem"
import { useSelector } from 'react-redux';



const _renderProduct = (props) => ({
  item
}) => <ProductItem {...props} product={item} isInCart={false} />;

const _renderEmpty = () => (
  <Text style={styles.textEmpty}>No available product at the moment</Text>
);

const ShopComponent = (props) => {

  const { products, getData, isLoading } = props;


  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {isLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.container}
        data={products}
        renderItem={_renderProduct(props)}
        keyExtractor={(item) => `${item.id}`}
        numColumns={2}
        ListEmptyComponent={_renderEmpty()}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 16
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ShopComponent;
