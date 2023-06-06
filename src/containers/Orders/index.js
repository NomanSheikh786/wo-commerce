import React, { useState } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image, FlatList } from "react-native"
import { width } from "react-native-dimension"
import Backbutton from "../../components/BackButton"
import Pending from "./Pending"
import Processing from "./Processing"
import Completed from "./Completed"
import OnHold from "./OnHold"
import Refunded from "./Refunded"
import Cancelled from "./Cancelled"

const Orders = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = useState("pending")

    const orderTabs = [
        {
            id: 1,
            title: "Pending",
            value: "pending"
        },
        {
            id: 2,
            title: "Processing",
            value: "processing"
        },
        {
            id: 3,
            title: "Completed",
            value: "completed"
        },
        {
            id: 4,
            title: "On-Hold",
            value: "on-hold"
        },
        {
            id: 5,
            title: "Refunded",
            value: "refunded"
        },
        {
            id: 6,
            title: "Cancelled",
            value: "cancelled"
        }
    ]

    const handleNavigateToDetail = (id) => {
        navigation.navigate("OrderDetail", { id })
    }



    const renderTabsLabel = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => setSelectedTab(item.value)} style={{ backgroundColor: selectedTab == item.value ? "#471F65" : "#fff", alignItems: 'center', paddingVertical: width(2), paddingHorizontal: width(4), borderRadius: 25, marginHorizontal: index == 1 ? width(5) : 0 }}>
                <Text style={{ color: selectedTab == item.value ? "#fff" : "#515C6F", fontSize: 14, }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderTabsComponent = () => {
        switch (selectedTab) {
            case "pending":
                return (
                    <Pending handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            case "processing":
                return (
                    <Processing handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            case "completed":
                return (
                    <Completed handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            case "on-hold":
                return (
                    <OnHold handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            case "refunded":
                return (
                    <Refunded handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            case "cancelled":
                return (
                    <Cancelled handleNavigateToDetail={handleNavigateToDetail} />
                )
                break;
            default: return (null)
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <Backbutton onPress={() => { navigation.goBack() }} />
            <View style={styles.searchHeader}>
                <Text style={styles.searchHeaderText}>
                    Order
                </Text>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("SearchEnigne") }} style={{ marginHorizontal: 10 }}>
                        <Image source={search} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={{ margin: width(4) }}>
                <FlatList
                    data={orderTabs}
                    renderItem={renderTabsLabel}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        justifyContent: "center", alignItems: "center", flexDirection: "row"
                    }}
                />

            </View>
            {renderTabsComponent()}
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

export default Orders