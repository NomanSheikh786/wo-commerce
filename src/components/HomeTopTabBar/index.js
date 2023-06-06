import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from 'react-native-dimension'
import { logo, menuu, cart, search, filter, backArrow } from '../../assets/Images'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

export default function HomeTopTabBar(props) {
    const products = useSelector((state) => state?.cartReducer?.products || []);
    const [productsCount, setProductsCount] = useState(0)
    const { showBackBtn, backBtn } = props
    const focused = useIsFocused()

    useEffect(() => {
        let count = 0
        products.forEach(element => {
            count += element.quantity
        });
        setProductsCount(count)
    }, [products?.length])

    console.log(products.length, "lengthlengthlength")

    return (
        <View style={styles.container}>
            <View style={{
            }}>
                {
                    showBackBtn ?
                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={backBtn}>
                            <Image source={backArrow} style={styles.imgs} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={props.Menu}>
                            <Image source={menuu} style={styles.imgs} />
                        </TouchableOpacity>
                }
            </View>

            <View style={{
            }}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={props.Search}>
                    <Image source={search} style={styles.imgs} />

                </TouchableOpacity>
                <TouchableOpacity onPress={props.Cart} style={{ marginHorizontal: width(3), position: "relative" }}>
                    {/* <Image source={cart} style={styles.imgs} /> */}
                    <AntDesign name='shoppingcart' size={22} />
                    {
                        products?.length > 0 ?
                            <View style={{
                                position: "absolute",
                                backgroundColor: "red",
                                width: width(4),
                                height: width(4),
                                borderRadius: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                right: -8,
                                top: -8
                            }}>
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>{productsCount}</Text>
                            </View>
                            :
                            null
                    }


                </TouchableOpacity>
                {/* <TouchableOpacity onPress={props.Filter}>
                    <Image source={filter} style={styles.imgs} />

                </TouchableOpacity> */}

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "#fff",
        // marginHorizontal: width(1.5)
    },
    imgs: {
        resizeMode: "contain",
        height: 20,
        width: 20,

    },
    logo: {
        height: width(15),
        width: width(15),
    },
    row: {
        alignItems: 'center',
        flexDirection: "row",
        // justifyContent: 'space-around',
        // width: width(20)
    },
    rightt: {

    }

})