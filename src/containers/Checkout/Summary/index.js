import React, { useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { height, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../../../components/BackButton";
import { Linking } from "react-native";
import { toAmount } from "../../../utils";
import Loader from "../../../components/Loader";
import Woocommerce, { config } from "../../../services/Woocommerce";
import { actions } from "../../../redux/Actions";

const Summary = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer.user);
    const products = useSelector((state) => state.cartReducer.products || []);
    const total = useSelector((state) => state.cartReducer.total || 0);
    const [isLoading, setIsLoading] = useState(false)
    const addressData = route.params.addressData
    const couponLines = route.params.couponLines



    const renderSummary = ({ item, index }) => {
        return (
            <View style={{ marginLeft: index == 0 ? 0 : width(6), marginVertical: width(5) }}>
                <Image source={{ uri: item?.images[0]?.src }} style={{ width: width(25), height: width(28), borderRadius: 20 }} />
                <Text style={{ fontSize: 14, color: "#000", marginVertical: width(2), width: width(25) }}>{item.name}</Text>
                <Text style={{ fontSize: 16, color: "#471F65", }}>${item.price}</Text>
            </View>
        )

    }

    const _renderOrderItem = ({
        id,
        name,
        price,
        quantity
    }) => (
        <View style={styles.orderItem} key={id}>
            <Text style={{ flex: 0.4 }}>{name}</Text>
            <Text style={{ flex: 0.2 }}>x {quantity}</Text>
            <Text style={{ flex: 0.4, textAlign: 'right' }}>
                ${price * quantity}
            </Text>

        </View>
    );

    const _renderOrders = () => products.map(_renderOrderItem);

    const handleCheckoutSubmit = async () => {
        setIsLoading(true)
        try {
            const order = {
                customer_id: user?.ID,
                billing: addressData,
                shipping: addressData,
                line_items: products?.map(({ id, quantity }) => ({
                    product_id: id,
                    quantity
                })),
                coupon_lines: couponLines
            };
            const {
                data: { id, order_key, number }
            } = await Woocommerce.post('/orders', order);
            const paymentUrl =
                `${config.WC_BASE_URL}/checkout/order-pay/${id}` +
                `?pay_for_order=true&key=${order_key}`;
            console.log(paymentUrl, "paymentUrlpaymentUrlpaymentUrl")
            dispatch(actions.resetCart())
            navigation.navigate('Payment', { orderNo: number, paymentUrl })
            setIsLoading(false)
        } catch (error) {
            console.log(error, "errorerrorerrorerror")
            setIsLoading(false)
        }



    };

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <Backbutton onPress={() => navigation.goBack()} />
                <View style={styles.searchHeader}>
                    <Text style={styles.searchHeaderText}>
                        Checkout
                    </Text>
                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("SearchEnigne") }} style={{ marginHorizontal: 10 }}>
                        <Image source={SearchIcon} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View> */}
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ margin: width(4) }}>
                        <Text style={{ fontSize: 16, color: "#000" }}>Summary</Text>

                        <FlatList
                            data={products}
                            renderItem={renderSummary}
                            keyExtractor={(item) => item.id}
                            horizontal
                        />
                        {_renderOrders()}
                        <View style={styles.orderItem}>
                            <Text style={styles.textTotal}>Total:</Text>
                            <Text style={styles.textTotal}>${total}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#BDC4CC", marginVertical: width(3) }} />
                        <View>
                            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: "#000" }}>Shipping Address</Text>
                            <TouchableOpacity
                                onPress={() => setIsCheckedAddress(!isCheckedAddress)}
                                style={{
                                    backgroundColor: isCheckedAddress ? "#FFBC05" : "#fff",
                                    borderWidth: 1,
                                    borderColor: isCheckedAddress ? "#fff" : "#DDDDDD",
                                    borderRadius: 50,
                                    height: width(6),
                                    width: width(6),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Image source={isCheckedAddress ? icons.checkWhite : icons.checkBlack} style={{ width: width(3), height: width(3), }} />
                            </TouchableOpacity>
                        </View> */}
                            <View style={{ marginTop: width(3) }}>
                                <Text style={{ fontSize: 14, color: "#A3A3A3", }}>{addressData.address_1}, {addressData.address_2 ? `${addressData.address_2}, ` : null}{addressData.city}</Text>
                                <Text style={{ fontSize: 14, color: "#A3A3A3", }}>{addressData.state}, {addressData.country}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Address")} style={{ marginTop: width(2) }}>
                                <Text style={{ color: "#471F65", }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#BDC4CC", marginVertical: width(3) }} />
                        {/* <View>
                        <View style={{}}>
                            <Text style={{ fontSize: 16, fontFamily: fonts.gotham.medium, color: "#000" }}>Payment</Text>
                        </View>

                        <View style={{ marginTop: width(3), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={icons.masterCard} style={{ height: width(12), width: width(12), resizeMode: "contain" }} />
                                <View style={{ marginLeft: width(2) }}>
                                    <Text style={{ fontSize: 11,  color: "#929292" }}>Master Card</Text>
                                    <Text style={{ fontSize: 14, color: "#000" }}>****  ****  ****  4543</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsCheckedPayment(!isCheckedPayment)}
                                style={{
                                    backgroundColor: isCheckedPayment ? "#FFBC05" : "#fff",
                                    borderWidth: 1,
                                    borderColor: isCheckedPayment ? "#fff" : "#DDDDDD",
                                    borderRadius: 50,
                                    height: width(6),
                                    width: width(6),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Image source={isCheckedPayment ? icons.checkWhite : icons.checkBlack} style={{ width: width(3), height: width(3), }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditCard")} style={{ marginTop: width(2) }}>
                            <Text style={{ color: "#471F65",  }}>Change</Text>
                        </TouchableOpacity>
                    </View> */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "75%", marginVertical: width(2), alignSelf: "center" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(30), marginTop: height(1.5), borderColor: "#0C0D34", borderWidth: 1 }}>
                                <Text style={{ color: "#0C0D34", fontSize: 15, }}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCheckoutSubmit()} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(30), marginTop: height(1.5) }}>
                                <Text style={{ color: "#fff", fontSize: 15, }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        lineHeight: 32,
        color: '#000'
    },
    orderItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2
    },
    textTotal: {
        fontWeight: 'bold'
    }
})

export default Summary