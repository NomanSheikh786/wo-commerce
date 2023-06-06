import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView, StyleSheet, FlatList, Platform, ActivityIndicator, Alert } from 'react-native'
import { height, width } from 'react-native-dimension'
import HomeTopTabBar from '../../components/HomeTopTabBar'
import { heart, cart, wishlistHeart } from '../../assets/Images'
import Woocommerce from '../../services/Woocommerce'
import Loader from '../../components/Loader'


const Categories = ({ navigation }) => {
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)


    let url = `/products/categories?page=${currentPage}&per_page=10`

    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async () => {
        setIsLoadingBtn(true)
        currentPage == 1 && setIsLoading(true)
        try {
            let res = await Woocommerce.get(url);
            console.log(res, "datadatadatadatadatadatadatadatadata");
            !res.data.length && Alert.alert("No Categories Found");
            res.data.length && setCurrentPage(currentPage + 1)

            let temp = []
            res?.data?.forEach(element => {
                let name = element.name.replace(/&amp;/g, '&')
                let obj = {
                    ...element,
                    name
                }
                temp.push(obj)
            });

            setCategories([...categories, ...temp]);
            setIsLoading(false)
            setIsLoadingBtn(false)
        } catch (error) {
            setIsLoading(false)
            setIsLoadingBtn(false)
            console.log(error, "errorerrorerrorerror")
        }
    }



    const _renderCategories = ({ item, index }) => {
        return (
            <View style={[styles.cattt, { width: width(30) }]}>
                <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("Products", { productType: "categories", catId: item.id, parentRoute: "Categories" })}>
                    <Image source={{ uri: item?.image?.src }} resizeMode={'contain'} style={styles.imgtouch} />
                </TouchableOpacity>
                <Text style={[styles.texttouch, { textAlign: "center" }]}> {item?.name}</Text>
            </View>
        );
    }

    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getCategories}
                    //On Click of button calling getData function to load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {(isLoadingBtn && currentPage !== 1) ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        )

    };

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <HomeTopTabBar showBackBtn backBtn={() => navigation.goBack()} Menu={() => navigation.toggleDrawer()} Search={() => navigation.navigate("Search")} Cart={() => navigation.navigate("Cart")} Filter={() => navigation.navigate("Filter")} />
                <FlatList
                    data={categories}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(c) => { c.id }}
                    renderItem={_renderCategories}
                    ListFooterComponent={categories?.length ? renderFooter : null}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                />
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    sliderview: {
        position: 'relative',
        alignItems: "center",
        height: height(40),
        marginVertical: height(0.1),
        overflow: "hidden"
    },
    containerpagination: {
        alignSelf: "center",
        position: "absolute",
        bottom: 0
    },
    dotstyle: {
        width: width(2),
        height: height(1)
    },
    subcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: width(2),
        alignItems: 'center',
        marginTop: -height(1.5)
    },
    heading: {
        color: '#0C0D34',
        fontSize: 16,
        lineHeight: 30
    },
    view2: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: width(2),
        alignItems: 'center',
        marginVertical: 10

    },
    viewall: {
        color: '#0C0D34',
        fontSize: 12,
        lineHeight: 18

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
        lineHeight: 22
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
})


export default Categories