import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native"
import { width } from "react-native-dimension"
import Woocommerce from "../../../services/Woocommerce"
import { useSelector } from "react-redux"
import moment from "moment/moment"
import Loader from "../../../components/Loader"
import OrderCard from "../../../components/OrderCard"

const Pending = ({ navigation, handleNavigateToDetail }) => {
    const user = useSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState(false)


    const [pendingOrders, setPendingOrders] = useState([])

    useEffect(() => {
        getPendingOrdersData()
    }, [])

    const getPendingOrdersData = async () => {
        setIsLoading(true)
        try {
            let res = await Woocommerce.get(`/orders?customer=${user?.ID}&status=pending`)
            let temp = res?.data.filter((item) => item.needs_payment == true)
            setPendingOrders(temp)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    }


    const renderOrder = ({ item, index }) => {
        return (
            <OrderCard item={item} handleNavigateToDetail={handleNavigateToDetail} />
        )
    }

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={pendingOrders}
                    renderItem={renderOrder}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "#000"
                                }}>
                                    No items found
                                </Text>
                            </View>
                        )
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
        margin: width(4)
    },
})

export default Pending