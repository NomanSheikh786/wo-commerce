import React, { useEffect, useState } from "react"
import { SafeAreaView, Text, StyleSheet, FlatList, View } from "react-native"
import { width } from "react-native-dimension"
import { useSelector } from "react-redux";
import Woocommerce from "../../../services/Woocommerce";
import moment from "moment";
import Loader from "../../../components/Loader";
import OrderCard from "../../../components/OrderCard";

const Processing = ({ navigation, handleNavigateToDetail }) => {

    const user = useSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState(false)

    const [processingOrder, setProcessingOrders] = useState([])

    useEffect(() => {
        getProcessingOrdersData()
    }, [])

    const getProcessingOrdersData = async () => {
        setIsLoading(true)
        try {
            let res = await Woocommerce.get(`/orders?customer=${user?.ID}&status=processing`)
            setProcessingOrders(res?.data)
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
                    data={processingOrder}
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

export default Processing