import moment from "moment"
import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { width } from "react-native-dimension"

const OrderCard = ({ item, handleNavigateToDetail }) => {
    return (
        <TouchableOpacity onPress={() => handleNavigateToDetail(item?.id)} style={{ elevation: 10, backgroundColor: "#fff", borderRadius: 5, padding: width(3), marginVertical: width(4), marginHorizontal: width(3) }}>
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
                    #{item.number}
                </Text>
                <Text style={{ fontSize: 16, color: "#000", }}>
                    {moment(item?.date_created).format("dddd, MMMM Do YYYY")}
                </Text>
            </View>
            <View style={{ marginVertical: width(4) }}>
                <Text style={{ fontSize: 14, color: "#000", opacity: 0.5 }}>
                    Total Price
                </Text>
                <Text style={{ fontSize: 16, color: "#000", }}>
                    USD {item.total}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrderCard