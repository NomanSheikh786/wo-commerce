import React, { useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Backbutton from '../../components/BackButton'
import { height, width } from 'react-native-dimension'
import Carousel from 'react-native-snap-carousel';
import { heart } from '../../assets/Images'
import { useEffect } from 'react';
import Woocommerce from '../../services/Woocommerce';
import { useIsFocused } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import Loader from '../../components/Loader';
import { ActivityIndicator } from 'react-native';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/Actions';
import Toast from 'react-native-toast-message';

const ProductDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state?.cartReducer?.products || []);
    const [activeBandIndex, setActiveBandIndex] = useState(0)
    const focused = useIsFocused()
    const [productDetail, setProductDetail] = useState(null)
    const [productReviews, setProductReviews] = useState([])
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let productId = route?.params?.id
    const ref = useRef();

    useEffect(() => {
        getProductDetail()

    }, [focused])

    const getProductDetail = async () => {
        setIsLoading(true)
        try {
            let res = await Woocommerce.get(`/products/${productId}`)
            setProductDetail(res?.data)
            setIsLoading(false)
            getReviews()
        } catch (error) {
            setIsLoading(false)
            console.log(error, "errorerrorerrorerror")
        }
    }

    const getReviews = async () => {
        setIsLoadingReview(true)
        try {
            let res = await Woocommerce.get(`/products/reviews?status=approved&product=${productId}&per_page=10`)
            setProductReviews(res?.data)
            setIsLoadingReview(false)
        } catch (error) {
            setIsLoadingReview(false)
            console.log(error, "errorerrorerrorerror")
        }
    }

    let isAddedInCart = cartProducts?.some((item) => item?.id == productDetail?.id)

    const handleAddToCart = () => {
        dispatch(actions.addToCart(productDetail));
        setTimeout(() => {
            navigation.goBack();
        }, 1200);
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Item added to cart successfully'
        });

    }




    const renderRatingStars = (star) => {
        switch (star) {
            case 1:
                return ('⭐');
                break;
            case 2:
                return ('⭐⭐');
                break;
            case 3:
                return ('⭐⭐⭐');
                break;
            case 4:
                return ('⭐⭐⭐⭐');
                break;
            case 5:
                return ('⭐⭐⭐⭐⭐');
                break;
            default:
                return false;
        }
    }



    const reviewrender = ({ item, index }) => {
        return (
            <View style={{ width: '60%', marginVertical: 5 }}>
                <View style={{}}>
                    <Text style={{ fontSize: 14, color: "#000", lineHeight: 18 }}>{item?.reviewer}</Text>
                    <RenderHTML
                        source={{ html: item?.review }}
                        contentWidth={100}
                    />
                </View>
                <Text> {renderRatingStars(item?.rating)}</Text>
            </View>
        )
    }
    const _renderItem = ({ item, index }) => {
        return (
            <Image key={item?.id} source={{ uri: item?.src }} style={styles.sliderimg} />

        );
    }

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <Backbutton onPress={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.searchHeader}>
                        <Text style={styles.searchHeaderText}>
                            PRODUCT DETAIL
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Wishlist")} style={{ marginHorizontal: 10 }}>
                                <Image source={heart} style={{ resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <Carousel
                            ref={ref}
                            data={productDetail?.images}
                            layout={'stack'} layoutCardOffset={`5`}
                            renderItem={_renderItem}
                            sliderWidth={width(90)}
                            itemWidth={width(90)}
                            onSnapToItem={(index) => { setActiveBandIndex(index) }}
                            pagingEnabled={true}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />
                    </View>

                    <View style={{ marginHorizontal: width(6), flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: "#241332", width: "70%" }}>{productDetail?.name}</Text>
                        <Text style={{ fontSize: 18, color: "#000" }}>${productDetail?.price}</Text>
                    </View>

                    {/* <View style={{ marginHorizontal: width(8), flexDirection: "row", justifyContent: "space-around", alignItems: 'center', marginTop: width(2) }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", width: width(37), alignItems: 'center', padding: 8, borderWidth: 1, borderRadius: 20, borderColor: "#EBEBEB" }}>
                        <Text style={{ marginHorizontal: 5, fontSize: 12, color: "#000" }}>Size</Text>
                        <Text style={{ marginHorizontal: 5, fontSize: 15, color: "#000" }}>M</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", width: width(37), alignItems: 'center', padding: 8, borderWidth: 1, borderRadius: 20, borderColor: "#EBEBEB" }}>
                        <Text style={{ marginHorizontal: 5, fontSize: 12, color: "#000" }}>Colour</Text>
                        <View style={{ marginHorizontal: 5, backgroundColor: "red", padding: 7, borderRadius: 10 }}></View>
                    </View>
                </View> */}


                    <View style={{ marginHorizontal: width(6), marginVertical: height(2) }}>
                        {/* <Text style={{ fontSize: 18, color: "#241332" }}>Description</Text> */}
                        {/* <Text style={{ marginVertical: 7, fontSize: 12, lineHeight: 20, color: "#767676" }}>{productDetail?.description}</Text> */}
                        <RenderHTML
                            source={{ html: productDetail?.description }}
                            contentWidth={100}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ width: '40%' }}>
                                {/* <SmallButton onPress={() => props.navigation.navigate("ShoppingBasket")} Text={"Add to Cart"} /> */}
                                <Button isDisabled={isAddedInCart} onPress={(handleAddToCart)} heading={isAddedInCart ? "Added in cart" : "Add to Cart"} color={isAddedInCart ? "#fff" : "#471F65"} textColor={isAddedInCart ? "#471F65" : "#fff"} isBorder={isAddedInCart} fontSize={16} fontWeight={"500"} />
                            </View>
                            {/* <Counter /> */}
                        </View>

                    </View>


                    <View style={{ marginHorizontal: width(6) }}>
                        <View>
                            <Text style={{ color: "#241332", fontSize: 13, lineHeight: 17, marginVertical: 8, fontWeight: "600" }}>Reviews</Text>
                        </View>
                        <FlatList
                            data={productReviews}
                            renderItem={reviewrender}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1
                            }}
                            ListEmptyComponent={() => {
                                if (isLoadingReview) {
                                    return (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <ActivityIndicator size="large" color="#471F65" />
                                        </View>

                                    )
                                } else {
                                    return (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 15,
                                                fontWeight: "500"
                                            }}>No Reviews Found</Text>
                                        </View>

                                    )
                                }

                            }}
                        />
                    </View>

                </ScrollView>
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
    sliderimg: {
        height: height(35),
        width: '100%',
        // resizeMode: "contain",
        borderRadius: 20,
        marginVertical: width(2)
    },
})


export default ProductDetail