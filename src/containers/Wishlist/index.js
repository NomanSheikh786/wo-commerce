import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { height, width } from 'react-native-dimension'
import WishlistProductCard from '../../components/WishlistProductCard'
import Backbutton from '../../components/BackButton'
import { search } from '../../assets/Images'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import Woocommerce from '../../services/Woocommerce'
import Loader from '../../components/Loader'
import { actions } from '../../redux/Actions'

export default function Wishlist({ navigation }) {
    const dispatch = useDispatch();
    const focused = useIsFocused()

    const wishedItems = useSelector((state) => state.wishlistReducer.wishedProducts || []);
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)


    const handleRemoveFromWishlist = (product) => {
        dispatch(actions.removeFromWishlist(product));
        let temp = wishedItems.filter((item) => item !== product)
        getProducts(temp)
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         getProducts(wishedItems)
    //     }, [])
    // )

    useEffect(() => {
        getProducts(wishedItems)
    }, [focused])

    console.log(products.length, "productsproductsproductsproducts")
    console.log(wishedItems?.length, "wishedItemswishedItemswishedItemsOUTSIDE")

    const getProducts = async (productArray) => {
        let joinedProductsString = productArray?.join()
        let url = `/products?status=publish&include=${joinedProductsString?.length > 0 ? joinedProductsString : null}${productArray.length > 0 ? `&per_page=${productArray?.length}` : ""}`
        setIsLoading(true)
        try {
            let res = await Woocommerce.get(url);
            !res?.data?.length && setProducts([])
            setProducts(res?.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error, "errorerrorerrorerror")
        }
    }

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <Backbutton onPress={() => navigation.goBack()} />

                <View style={styles.searchHeader}>
                    <Text style={styles.searchHeaderText}>
                        Wishlist
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SearchEnigne")} style={{ marginHorizontal: 10 }}>
                            <Image source={search} style={{ resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <WishlistProductCard handleRemoveFromWishlist={handleRemoveFromWishlist} result={products} navigation={navigation} />
                </View>
            </SafeAreaView>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width(3),
        alignItems: 'center'
    },
    searchHeaderText: {
        fontSize: 18,
        textTransform: "uppercase",
        lineHeight: 32,
        color: '#000'
    },
})