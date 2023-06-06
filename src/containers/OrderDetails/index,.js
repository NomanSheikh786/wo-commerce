import React from "react"
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { width, height } from "react-native-dimension"
import Backbutton from "../../components/BackButton"
import { useEffect } from "react"
import Woocommerce, { config } from "../../services/Woocommerce"
import { useState } from "react"
import Loader from "../../components/Loader"
import moment from "moment"
import { Linking } from "react-native"

const OrderDetails = ({ navigation, route }) => {

    let { id } = route.params || {}
    const [orderDetail, setOrderDetail] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    console.log(id, "idididididididid")

    useEffect(() => {
        getOrderDetail()
    }, [])

    const getOrderDetail = async () => {
        setIsLoading(true)
        try {
            let res = await Woocommerce.get(`/orders/${id}`)
            setOrderDetail(res?.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error, "errorerrorerrorerrorerror")
            setIsLoading(false)
        }
    }

    const handlePayment = () => {
        const { id, order_key } = orderDetail
        const paymentUrl =
            `${config.WC_BASE_URL}/checkout/order-pay/${id}` +
            `?pay_for_order=true&key=${order_key}`;
        console.log(paymentUrl, "paymentUrlpaymentUrl")
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
        return Linking.openURL(paymentUrl)
    }


    // const basketItems = [
    //     {
    //         id: 1,
    //         image: icons.orderDress,
    //         title: "Cute Female Crysta",
    //         qty: 1,
    //         price: 200
    //     },
    //     {
    //         id: 2,
    //         image: icons.orderDress,
    //         title: "Cute Female Crysta",
    //         qty: 1,
    //         price: 200
    //     },
    //     {
    //         id: 3,
    //         image: icons.orderDress,
    //         title: "Cute Female Crysta",
    //         qty: 1,
    //         price: 200
    //     },
    //     {
    //         id: 4,
    //         image: icons.orderDress,
    //         title: "Cute Female Crysta",
    //         qty: 1,
    //         price: 200
    //     },
    //     {
    //         id: 5,
    //         image: icons.orderDress,
    //         title: "Cute Female Crysta",
    //         qty: 1,
    //         price: 200
    //     },
    // ]

    const renderBasketData = ({ item, index }) => {
        return (
            <>
                <View style={{ marginVertical: width(4) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={{ uri: item.image.src }} style={{ width: width(20), height: width(23), borderRadius: 20 }} />
                        <View style={{ marginLeft: width(2), width: "75%" }}>
                            <Text style={{ fontSize: 18, color: "#000", }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, color: "#000", opacity: 0.5 }}>Quantity : {item.quantity}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: width(4) }}>
                        <Text style={{ fontSize: 14, color: "#000", opacity: 0.5 }}>Unit Price</Text>
                        <Text style={{ fontSize: 18, color: "#000" }}>${item.price}</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 2, borderBottomColor: "#BDC4CC", }} />
            </>
        )
    }

    const renderScreen = ({ item, index }) => {
        return (
            <View style={{ margin: width(4) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 14, color: "#000", opacity: 0.5 }}>
                        Order Number
                    </Text>
                    <Text style={{ fontSize: 14, color: "#000", opacity: 0.5, }}>
                        Order Date
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16, color: "#000", }}>
                        #{orderDetail?.number}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#000", }}>
                        {moment(orderDetail?.date_created).format("dddd, MMMM Do YYYY")}
                    </Text>
                </View>
                <FlatList
                    data={orderDetail?.line_items}
                    renderItem={renderBasketData}
                    keyExtractor={(item) => item.id}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: width(3) }}>
                    <Text style={{ fontSize: 20, color: "#000" }}>Total</Text>
                    <Text style={{ fontSize: 20, color: "#000" }}>${orderDetail?.total}</Text>
                </View>
                {
                    (orderDetail?.status == "pending" && orderDetail?.needs_payment == true) ?
                        <View style={{ marginVertical: width(2), alignSelf: "center" }}>
                            <TouchableOpacity onPress={() => handlePayment()} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(40), marginTop: height(1.5) }}>
                                <Text style={{ color: "#fff", fontSize: 15, }}>
                                    Pay
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

            </View>
        )
    }

    return (
        <>
            <Loader isloading={isloading} />
            <SafeAreaView style={styles.container}>
                <Backbutton onPress={() => navigation.goBack()} />
                <View style={styles.searchHeader}>
                    <Text style={styles.searchHeaderText}>
                        Order Details
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(9), width: width(25), }}>
                            <Text style={{ color: "#fff", fontSize: 12, }}>
                                {orderDetail?.status}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={['data']}
                    renderItem={renderScreen}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
        color: '#000'
    },
})

export default OrderDetails