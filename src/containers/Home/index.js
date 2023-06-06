import React, { useEffect, useRef, useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList, Image } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { slider, heart, cart, cartFill } from "../../assets/Images"
import { height, width } from 'react-native-dimension'
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import Loader from "../../components/Loader"
import Woocommerce from "../../services/Woocommerce";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/Actions";
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state?.cartReducer?.products || []);
    console.log(products, "productsproductsproducts")
    const [activeBandIndex, setActiveBandIndex] = useState(0)
    const [categories, setCategories] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [isloadingFeatured, setIsLoadingFeatured] = useState(false)
    const [isloadingCat, setIsLoadingCat] = useState(false)
    const ref = useRef();

    useEffect(() => {
        getCategories()
        getFeaturedProducts()
    }, [])


    const getCategories = async () => {
        setIsLoadingCat(true)
        try {
            let categoriesRes = await Woocommerce.get('/products/categories')
            let temp = []
            categoriesRes?.data?.forEach(element => {
                let name = element.name.replace(/&amp;/g, '&')
                let obj = {
                    ...element,
                    name
                }
                temp.push(obj)
            });
            setCategories(temp)
            setIsLoadingCat(false)

        } catch (error) {
            setIsLoadingCat(false)
            console.log(error, "errorerrorerror")
        }
    }

    const getFeaturedProducts = async () => {
        setIsLoadingFeatured(true)
        try {
            let featuredProducts = await Woocommerce.get('/products?per_page=5&status=publish&featured=true')
            setFeaturedProducts(featuredProducts?.data)
            setIsLoadingFeatured(false)
        } catch (error) {
            setIsLoadingFeatured(false)
            console.log(error, "errorerrorerrorerror")
        }
    }

    const handleAddToCart = (productDetail) => {
        dispatch(actions.addToCart(productDetail));
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Item added to cart successfully'
        });
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(actions.removeFromCart(productId)),
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Item removed from cart successfully'
            });
    }



    const sliders = [
        {
            id: "1",
            image: slider,
            text: "Formal & Casual Wear For Women",
            Descp: "New Winter Collection 2020"

        },
        {
            id: "2",
            image: slider,
            text: "Formal & Casual Wear For Women",
            Descp: "New Winter Collection 2020"

        },
        {
            id: "3",
            image: slider,
            text: "Formal & Casual Wear For Women",
            Descp: "New Winter Collection 2020"

        },
    ]





    const _renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={item.image} resizeMode='contain' style={styles.sliderimg} >
                <View style={styles.viewslider}>
                    <Text style={styles.sliderbold}>{item.text}</Text>
                    <Text style={styles.sliderdesc}>{item.Descp}</Text>
                </View>
            </ImageBackground>
        );
    }

    const _renderCategory = ({ item, index }) => {
        return (
            <View style={[styles.cattt, { width: width(30) }]}>
                <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("Products", { productType: "categories", catId: item.id, parentRoute: "Home" })}>
                    <Image source={{ uri: item?.image?.src }} resizeMode={'contain'} style={styles.imgtouch} />
                </TouchableOpacity>
                <Text style={[styles.texttouch, { textAlign: "center" }]}> {item?.name}</Text>
            </View>
        );
    }


    const _renderFeatured = ({ item, index }) => {

        let cartIds = products?.map((val) => {
            return val?.id == item?.id ? val?.id : []
        })

        return (
            <View style={styles.reccontainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { id: item?.id })}>
                    <Image source={{ uri: item.images[0].src }} style={styles.recimg} />
                </TouchableOpacity>
                <View style={[styles.viewrecpro, { width: width(64) }]}>
                    <Text style={[styles.recname, { width: "80%" }]}>{item?.name?.length > 40 ? item?.name?.substring(0, 40).concat('...') : item?.name}</Text>
                    {
                        cartIds?.includes(item.id) ?
                            <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                                <Image source={cartFill} stlye={styles.touchimgrec} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => handleAddToCart(item)}>
                                <Image source={cart} stlye={styles.touchimgrec} />
                            </TouchableOpacity>
                    }


                </View>
                <View><Text style={styles.type}>{item.categories[0].name}</Text></View>
                <View style={styles.viewrecpro}>
                    <Text style={styles.pricerec}>${item.price}</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Wishlist") }}>
                        <Image source={heart} stlye={styles.touchimgrec} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sliderview}>
                    <Carousel
                        ref={ref}
                        data={sliders}
                        layout={'stack'} layoutCardOffset={`18`}
                        renderItem={_renderItem}
                        sliderWidth={width(97)}
                        itemWidth={width(97)}
                        onSnapToItem={(index) => { setActiveBandIndex(index) }}
                        pagingEnabled={true}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    />

                    <Pagination
                        dotsLength={sliders.length}
                        activeDotIndex={activeBandIndex}
                        containerStyle={styles.containerpagination}
                        dotColor={'#FFBC05'}
                        dotStyle={styles.dotstyle}
                        inactiveDotColor={'rgba(255,188,5,0.2)'}
                        inactiveDotOpacity={0.7}
                        inactiveDotScale={1}

                    />
                </View>

                <View style={styles.subcontainer}>
                    <Text style={styles.heading}>Categories</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Categories") }}>
                        <Text style={styles.viewall}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(c) => { c?.id }}
                    renderItem={_renderCategory}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    ListEmptyComponent={() => {
                        if (isloadingCat) {
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
                                    }}>No categories Found</Text>
                                </View>

                            )
                        }

                    }}
                />
                <View style={styles.view2}>
                    <Text style={styles.heading}>Featured Products</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Products", { productType: "featured", parentRoute: "Home" })}>
                        <Text style={styles.viewall}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={featuredProducts}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(c) => { c?.id }}
                    renderItem={_renderFeatured}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    ListEmptyComponent={() => {
                        if (isloadingFeatured) {
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
                                    }}>No Featured Products Found</Text>
                                </View>

                            )
                        }

                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    sliderimg: {
        height: height(35),
        width: '100%'
    },
    viewslider: {
        marginHorizontal: width(3),
        position: 'absolute',
        bottom: height(2),
        width: "90%",
        marginVertical: height(2)
    },
    sliderbold: {
        color: "#fff",
        fontSize: 27,
        width: "100%",
        lineHeight: 27
    },
    sliderdesc: {
        color: "#fff",
        fontSize: 14,
        width: "70%",
        lineHeight: 30
    },
    containerpagination: {
        alignSelf: "center",
        position: "absolute",
        bottom: -10
    },
    dotstyle: {
        width: width(2),
        height: height(1)
    },
    sliderview: {
        position: 'relative',
        alignItems: "center",
        height: height(40),
        marginVertical: width(3),
        overflow: "hidden"
    },
    subcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: width(2),
        alignItems: 'center',
        // marginTop: height(1.5)
    },
    heading: {
        color: '#0C0D34',
        fontSize: 16,
        fontWeight: "700"
    },
    viewall: {
        color: '#0C0D34',
        fontSize: 12,
    },
    cattt: {
        alignItems: "center",
        padding: 5
    },
    touch: {
        backgroundColor: "#fff",
        padding: 7,
        elevation: 10,
        borderRadius: 100
    },
    imgtouch: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2
    },
    texttouch: {
        color: '#000',
        fontSize: 12,
        lineHeight: 22,
    },
    reccontainer: {
        padding: 5,
    },
    recview: {
        backgroundColor: "#eee",

    },
    recimg: {
        height: width(45),
        width: width(65),
        borderRadius: 15,
        resizeMode: "cover"
    },
    viewrecpro: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 3,
    },
    recname: {
        color: '#000',
        fontSize: 16,
    },
    touchimgrec: {
        resizeMode: 'contain',
        height: 2,
        width: 2
    },
    type: {
        fontSize: 12,
        lineHeight: 18,
        color: '#929292',
        margin: 3
    },
    pricerec: {
        color: '#000',
        fontSize: 14,
        lineHeight: 21
    },
    view2: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: width(2),
        alignItems: 'center',
        marginVertical: 10

    },
})


export default Home