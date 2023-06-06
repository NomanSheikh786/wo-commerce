import React from "react"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { width, height } from "react-native-dimension"
import { orderAccepted } from "../../../assets/Images"
import Backbutton from "../../../components/BackButton"
import { Linking } from "react-native"

const Payment = ({ navigation, route }) => {
    let { orderNo, paymentUrl } = route.params || {}


    const handlePayment = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
       })
        return Linking.openURL(paymentUrl)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Backbutton onPress={() => { navigation.goBack() }} />
            <View style={styles.searchHeader}>
                <Text style={styles.searchHeaderText}>
                    Checkout
                </Text>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("SearchEnigne") }} style={{ marginHorizontal: 10 }}>
                        <Image source={SearchIcon} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={{ alignItems: "center", marginVertical: width(8) }}>
                <Image source={orderAccepted} style={{ width: width(90), height: width(90), resizeMode: "contain" }} />
                <Text style={{ marginVertical: width(4), fontSize: 18, color: "#000" }}>Order Accepted</Text>
                <Text style={{ fontSize: 16, color: "#A3A3A3", width: "50%", textAlign: "center" }}>Your Order No. #{orderNo} has been placed</Text>
                <View style={{ marginVertical: width(2), alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => handlePayment()} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(70), marginTop: height(1.5) }}>
                        <Text style={{ color: "#fff", fontSize: 15, }}>
                            Pay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
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
})

export default Payment